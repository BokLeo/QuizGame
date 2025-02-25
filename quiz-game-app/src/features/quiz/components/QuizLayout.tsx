import React from "react";
import QuizQuestion from "./QuizQuestion";
import QuizInput from "./QuizInput";
import QuizSettings from "./QuizSettings";
import QuizComplete from "./QuizComplete";  // QuizComplete 임포트

interface QuizLayoutProps {
  title: string;
  answerLength: number;
  onSubmit: (answer: string) => void;
  currentQuiz: { 문제: string } | null;
  feedback: string;
  handleStartQuiz: (questionCount: number) => void;
  isQuizCompleted: boolean;  // 퀴즈 완료 여부를 받는 prop
	isQuizStarted: boolean;
	isCorrect: boolean;
}

export default function QuizLayout({
  title,
  answerLength,
  onSubmit,
  currentQuiz,
  feedback,
  handleStartQuiz,
  isQuizCompleted,  // 퀴즈 완료 여부 받기
}: QuizLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

			{!isQuizCompleted ? (
				// 퀴즈 진행 중일 때
				currentQuiz ? (
					<>
						<div className="border rounded-md p-4 shadow-md bg-white relative w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
							<QuizQuestion question={currentQuiz.문제} feedback={feedback} isCorrect={feedback === "정답입니다!"} />
						</div>

						<div className="mt-8 w-full max-w-xl mx-auto">
							<QuizInput answerLength={answerLength} onSubmit={onSubmit} />
						</div>
					</>
				) : (
					<QuizSettings onStart={handleStartQuiz} />
				)
			) : (
				<QuizComplete title="속담 맞추기" />
			)}

    </div>
  );
}
