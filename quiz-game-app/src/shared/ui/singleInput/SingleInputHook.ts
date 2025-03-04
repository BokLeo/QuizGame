import { useState, useEffect, useRef } from "react";
import Hangul from "hangul-js";

export function SingleInputHook(questionNumber: number, answerLength: number) {
  const [letters, setLetters] = useState<string[]>(Array(answerLength).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [lastKey, setLastKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  // answerLength prop이 변경될 때마다 상태를 재설정합니다.
  useEffect(() => {
    setLetters(Array(answerLength).fill(""));
    setActiveIndex(0);
    setCurrentInput("");
		inputRef.current?.focus();
  }, [questionNumber, answerLength]);

  // 나머지 handleChange, handleKeyDown, handleCompositionEnd, handleBlur, handleBoxClick 구현...

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const commitLetter = () => {
    const finalValue = currentInput;
    if (finalValue) {
      const disassembled = Hangul.disassemble(finalValue, true);
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
			// currentInput이 있거나, currentInput은 비어있지만 해당 박스(letter)가 비어있지 않으면 지움
			if (currentInput.length > 0 || letters[activeIndex] !== "") {
				setCurrentInput("");
				setLetters((prev) => {
					const newArr = [...prev];
					newArr[activeIndex] = "";
					return newArr;
				});
			} else if (activeIndex > 0) {
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
			// 영문자 입력인 경우 (영문자 입력 시)
			if (e.key.length === 1 && !/[^a-zA-Z]/.test(e.key)) {  // 영문자일 경우
				commitLetter(); // commitLetter 메서드 실행하여 입력된 문자를 처리하고, 다음 박스로 이동
			}
		}
	};

  const handleCompositionEnd = () => {
    commitLetter();
  };

  const handleBlur = () => {
    if (currentInput) {
      commitLetter();
    }
  };

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

  return {
    letters,
    activeIndex,
    currentInput,
    inputRef,
    handleChange,
    handleKeyDown,
    handleCompositionEnd,
    handleBlur,
    handleBoxClick,
  };
}
