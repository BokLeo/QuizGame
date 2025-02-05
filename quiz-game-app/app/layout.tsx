// app/layout.tsx
import './globals.css'; // 글로벌 스타일 파일이 app 폴더 내에 있다고 가정합니다.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Quiz & Game Project</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
