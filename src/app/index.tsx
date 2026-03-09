import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { AnimatedSplashScreen } from "@/components/splash-screen";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { useAuth } from "@/shared/store/hooks/use-auth";

export default function SplashRoute() {
  const router = useRouter();
  const { isAuthenticated, profile, isLoading } = useAuth();
  const { hasCompleted } = useOnboarding();
  const [splashComplete, setSplashComplete] = useState(false);

  const navigateFromAuthState = useCallback(() => {
    if (!hasCompleted) {
      router.replace("/onboarding");
      return;
    }
    if (!isAuthenticated) {
      router.replace("/auth/phone-verification");
      return;
    }
    if (!profile || !profile.isProfileComplete()) {
      router.replace("/start-analysis");
      return;
    }
    router.replace("/(tabs)");
  }, [router, isAuthenticated, profile, hasCompleted]);

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
