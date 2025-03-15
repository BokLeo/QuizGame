"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

import style from "./Navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavigationContent() {
  const searchParams = useSearchParams();
  const selectedMenu = searchParams?.get("menu") || "/";

  // ✅ 네비게이션 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(true);

  // ✅ 버튼 클릭 시 네비게이션 토글
  const toggleNavigation = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <aside
        id="navigation" // ✅ ID를 style.navigation에서 "navigation"으로 변경
        className={`${style.navigation} ${isOpen ? style.open : style.closed}`} // ✅ 올바른 className 적용 방식
      >
        {/* ✅ 네비게이션 토글 버튼 */}
        <button
          onClick={toggleNavigation}
          className={style.toggleBtn} // ✅ SCSS에서 스타일 관리
          title={isOpen ? "네비게이션 닫기" : "네비게이션 열기"} // ✅ 툴팁 추가
          aria-label={isOpen ? "네비게이션 닫기" : "네비게이션 열기"} // ✅ 스크린 리더 지원
        >
          <FontAwesomeIcon icon={isOpen ? "angles-left" : "angles-right"} />
        </button>

        <Link href="/">홈</Link>
        <Link
          href="/quiz/Proverb"
          className={`${selectedMenu === "Proverb" ? "bg-gray-700" : ""}`}
        >
          속담 맞추기
        </Link>
        <Link
          href="/quiz/Fourword"
          className={`${selectedMenu === "Fourword" ? "bg-gray-700" : ""}`}
        >
          사자성어 맞추기
        </Link>
        <Link
          href="/quiz/Character"
          className={`${selectedMenu === "Character" ? "bg-gray-700" : ""}`}
        >
          캐릭터 맞추기
        </Link>
        <Link href="/settings">설정</Link>
      </aside>
    </>
  );
}

export default function Navigation() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NavigationContent />
    </Suspense>
  );
}
