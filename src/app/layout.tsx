import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import ResponsiveTabBar from "./components/layout/ResponsiveTabBar";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
      </body>
    </html>
  );
}
