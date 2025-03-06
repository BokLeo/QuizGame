import { useEffect, useState } from "react";

interface QuizQuestionProps {
  currentQuiz: { 문제: string; 정답: string; 설명: string };
  feedback: string;
  isCorrect: boolean;
}

export default function QuizQuestion({
  currentQuiz,
  feedback,
  isCorrect,
}: QuizQuestionProps) {
	const [questionWithAnswer, setQuestionWithAnswer] = useState(currentQuiz.문제);

	 // isCorrect가 변경될 때마다 문제 업데이트
	 useEffect(() => {
		
    if (!isCorrect) {
			debugger;
      setQuestionWithAnswer(currentQuiz.문제); // 정답일 경우 원본 문제 표시
    } else {
			debugger;
			setQuestionWithAnswer(currentQuiz.문제.replace("___", currentQuiz.정답));
    }
  }, [isCorrect, currentQuiz]);

  return (
    <div className="text-lg w-full h-full flex items-center justify-center flex-col px-6">
      {/* 퀴즈 설명 */}
      <div className="mb-6 text-base italic text-gray-600">
        <p>“{currentQuiz.설명}”</p>
      </div>

      {/* 퀴즈 문제 */}
      <div className="text-3xl font-bold mb-6">{questionWithAnswer}</div>

		  {/* 틀린 경우 정답 표시 */}
      {feedback && !isCorrect && (
        <div className="mt-4 text-lg font-bold text-red-600">
          <p>정답: {currentQuiz.정답}</p>
        </div>
      )}

      {/* 피드백 메시지 */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded-md text-center transition-all duration-500 
          ${isCorrect ? "bg-green-100 text-green-600 border-green-500" : "bg-red-100 text-red-600 border-red-500"}`}
        >
          <div className="text-xl font-semibold">{feedback}</div>
        </div>
      )}
    </div>
  );
}
