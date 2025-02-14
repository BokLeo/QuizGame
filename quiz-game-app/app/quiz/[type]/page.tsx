"use client";
import { use } from "react";

// 각 퀴즈 타입에 대응하는 컴포넌트를 import합니다.
import ProverbQuiz from "@/features/quiz/ProverbQuiz";
import FourwordQuiz from "@/features/quiz/FourwordQuiz";
import CharacterQuiz from "@/features/quiz/CharacterQuiz";

export default function QuizPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params); // Promise 해제
	console.log(type);
  switch (type) {
    case "Proverb":
      return <ProverbQuiz />;
    case "Fourword":
      return <FourwordQuiz />;
    case "Character":
      return <CharacterQuiz />;
    default:
      return <div className="flex flex-col items-center justify-center h-screen">알 수 없는 퀴즈 타입입니다.</div>;
  }
}
