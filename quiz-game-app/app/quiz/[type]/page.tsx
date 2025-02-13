"use client"; // ✅ 추가

export default function QuizPage({ params }: { params: { type: string } }) {
  return (
    <div>
      <h1>{params.type} 퀴즈 페이지</h1>
    </div>
  );
}
