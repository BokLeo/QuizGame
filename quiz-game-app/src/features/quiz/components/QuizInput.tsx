import React from "react";
import SingleInput from "@/shared/ui/singleInput/SingleInput";

interface QuizInputProps {
  answerLength: number;
  onSubmit: (answer: string) => void;
}

const QuizInput: React.FC<QuizInputProps> = ({ answerLength, onSubmit }) => {
  return (
    <div className="text-center">
      <SingleInput answerLength={answerLength} onSubmit={onSubmit} />
    </div>
  );
};

export default QuizInput;
