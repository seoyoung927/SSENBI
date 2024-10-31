// src/utils/authUtils.ts
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = (isLoggedIn: boolean) => {
  const router = useRouter();
  const pathname = usePathname();
  const excludedRoutes = ["/template", "/auth/login", "/auth/signup"];

  useEffect(() => {
    if (!isLoggedIn && !excludedRoutes.includes(pathname)) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, pathname, router]);
};
