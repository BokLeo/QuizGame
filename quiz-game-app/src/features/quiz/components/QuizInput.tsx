import React, { useState, useRef, useEffect } from "react";
import Hangul from "hangul-js";

interface SingleInputQuizProps {
  answerLength: number;
}

const SingleInputQuiz: React.FC<SingleInputQuizProps> = ({ answerLength }) => {
  const [letters, setLetters] = useState<string[]>(Array(answerLength).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [lastKey, setLastKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 활성 박스가 바뀌거나 letters 배열이 변경되면 해당 값을 currentInput에 반영하고 포커스
  useEffect(() => {
    setCurrentInput(letters[activeIndex] || "");
    inputRef.current?.focus();
  }, [activeIndex, letters]);

  // 현재 입력값이 최대 조합 상태이면 자동 commit
  useEffect(() => {
    if (currentInput && isMaxComposition(currentInput)) {
      commitLetter();
    }
  }, [currentInput]);

  // 한글 조합 최대치 판단: 
  // [초성, 중성]이면 미완성, [초성, 중성, 단일 종성]이면 단일 종성이 추가 결합 가능한 경우 미완성
  const isMaxComposition = (text: string): boolean => {
    if (!text) return false;
    const disassembled = Hangul.disassemble(text, true);
    if (disassembled.length === 2) return false;
    if (disassembled.length === 3) {
			// 추가 자음 결합이 가능한 경우: ㄱ, ㄴ, ㄹ, ㅂ는 추가 자음(예: ㅅ)과 결합할 수 있음
      const finalConsonantArray = disassembled[2];
			const finalConsonant = finalConsonantArray[0]; // 배열의 첫 번째 요소 사용
			const combinable = new Set(["ㄱ", "ㄴ", "ㄹ", "ㅂ"]);
			return !combinable.has(finalConsonant);
    }
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const commitLetter = () => {
    const finalValue = currentInput;
    if (finalValue) {
      const disassembled = Hangul.disassemble(finalValue, true);
      // 만약 초성+중성 상태에서 자음이 입력되었다면 commit을 미룸
      if (disassembled.length === 2 && lastKey && /^[ㄱ-ㅎ]$/.test(lastKey)) {
        setLastKey(null);
        return;
      }
      setLetters((prev) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      // 만약 현재 박스에 내용이 있다면 해당 박스를 클리어
      if (currentInput.length > 0) {
        setCurrentInput("");
        setLetters((prev) => {
          const newArr = [...prev];
          newArr[activeIndex] = "";
          return newArr;
        });
      }
      // 현재 박스가 비어있다면 이전 박스로 이동 후, 그 박스의 내용을 클리어
      else if (activeIndex > 0) {
        setActiveIndex((prevIndex) => {
          const newIndex = prevIndex - 1;
          setLetters((prevLetters) => {
            const newArr = [...prevLetters];
            newArr[newIndex] = "";
            return newArr;
          });
          setCurrentInput("");
          return newIndex;
        });
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (currentInput) {
        commitLetter();
      } else if (activeIndex < answerLength - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else {
      setLastKey(e.key);
    }
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    commitLetter();
  };

  const handleBlur = () => {
    if (currentInput) {
      commitLetter();
    }
  };

  // 박스를 클릭하면 해당 박스를 활성화하고, 기존 내용은 삭제하여 빈 칸으로 전환
  const handleBoxClick = (index: number) => {
    setLetters((prev) => {
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
      <div style={{ display: "flex" }}>
        {letters.map((letter, index) => {
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
