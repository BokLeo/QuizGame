import React, { useState, useRef, useEffect } from "react";
import Hangul from "hangul-js";

interface SingleInputQuizProps {
  answerLength: number;
}

const SingleInputQuiz: React.FC<SingleInputQuizProps> = ({ answerLength }) => {
  // 각 셀에 커밋된(확정된) 문자 배열
  const [letters, setLetters] = useState<string[]>(Array(answerLength).fill(""));
  // 현재 활성(편집) 셀의 인덱스
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // 현재 활성 셀의 입력값
  const [currentInput, setCurrentInput] = useState<string>("");
  // 마지막 입력된 키 (composition 처리 시 활용)
  const [lastKey, setLastKey] = useState<string | null>(null);

  // 숨겨진 input의 ref (키 입력 및 포커스 관리를 위해)
  const inputRef = useRef<HTMLInputElement>(null);

  // activeIndex나 letters가 변경되면 해당 셀의 값을 currentInput에 반영하고 포커스
  useEffect(() => {
    setCurrentInput(letters[activeIndex] || "");
    inputRef.current?.focus();
  }, [activeIndex, letters]);

  // 현재 입력값이 "최대 조합" 상태인지 판단하는 함수  
  // - [초성, 중성] (예:"가") => not 최대  
  // - [초성, 중성, 단일 종성] (예:"각") => 단, 단일 종성이 추가 자음과 결합 가능한 경우는 최대가 아님  
  const isMaxComposition = (text: string): boolean => {
    if (!text) return false;
    const disassembled = Hangul.disassemble(text, true);
    if (disassembled.length === 2) {
      return false;
    }
    if (disassembled.length === 3) {
      // 추가 자음 결합이 가능한 경우: ㄱ, ㄴ, ㄹ, ㅂ는 추가 자음(예: ㅅ)과 결합할 수 있음
      const finalConsonant = disassembled[2];
      const combinable = new Set(["ㄱ", "ㄴ", "ㄹ", "ㅂ"]);
      if (combinable.has(finalConsonant)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  // currentInput이 변경될 때, 최대 조합 상태라면 자동 commit 후 다음 셀로 이동
  useEffect(() => {
    if (currentInput && isMaxComposition(currentInput)) {
      commitLetter();
    }
  }, [currentInput]);

  // input의 onChange: 현재 셀의 입력값 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // 현재 셀의 입력값을 commit하여 letters에 반영하고, (마지막 셀이 아니라면) 다음 셀로 이동
  const commitLetter = () => {
    const finalValue = currentInput;
    
    
		if(finalValue !== ""){
			const disassembled = Hangul.disassemble(finalValue, true);

			// 만약 아직 "초성+중성" 상태에서 자음 입력이 있었으면 commit을 미루기 (예: "가" 상태에서 자음 입력 가능)
			if (disassembled.length === 2 && lastKey && /^[ㄱ-ㅎ]$/.test(lastKey)) {
				setLastKey(null);
				return;
			}
			setLetters(prev => {
				const newArr = [...prev];
				newArr[activeIndex] = finalValue;
				return newArr;
			});
			setLastKey(null);
			if (activeIndex < answerLength - 1) {
				setActiveIndex(activeIndex + 1);
			}
			setCurrentInput("");

		}
		
  };

  // onKeyDown: Tab키와 Backspace 등을 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			e.preventDefault();

			const lastBoxIndex = activeIndex+1;
			if(lastBoxIndex === answerLength){
				setLetters((prevLetters) => {
					const newLetters = [...prevLetters];
					newLetters[prevLetters.length - 1] = "";
					return newLetters;
				})
			}
			setActiveIndex((prevIndex) => {
				const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
				setCurrentInput(""); // 새 인덱스의 입력값을 비웁니다.
				setLetters((prevLetters) => {
					const newLetters = [...prevLetters];
					newLetters[newIndex] = ""; // 새 인덱스에 해당하는 박스를 클리어
					return newLetters;
				});
				return newIndex;
			});
		}else if (e.key === "Tab") {
			e.preventDefault();
			if (currentInput !== "") {
				commitLetter();
				setActiveIndex(prev => prev + 1);
			}
		} else {
			setLastKey(e.key);
		};
  };
	

  // composition 종료 시 commit
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    commitLetter();
  };

  // input blur 시 commit (입력 중단 시)
  const handleBlur = () => {
    if (currentInput !== "") {
      commitLetter();
    }
  };

  // 셀(박스)를 클릭하면 해당 셀이 활성화되며, 기존 내용은 삭제되어 빈 칸으로 전환
  const handleBoxClick = (index: number) => {
    setLetters(prev => {
      const newArr = [...prev];
      newArr[index] = "";
      return newArr;
    });
    setActiveIndex(index);
    setCurrentInput("");
    inputRef.current?.focus();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 숨겨진 input: 화면에 보이지 않도록 off-screen 처리 */}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
        style={{
          position: "absolute",
          left: "-1000px",
          opacity: 0,
          caretColor: "black"
        }}
      />
      {/* 셀(박스) 렌더링 영역 */}
      <div style={{ display: "flex" }}>
        {letters.map((letter, index) => {
          // 활성 셀은 currentInput의 값(혹은 letters의 값)이, 그 외는 그대로 표시
          const displayLetter = index === activeIndex ? (currentInput || letter) : letter;
          return (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleBoxClick(index);
              }}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "5px",
                fontSize: "1.5rem",
                backgroundColor: index === activeIndex ? "skyblue" : "white",
                cursor: "pointer"
              }}
            >
              {displayLetter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleInputQuiz;
