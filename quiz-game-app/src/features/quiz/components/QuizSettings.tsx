import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface QuizSettingsProps {
  onStart: (questionCount: number) => void;
  defaultCount?: number;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({
  onStart,
  defaultCount = 5,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(defaultCount);

  const handleIncrement = () => {
    if (questionCount < 20) {
      setQuestionCount(questionCount + 1);
    }
  };

  const handleDecrement = () => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* 문항 수 입력 */}
      <div className="mb-8 flex items-center space-x-8">
        <button
          onClick={handleIncrement}
          className="unit-button h-12 w-12 rounded-full bg-gray-400 text-white hover:cursor-pointer hover:bg-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon="plus" />
        </button>
        <div className="text-9xl font-black">{questionCount}</div>
        <button
          onClick={handleDecrement}
          className="unit-button flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon="minus" />
        </button>
      </div>

      <button
        onClick={() => onStart(questionCount)}
        className="main-button text-lg font-semibold text-white shadow-lg"
      >
        시작
      </button>
    </div>
  );
};

export default QuizSettings;
