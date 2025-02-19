import { useState, useEffect, useRef } from "react";
import Hangul from "hangul-js";

export function SingleInputHook(answerLength: number) {
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
  }, [answerLength]);

  // 나머지 handleChange, handleKeyDown, handleCompositionEnd, handleBlur, handleBoxClick 구현...

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const isMaxComposition = (text: string): boolean => {
    if (!text) return false;
    const disassembled = Hangul.disassemble(text, true);
    if (disassembled.length === 2) return false;
    if (disassembled.length === 3) {
      const finalConsonantArray = disassembled[2];
      const finalConsonant = finalConsonantArray[0];
      const combinable = new Set(["ㄱ", "ㄴ", "ㄹ", "ㅂ"]);
      return !combinable.has(finalConsonant);
    }
    return false;
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
      if (currentInput.length > 0) {
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
