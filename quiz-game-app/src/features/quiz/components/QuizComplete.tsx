import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface QuizCompleteProps {
  onRetry: () => void; // Function to reset and retry the quiz
  isCorrect: boolean[];
}

const QuizComplete: React.FC<QuizCompleteProps> = ({ onRetry, isCorrect }) => {
  const correctCount = isCorrect.filter((correct) => correct).length;
  const totalCount = isCorrect.length;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-3xl font-bold">퀴즈 완료!</div>
      {/* 정답 수 / 총 문제 수 표시 */}
      <div className="my-4 text-lg">
        <p>
          정답 수: <span className="font-bold">{correctCount}</span> /{" "}
          {totalCount}
        </p>
      </div>
      <button
        onClick={onRetry} // Calls the retry function passed as a prop
        className="main-button flex items-center"
      >
        다시 도전! <FontAwesomeIcon icon="sync-alt" className="ml-2" />
      </button>
    </div>
  );
};

export default QuizComplete;
