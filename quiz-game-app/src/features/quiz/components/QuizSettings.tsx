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
      <div className="flex items-center space-x-8 mb-8">
        <button
          onClick={handleIncrement}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none"
        >
          <i className="fas fa-plus"></i> {/* + 아이콘 */}
        </button>
        <div className="text-9xl font-black">{questionCount}</div>
        <button
          onClick={handleDecrement}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none"
        >
          <i className="fas fa-minus"></i> {/* - 아이콘 */}
        </button>
      </div>

      <button
        onClick={() => onStart(questionCount)}
        className="px-6 py-3 text-white text-lg font-semibold bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-lg shadow-lg transition duration-300"
      >
        시작
      </button>
    </div>
  );
};

export default QuizSettings;
