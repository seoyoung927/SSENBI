import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = (isLoggedIn: boolean | undefined) => {
  const router = useRouter();
  const pathname = usePathname();
  const excludedRoutes = ["/template", "/auth/login", "/auth/signup"];

  useEffect(() => {
    if (isLoggedIn === false && !excludedRoutes.includes(pathname)) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, pathname, router]);
};
