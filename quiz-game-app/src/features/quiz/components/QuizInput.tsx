"use client";
import React, { useState, useRef } from "react";

interface QuizInputProps {
  length: number;
  onSubmit: (answer: string) => void;
}

interface CellState {
  value: string;       // 최종 확정된 한 글자
  composing: boolean;  // composition 진행 여부
  temp: string;        // 조합 중 임시 값
}

const QuizInput: React.FC<QuizInputProps> = ({ length, onSubmit }) => {
  const [cells, setCells] = useState<CellState[]>(() =>
    Array.from({ length }, () => ({
      value: "",
      composing: false,
      temp: "",
    }))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 유니코드 한글 완성형 체크 (가 ~ 힣)
  const isCompleteHangul = (char: string): boolean => {
    if (!char) return false;
    const code = char.charCodeAt(0);
    return code >= 0xac00 && code <= 0xd7a3;
  };

  // 다음 입력칸으로 포커스 이동
  const focusInput = (index: number) => {
    setTimeout(() => {
      inputRefs.current[index]?.focus();
    }, 0);
  };

  // 입력 변경 핸들러
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setCells((prev) => {
      const newCells = [...prev];

      // 조합 중이면 temp에 저장
      if (newCells[index].composing) {
        newCells[index].temp = inputValue;
      } else {
        // 조합이 끝난 후면 최종 값 확정
        const finalLetter = inputValue[inputValue.length - 1] || "";
        newCells[index].value = finalLetter;

        // 완성된 한글이거나 영문이면 다음 칸으로 이동
        if (isCompleteHangul(finalLetter) || /[a-zA-Z]/.test(finalLetter)) {
          if (index < length - 1) {
            focusInput(index + 1);
          }
        }
      }
      return newCells;
    });
  };

  // IME 조합 시작 시 composing 활성화
  const handleCompositionStart = (index: number) => {
    setCells((prev) => {
      const newCells = [...prev];
      newCells[index].composing = true;
      newCells[index].temp = "";
      return newCells;
    });
  };

  // IME 조합 중 temp 값 업데이트
  const handleCompositionUpdate = (index: number, e: React.CompositionEvent<HTMLInputElement>) => {
    setCells((prev) => {
      const newCells = [...prev];
      newCells[index].temp = e.data;
      return newCells;
    });
  };

  // IME 조합 종료 후 최종 값 확정
  const handleCompositionEnd = (index: number, e: React.CompositionEvent<HTMLInputElement>) => {
    const finalLetter = e.currentTarget.value[e.currentTarget.value.length - 1] || "";

    setCells((prev) => {
      const newCells = [...prev];
      newCells[index].composing = false;
      newCells[index].value = finalLetter;
      newCells[index].temp = "";
      return newCells;
    });

    // 한글이 완성된 경우 다음 칸으로 이동
    if (isCompleteHangul(finalLetter) && index < length - 1) {
      focusInput(index + 1);
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!cells[index].value && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const answer = cells.map((cell) => cell.value).join("");
      onSubmit(answer);
    }
  };

  return (
    <div className="flex gap-2">
      {cells.map((cell, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          value={cell.composing ? cell.temp : cell.value}
          onChange={(e) => handleChange(index, e)}
          onCompositionStart={() => handleCompositionStart(index)}
          onCompositionUpdate={(e) => handleCompositionUpdate(index, e)}
          onCompositionEnd={(e) => handleCompositionEnd(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default QuizInput;
