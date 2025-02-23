"use client";
import { ReactNode } from "react";
import ModulesLayout from "./modules/ModulesLayout";
import QuizInput from "./QuizInput";

interface QuizLayoutProps {
  title: string;
  children: ReactNode;
  answerLength: number;
  onSubmit: (answer: string) => void;
  showQuizControls?: boolean; // 퀴즈 진행 중일 때 하단 컨트롤 표시 여부
}

export default function QuizLayout({
  title,
  children,
  answerLength,
  onSubmit,
  showQuizControls = true,
}: QuizLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 w-full">
      {/* 타이틀은 항상 보임 */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="border rounded-md p-4 shadow-md bg-white relative w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
        {children}
        {showQuizControls && <ModulesLayout />}
      </div>
      {showQuizControls && (
        <div className="mt-8 w-full max-w-xl mx-auto">
          <QuizInput answerLength={answerLength} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}
