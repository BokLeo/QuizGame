import Link from 'next/link';

export default function StartPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">다음 페이지</h1>
      <p className="mt-4 text-lg">이곳이 다음 페이지입니다.</p>
      <Link href="/" className="">홈으로 돌아가기</Link>
    </main>
  );
}
