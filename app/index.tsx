import { useRouter } from "expo-router";
import { useCallback } from "react";

import { AnimatedSplashScreen } from "@/components/splash-screen";

export default function SplashRoute() {
  const router = useRouter();

  const handleSplashComplete = useCallback(() => {
    router.replace("/auth/phone-verification");
  }, [router]);

  return <AnimatedSplashScreen onComplete={handleSplashComplete} />;
}
