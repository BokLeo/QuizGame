"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavigationContent() {
  const searchParams = useSearchParams();
  const selectedMenu = searchParams.get("menu") || "/";

  return (
    <aside className="w-52 bg-gray-800 text-white flex flex-col items-center p-2">
      <Link href="/" className="mb-4 block text-center w-full p-2">
        홈
      </Link>
      <Link href="/quiz/proverb" className={`${selectedMenu === "proverb" ? "bg-gray-700" : ""}`}>속담 맞추기</Link>
      <Link href="/settings">설정</Link>
    </aside>
  );
}

export default function Navigation() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NavigationContent />
    </Suspense>
  );
}
