import { ReactNode } from "react";

interface QuizLayoutProps {
  title: string;
  children: ReactNode;
}

export default function QuizLayout({ title, children }: QuizLayoutProps) {
  return (
    <div className="p-6">
      {/* 상단 - 제목 */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* 중단 - 퀴즈 내용 */}
      <div className="border rounded-md p-4 shadow-md bg-white relative">
        {children}
        {/* (추후 추가될 기능: 힌트 보기, 버그 리포트 버튼) */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="text-blue-500">힌트</button>
          <button className="text-red-500">버그 리포트</button>
        </div>
      </div>

      {/* 하단 - 정답 입력 */}
      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="정답을 입력하세요"
        />
      </div>
    </div>
  );
}
