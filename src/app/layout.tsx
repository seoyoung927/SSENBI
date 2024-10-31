import { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import ResponsiveTabBar from "./components/layout/ResponsiveTabBar";
import { useAuthRedirect } from "@/utils/useAuthRedirect";
import useAuthStore from "@/stores/authStore";

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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useAuthRedirect(isLoggedIn);

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
