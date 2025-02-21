"use client";
import { ReactNode } from "react";
import ModulesLayout from "./modules/ModulesLayout";
import QuizInput from "./QuizInput";

interface QuizLayoutProps {
  title: string;
  children: ReactNode;
  answerLength: number;
  onSubmit: (answer: string) => void;
}

export default function QuizLayout({ title, children, answerLength, onSubmit }: QuizLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="border rounded-md p-4 shadow-md bg-white relative w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center">
        {children}
        <ModulesLayout />
      </div>
      <div className="mt-8 w-full max-w-xl mx-auto">
        <QuizInput answerLength={answerLength} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
