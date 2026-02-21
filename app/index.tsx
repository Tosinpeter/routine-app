import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { AnimatedSplashScreen } from "@/components/splash-screen";
import { useAuth } from "@/contexts/AuthContext";

export default function SplashRoute() {
  const router = useRouter();
  const { isAuthenticated, profile, isLoading } = useAuth();
  const [splashComplete, setSplashComplete] = useState(false);

  const navigateFromAuthState = useCallback(() => {
    if (!isAuthenticated) {
      router.replace("/auth/phone-verification");
      return;
    }
    if (!profile || !profile.isProfileComplete()) {
      router.replace("/start-analysis");
      return;
    }
    router.replace("/(tabs)");
  }, [router, isAuthenticated, profile]);

  const handleSplashComplete = useCallback(() => {
    setSplashComplete(true);
  }, []);

  useEffect(() => {
    if (!isLoading && splashComplete) {
      navigateFromAuthState();
    }
  }, [isLoading, splashComplete, navigateFromAuthState]);

  return <AnimatedSplashScreen onComplete={handleSplashComplete} />;
}
