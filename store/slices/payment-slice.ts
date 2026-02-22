import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client, getErrorMessage } from "@/api/client";
import { toast } from "@backpackapp-io/react-native-toast";

export type DeliveryMethod = "delivery" | "pickup";

export interface AppliedCoupon {
  code: string;
  discount_cents: number;
}

interface PaymentState {
  deliveryMethod: DeliveryMethod;
  appliedCoupon: AppliedCoupon | null;
  couponLoading: boolean;
}

const initialState: PaymentState = {
  deliveryMethod: "delivery",
  appliedCoupon: null,
  couponLoading: false,
};

export const validateCoupon = createAsyncThunk<
  AppliedCoupon,
  { code: string; subtotal_cents: number },
  { rejectValue: string }
>(
  "payment/validateCoupon",
  async ({ code, subtotal_cents }, { rejectWithValue }) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      const msg = "Coupon code is required";
      toast.error(msg);
      return rejectWithValue(msg);
    }
    try {
      const { data } = await client.post<{
        success?: boolean;
        valid?: boolean;
        discount_cents?: number;
        message?: string;
        error?: string;
      }>("/api/coupons/validate", {
        code: trimmed,
        subtotal_cents,
      });
      if (data?.valid && data?.discount_cents != null) {
        return { code: trimmed, discount_cents: data.discount_cents };
      }
      const msg = data?.message ?? getErrorMessage(new Error(data?.error ?? "Invalid coupon"));
      toast.error(msg);
      return rejectWithValue(msg);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      state.deliveryMethod = action.payload;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.couponLoading = false;
        state.appliedCoupon = action.payload;
      })
      .addCase(validateCoupon.rejected, (state) => {
        state.couponLoading = false;
      });
  },
});

export const { setDeliveryMethod, removeCoupon } = paymentSlice.actions;
export default paymentSlice.reducer;
