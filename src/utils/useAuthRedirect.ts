import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = (isLoggedIn: boolean | undefined) => {
  const router = useRouter();
  const pathname = usePathname();
  const excludedRoutes = ["/auth/login", "/auth/signup"];

  useEffect(() => {
    if (
      isLoggedIn === false &&
      !pathname.startsWith("/template") && // "/template"로 시작하는 경로 허용
      !excludedRoutes.includes(pathname) // "/auth/login", "/auth/signup" 허용
    ) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, pathname, router]);
};
