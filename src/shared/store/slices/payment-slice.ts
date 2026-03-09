import { client, getErrorMessage } from "@/shared/api/client";
import { toast } from "@backpackapp-io/react-native-toast";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeliveryMethod = "delivery" | "pickup";

export interface AppliedCoupon {
  code: string;
  discount_cents: number;
}

export interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
  created_at?: string;
}

export interface CheckoutDeliveryInfo {
  firstName: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  county: string;
  postalCode: string;
  phone: string;
  countryName: string;
}

interface PaymentState {
  deliveryMethod: DeliveryMethod;
  appliedCoupon: AppliedCoupon | null;
  couponLoading: boolean;
  cards: SavedCard[];
  cardsLoading: boolean;
  addCardLoading: boolean;
  chargeLoading: boolean;
  /** Delivery info for checkout summary (set from delivery form or params) */
  checkoutDeliveryInfo: CheckoutDeliveryInfo | null;
  /** Discount code input value before applying */
  discountCodeInput: string;
}

const initialState: PaymentState = {
  deliveryMethod: "delivery",
  appliedCoupon: null,
  couponLoading: false,
  cards: [],
  cardsLoading: false,
  addCardLoading: false,
  chargeLoading: false,
  checkoutDeliveryInfo: null,
  discountCodeInput: "",
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
      const msg =
        data?.message ??
        getErrorMessage(new Error(data?.error ?? "Invalid coupon"));
      toast.error(msg);
      return rejectWithValue(msg);
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const fetchCards = createAsyncThunk<SavedCard[]>(
  "payment/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.get<{
        success?: boolean;
        cards?: SavedCard[];
      }>("/api/cards");
      if (data?.success && Array.isArray(data.cards)) return data.cards;
      return [];
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const addCard = createAsyncThunk<
  { card: SavedCard; saved: boolean },
  {
    number: string;
    exp_month: number;
    exp_year: number;
    save?: boolean;
    set_default?: boolean;
  },
  { rejectValue: string }
>("payment/addCard", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await client.post<{
      success?: boolean;
      card?: SavedCard;
      saved?: boolean;
      message?: string;
      error?: string;
    }>("/api/cards", payload);
    if (!data?.success || !data?.card) {
      const msg = data?.message ?? "Failed to add card";
      toast.error(msg);
      return rejectWithValue(msg);
    }
    if (data.saved) toast.success(data.message ?? "Card saved");
    return { card: data.card, saved: data.saved ?? false };
  } catch (err: unknown) {
    const msg =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? getErrorMessage(err);
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

export const setDefaultCard = createAsyncThunk<
  SavedCard,
  string,
  { rejectValue: string }
>("payment/setDefaultCard", async (cardId, { rejectWithValue }) => {
  try {
    const { data } = await client.patch<{
      success?: boolean;
      card?: SavedCard;
    }>(`/api/cards/${cardId}/default`);
    if (!data?.success || !data?.card) {
      return rejectWithValue("Failed to set default card");
    }
    toast.success("Default card updated");
    return data.card;
  } catch (err) {
    const msg = getErrorMessage(err);
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

export const chargeCard = createAsyncThunk<
  { paid: boolean; amount_cents: number },
  {
    card_id?: string;
    number?: string;
    exp_month?: number;
    exp_year?: number;
    amount_cents: number;
  },
  { rejectValue: string }
>("payment/chargeCard", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await client.post<{
      success?: boolean;
      paid?: boolean;
      amount_cents?: number;
      error?: string;
      message?: string;
    }>("/api/cards/charge", payload);
    if (data?.success && data?.paid) {
      return {
        paid: true,
        amount_cents: data.amount_cents ?? payload.amount_cents,
      };
    }
    const msg = data?.message ?? "Payment failed";
    toast.error(msg);
    return rejectWithValue(msg);
  } catch (err: unknown) {
    const msg =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? getErrorMessage(err);
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

export type CreateOrderPayload = {
  delivery_first_name: string;
  delivery_email: string;
  delivery_address: string;
  delivery_apartment?: string;
  delivery_city: string;
  delivery_postal_code: string;
  delivery_phone?: string;
  delivery_country: string;
  subtotal_cents: number;
  shipment_cents: number;
  insurance_cents: number;
  discount_cents?: number;
  total_cents: number;
  card_last4: string;
  coupon_code?: string;
};

export const createOrder = createAsyncThunk<
  { id: string; status: string; total_cents: number },
  CreateOrderPayload,
  { rejectValue: string }
>("payment/createOrder", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await client.post<{
      success?: boolean;
      order?: { id: string; status: string; total_cents: number };
      error?: string;
      message?: string;
    }>("/api/orders", payload);
    if (data?.success && data?.order) {
      return data.order;
    }
    const msg = data?.message ?? "Failed to create order";
    return rejectWithValue(msg);
  } catch (err: unknown) {
    const msg =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? getErrorMessage(err);
    return rejectWithValue(msg);
  }
});

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
    setCheckoutDeliveryInfo: (
      state,
      action: PayloadAction<CheckoutDeliveryInfo | null>,
    ) => {
      state.checkoutDeliveryInfo = action.payload;
    },
    setDiscountCodeInput: (state, action: PayloadAction<string>) => {
      state.discountCodeInput = action.payload;
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
      })
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.cards = action.payload ?? [];
      })
      .addCase(fetchCards.rejected, (state) => {
        state.cardsLoading = false;
      })
      .addCase(addCard.pending, (state) => {
        state.addCardLoading = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.addCardLoading = false;
        if (action.payload.saved && action.payload.card.id) {
          const exists = state.cards.some(
            (c) => c.id === action.payload.card.id,
          );
          if (!exists) {
            state.cards.push(action.payload.card as SavedCard);
          } else {
            const idx = state.cards.findIndex(
              (c) => c.id === action.payload.card.id,
            );
            if (idx >= 0)
              state.cards[idx] = {
                ...state.cards[idx],
                ...action.payload.card,
              };
          }
          if (action.payload.card.is_default) {
            state.cards.forEach(
              (c) => (c.is_default = c.id === action.payload.card.id),
            );
          }
        }
      })
      .addCase(addCard.rejected, (state) => {
        state.addCardLoading = false;
      })
      .addCase(setDefaultCard.fulfilled, (state, action) => {
        state.cards.forEach((c) => (c.is_default = c.id === action.payload.id));
      })
      .addCase(chargeCard.pending, (state) => {
        state.chargeLoading = true;
      })
      .addCase(chargeCard.fulfilled, (state) => {
        state.chargeLoading = false;
      })
      .addCase(chargeCard.rejected, (state) => {
        state.chargeLoading = false;
      });
  },
});

export const {
  setDeliveryMethod,
  removeCoupon,
  setCheckoutDeliveryInfo,
  setDiscountCodeInput,
} = paymentSlice.actions;
export default paymentSlice.reducer;
