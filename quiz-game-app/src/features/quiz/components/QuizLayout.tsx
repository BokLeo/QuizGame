import React, { useEffect, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizInput from "./QuizInput";
import QuizSettings from "./QuizSettings";
import QuizComplete from "./QuizComplete";  // QuizComplete 임포트
import ModulesLayout from "./modules/ModulesLayout";
import { getChosung } from "@/utils/textUtils";

interface QuizLayoutProps {
  title: string;            // 제목을 받는 문자열 타입
  answerLength: number;     // 정답 길이를 받는 숫자 타입
  onSubmit: (answer: string) => void;  // 정답 제출 함수, answer는 문자열 타입
  currentQuiz: { 문제: string, 정답: string, 설명: string }; // 현재 퀴즈에 대한 정보
  feedback: string;         // 피드백을 받는 문자열 타입
  handleStartQuiz: (questionCount: number) => void;  // 퀴즈 시작 함수, questionCount는 숫자 타입
  isQuizCompleted: boolean; // 퀴즈 완료 여부를 받는 불리언 타입
  isQuizStarted: boolean;   // 퀴즈 시작 여부를 받는 불리언 타입
  isCorrect: boolean[];       // 각 문제 정답 여부를 받는 불리언 타입 배열
	currentIndex: number;
	onRetry: () => void;			// 다시 하기 함수
}

export default function QuizLayout({
  title,
  answerLength,
  onSubmit,
  currentQuiz,
  feedback,
  handleStartQuiz,
  isQuizCompleted,  // 퀴즈 완료 여부 받기
	isQuizStarted,
	isCorrect,
	currentIndex,
	onRetry,
}: QuizLayoutProps) {

	const [hintClicked, setHintClicked] = useState(false);
	const [hint, setHint] = useState(''); // 초성 힌트를 저장할 상태

	const handleHintClick = () => {	
		setHintClicked(!hintClicked);
	};

	 // hintClicked가 true일 때 힌트(초성)를 설정
	 useEffect(() => {
    if (hintClicked) {
      setHint(getChosung(currentQuiz.정답)); // currentQuiz의 정답을 getChosung을 통해 초성으로 변환
    } else {
      setHint(''); // 힌트가 숨겨지면 초기화
    }
  }, [hintClicked, currentQuiz.정답]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

			{!isQuizCompleted ? (
				// 퀴즈 진행 중일 때
				isQuizStarted ? (
					<>
						<div className="border rounded-md p-4 shadow-md bg-white relative w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
							<QuizQuestion currentQuiz={currentQuiz} feedback={feedback} isCorrect={isCorrect[currentIndex]} />
							<ModulesLayout onHintClicked={handleHintClick} />
						</div>

						{/* 힌트 표시 */}
						{hintClicked && (
							<div className="mt-4 msg hint">
								{hint}
							</div>
						)}

						<div className="mt-4 w-full max-w-xl mx-auto">
							<QuizInput questionNumber={currentIndex + 1} answerLength={answerLength} onSubmit={onSubmit} />
						</div>
					</>
				) : (
					<QuizSettings onStart={handleStartQuiz} />
				)
			) : (
				<QuizComplete onRetry={onRetry} isCorrect={isCorrect} />
			)}

    </div>
  );
}
