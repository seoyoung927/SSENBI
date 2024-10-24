import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import ResponsiveTabBar from "./components/layout/ResponsiveTabBar";

const pretendard = localFont({
  src: "./assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "BOBI",
  description: "보내자 비즈니스 메시지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <ResponsiveTabBar />
        {children}
      </body>
    </html>
  );
}
