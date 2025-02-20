import React from "react";
import { SingleInputHook } from "./SingleInputHook";
import styles from "./SingleInput.module.scss";

interface SingleInputProps {
  answerLength: number;
  onSubmit?: (answer: string) => void;
}

const SingleInput: React.FC<SingleInputProps> = ({ answerLength, onSubmit }) => {
  const {
    letters,
    activeIndex,
    currentInput,
    inputRef,
    handleChange,
    handleKeyDown,
    handleCompositionEnd,
    handleBlur,
    handleBoxClick,
  } = SingleInputHook(answerLength);

  // 현재 상태(커서 위치에 따라 미완료된 글자 포함)에서 최종 정답 문자열을 생성
  const finalAnswer = letters.map((letter, index) =>
    index === activeIndex ? (currentInput || letter) : letter
  ).join("");

  return (
    <div className={styles.quizInputContainer}>
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
        className={styles.hiddenInput}
      />
      <div className={styles.boxContainer}>
        {letters.map((letter, index) => {
          const displayLetter = index === activeIndex ? (currentInput || letter) : letter;
          return (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleBoxClick(index);
              }}
              className={`${styles.inputBox} ${
                index === activeIndex ? styles.activeBox : styles.inactiveBox
              }`}
            >
              {displayLetter}
            </div>
          );
        })}
      </div>
      {/* onSubmit prop이 존재하면 제출 버튼 렌더링 */}
      {onSubmit && (
        <button
          onClick={() => onSubmit(finalAnswer)}
          className={styles.submitButton}
        >
          제출
        </button>
      )}
    </div>
  );
};

export default SingleInput;
