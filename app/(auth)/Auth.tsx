"use client";

// Import libraries
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Import utils
import { ROUTES } from "@/utils/constants";
import setAxiosConfig from "@/utils/axiosConfig";

export interface AuthProps {
  children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { data: sessionData, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`${ROUTES.user.LOGIN}`);
    },
  });

  if (sessionData?.accessToken) {
    setAxiosConfig(sessionData?.accessToken);
  }

  if (status === "loading") {
    return <div></div>;
  }
  return children;
}
