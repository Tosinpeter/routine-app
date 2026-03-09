import orderReducer, { setOrderSummary } from "../order-slice";

describe("order slice", () => {
  const initialState = {
    subtotalCents: 25000,
    shipmentCents: 20000,
    insuranceCents: 5000,
  };

  it("has correct initial state", () => {
    expect(orderReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("setOrderSummary updates subtotalCents when provided", () => {
    const state = orderReducer(
      initialState,
      setOrderSummary({ subtotalCents: 30000 })
    );
    expect(state.subtotalCents).toBe(30000);
    expect(state.shipmentCents).toBe(20000);
    expect(state.insuranceCents).toBe(5000);
  });

  it("setOrderSummary updates shipmentCents when provided", () => {
    const state = orderReducer(
      initialState,
      setOrderSummary({ shipmentCents: 15000 })
    );
    expect(state.subtotalCents).toBe(25000);
    expect(state.shipmentCents).toBe(15000);
    expect(state.insuranceCents).toBe(5000);
  });

  it("setOrderSummary updates insuranceCents when provided", () => {
    const state = orderReducer(
      initialState,
      setOrderSummary({ insuranceCents: 0 })
    );
    expect(state.insuranceCents).toBe(0);
  });

  it("setOrderSummary updates all fields when all provided", () => {
    const state = orderReducer(
      initialState,
      setOrderSummary({
        subtotalCents: 10000,
        shipmentCents: 5000,
        insuranceCents: 2000,
      })
    );
    expect(state.subtotalCents).toBe(10000);
    expect(state.shipmentCents).toBe(5000);
    expect(state.insuranceCents).toBe(2000);
  });

  it("setOrderSummary leaves other fields unchanged when partial payload", () => {
    const state = orderReducer(
      initialState,
      setOrderSummary({ subtotalCents: 999 })
    );
    expect(state.shipmentCents).toBe(initialState.shipmentCents);
    expect(state.insuranceCents).toBe(initialState.insuranceCents);
  });
});
