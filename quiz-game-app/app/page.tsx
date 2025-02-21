import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">첫 번째 페이지</h1>
      <p className="mt-4 text-lg">환영합니다! 다음 페이지로 이동해보세요.</p>
      
      {/* Next.js의 Link 컴포넌트를 사용하여 페이지 이동 */}
      <Link href="/quiz/Proverb" className={`bg-gray-700`}>
        <button className="main-button">Get Started</button>
      </Link>

    </main>
  );
}