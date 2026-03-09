import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import NoInternetScreen from '@/app/no-internet';
import React, { ReactNode } from 'react';

interface NetworkStatusWrapperProps {
  children: ReactNode;
  onRetry?: () => void;
}

/**
 * Wrapper component that shows NoInternetScreen when there's no connection
 * Usage: Wrap your app or specific screens with this component
 */
export function NetworkStatusWrapper({ children, onRetry }: NetworkStatusWrapperProps) {
  const { isConnected, isInternetReachable } = useNetworkStatus();

  // Show no internet screen if definitely not connected
  // Note: We only show it if isConnected is explicitly false to avoid flashing on initial load
  if (isConnected === false || isInternetReachable === false) {
    return <NoInternetScreen onRetry={onRetry} />;
  }

  return <>{children}</>;
}
