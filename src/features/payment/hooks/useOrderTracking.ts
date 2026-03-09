import { useCallback, useEffect, useState } from "react";
import { client } from "@/shared/api/client";
import { useAppSelector } from "@/shared/store/hooks";

export interface OrderTrackingData {
  trackingNumber: string | null;
  carrier: string | null;
  status: "in_transit" | "shipped" | "out_for_delivery" | "delivered";
  estimatedArrivalDay: string | null;
  brandName: string | null;
  orderDate: string | null;
  mapCoordinate: { latitude: number; longitude: number } | null;
}

interface UseOrderTrackingResult {
  data: OrderTrackingData | null;
  customerName: string | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useOrderTracking(orderId: string): UseOrderTrackingResult {
  const [data, setData] = useState<OrderTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const customerName =
    useAppSelector((s) => s.session.profile?.fullname) ?? null;

  const fetchTracking = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: res } = await client.get<{
        success?: boolean;
        tracking?: OrderTrackingData;
      }>(`/api/orders/${orderId}/tracking`);

      if (res?.success && res.tracking) {
        setData(res.tracking);
      } else {
        setData(null);
        setError("Unable to load tracking information");
      }
    } catch {
      setData(null);
      setError("Unable to load tracking information");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchTracking();
  }, [fetchTracking]);

  return { data, customerName, isLoading, error, refetch: fetchTracking };
}
