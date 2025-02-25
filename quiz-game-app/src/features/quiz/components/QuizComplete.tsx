import React from "react";

interface QuizCompleteProps {
  title: string;
}

const QuizComplete: React.FC<QuizCompleteProps> = () => {
  return (
    <>
			<div>퀴즈 완료!</div>
		</>
  );
};

export default QuizComplete;
