import { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import ResponsiveTabBar from "./components/layout/ResponsiveTabBar";
import LoginStateChecker from "./LoginStateChecker";

const pretendard = localFont({
  src: "./assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "SSENBI",
  description: "비즈니스 메시지 솔루션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/images/ssenbi_character.ico"
          type="image/x-icon"
        />
      </head>
      <body className={`${pretendard.variable}`}>
        <ResponsiveTabBar />
        {/* TODO :  추후 로그인 기능 완성 후 주석 제거
        <LoginStateChecker />
        */}
        {children}
      </body>
    </html>
  );
}
