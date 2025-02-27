"use client";

import "@/styles/globals.scss";
import "@/styles/custom.scss";
import "@fortawesome/fontawesome-free/css/all.css";


import { usePathname } from "next/navigation";
import Navigation from "@/shared/ui/navigation/Navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavigation = pathname !== "/"; // 첫 페이지('/')에서는 네비게이션 숨김

  return (
    <html lang="en">
      <body className="flex h-screen">
        {showNavigation && <Navigation />}
        <main className="flex-1 flex flex-col items-center justify-center h-screen p-4">{children}</main>
      </body>
    </html>
  );
}
