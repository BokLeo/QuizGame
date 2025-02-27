import React from "react";
import SingleInput from "@/shared/ui/singleInput/SingleInput"; // SingleInput 임포트

interface QuizInputProps {
	questionNumber: number;
  answerLength: number;
  onSubmit: (answer: string) => void;
}

const QuizInput: React.FC<QuizInputProps> = ({ questionNumber, answerLength, onSubmit }) => {
  const handleSubmit = (answer: string) => {
    onSubmit(answer);  // Quiz에서 받은 onSubmit 함수 호출
  };

  return (
    <div className="text-center">
      <SingleInput
        answerLength={answerLength}
				questionNumber={questionNumber}
        onSubmit={handleSubmit}  // SingleInput에 onSubmit 함수 전달
      />
    </div>
  );
};

export default QuizInput;
