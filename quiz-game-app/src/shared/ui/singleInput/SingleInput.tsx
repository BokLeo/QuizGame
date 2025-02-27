import React from "react";
import { SingleInputHook } from "./SingleInputHook";
import styles from "./SingleInput.module.scss";

interface SingleInputProps {
	questionNumber: number;
  answerLength: number;
  onSubmit?: (answer: string) => void;
}

const SingleInput: React.FC<SingleInputProps> = ({ questionNumber, answerLength, onSubmit }) => {
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
  } = SingleInputHook(questionNumber, answerLength);

  // 현재 상태(커서 위치에 따라 미완료된 글자 포함)에서 최종 정답 문자열을 생성
  const finalAnswer = letters.map((letter, index) =>
    index === activeIndex ? (currentInput || letter) : letter
  ).join("");

	// onKeyDown 이벤트를 감싸서, 마지막 박스에서 Enter 키가 눌리면 onSubmit을 호출하도록 함
  const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// 마지막 박스에서 Enter 키가 눌렸고, 최종 정답 문자열의 길이가 answerLength와 동일한 경우에만 제출 처리
		if (
			e.key === "Enter" &&
			activeIndex === answerLength - 1 &&
			finalAnswer.length === answerLength
		) {
			e.preventDefault();
			if (onSubmit) {
				onSubmit(finalAnswer);
			}
			return;
		}
		handleKeyDown(e);
	};

  return (
    <div className={styles.quizInputContainer}>
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleChange}
        onKeyDown={handleKeyDownWrapper}
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
        // Submit 버튼을 스타일링하기 위한 예시 코드
				<button
					onClick={() => onSubmit(finalAnswer)}
					className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none transition-all duration-300"
				>
					ENTER
				</button>

      )}
    </div>
  );
};

export default SingleInput;
