"use client";
import { ReactNode } from "react";
import ModulesLayout from "./modules/ModulesLayout";
import QuizInput from "./QuizInput";

interface QuizLayoutProps {
  title: string;
  children: ReactNode;
  answerLength: number; // 정답의 글자 수에 따라 입력칸 개수를 조절
}

export default function QuizLayout({ title, children, answerLength }: QuizLayoutProps) {
  // 정답 제출 시 처리할 로직 (예시로 콘솔 출력)
  const handleAnswerSubmit = (answer: string) => {
    console.log("Submitted Answer:", answer);
    // 여기서 정답 검증 또는 상태 업데이트 등을 진행할 수 있습니다.
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-4">
      {/* 상단 - 제목 */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* 중단 - 퀴즈 내용 */}
      <div className="border rounded-md p-4 shadow-md bg-white relative w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
        {children}
        <ModulesLayout />
      </div>

      {/* 하단 - 정답 입력 */}
      <div className="mt-8 w-full max-w-xl mx-auto">
        <QuizInput length={answerLength} onSubmit={handleAnswerSubmit} />
      </div>
    </div>
  );
}
