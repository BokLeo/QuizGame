// SingleInput.tsx
import React from "react";
import { SingleInputHook } from "./SingleInputHook";
import styles from "./SingleInput.module.scss";

interface SingleInputProps {
  answerLength: number;
}

const SingleInput: React.FC<SingleInputProps> = ({ answerLength }) => {
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
    </div>
  );
};

export default SingleInput;
