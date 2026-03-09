import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  subtotalCents: number;
  shipmentCents: number;
  insuranceCents: number;
}

const initialState: OrderState = {
  subtotalCents: 25000, // $250.00
  shipmentCents: 20000, // $200.00
  insuranceCents: 5000, // $50.00
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderSummary: (
      state,
      action: PayloadAction<Partial<OrderState>>
    ) => {
      if (action.payload.subtotalCents != null)
        state.subtotalCents = action.payload.subtotalCents;
      if (action.payload.shipmentCents != null)
        state.shipmentCents = action.payload.shipmentCents;
      if (action.payload.insuranceCents != null)
        state.insuranceCents = action.payload.insuranceCents;
    },
  },
});

export const { setOrderSummary } = orderSlice.actions;
export default orderSlice.reducer;
