"use client";
import QuizLayout from "@/features/quiz/components/QuizLayout";
import QuizQuestion from "@/features/quiz/components/QuizQuestion";

export default function ProverbQuiz() {
  // 예시로 정답 글자 수를 5로 가정
  return (
    <QuizLayout title="속담 맞추기" answerLength={5}>
      <QuizQuestion question="하늘에서 ...이/가 떨어진다." />
    </QuizLayout>
  );
}
