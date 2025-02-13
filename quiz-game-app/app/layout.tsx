"use client";

// globals.css import
// import "./styles/globals.scss"
// import "./styles/custom.scss"
import "@/styles/globals.scss";
import "@/styles/custom.scss";

import { usePathname } from "next/navigation";
import Navigation from "@/shared/ui/Navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavigation = pathname !== "/"; // 첫 페이지('/')에서는 네비게이션 숨김

  return (
    <html lang="en">
      <body className="flex">
        {showNavigation && <Navigation />}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
