// QuizInput.tsx
import React from "react";
import SingleInput from "@/shared/ui/singleInput/SingleInput";

interface QuizInputProps {
  answerLength: number;
  // 추가적인 필요한 props들이 있다면 여기에 정의
}

const QuizInput: React.FC<QuizInputProps> = ({ answerLength }) => {
  return (
    <div className="text-center">
      {/* SingleInput 컴포넌트를 호출하여 answerLength를 전달 */}
      <SingleInput answerLength={answerLength} />
    </div>
  );
};

export default QuizInput;
