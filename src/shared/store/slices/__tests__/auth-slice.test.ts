import authReducer, {
  setPhoneNumber,
  setCountry,
  setShowCountryPicker,
  setAuthLoading,
  setOtp,
  setOtpResendTimer,
  decrementOtpResendTimer,
  startOtpResendTimer,
  resetOtpState,
  resetAuthState,
} from "../auth-slice";

describe("auth slice", () => {
  const initialState = {
    phoneNumber: "",
    countryCode: "+1",
    countryFlag: "🇺🇸",
    showCountryPicker: false,
    isLoading: false,
    otp: "",
    otpResendTimer: 30,
  };

  it("has correct initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("setPhoneNumber updates phoneNumber", () => {
    const state = authReducer(initialState, setPhoneNumber("5551234567"));
    expect(state.phoneNumber).toBe("5551234567");
  });

  it("setCountry updates countryCode and countryFlag", () => {
    const state = authReducer(
      initialState,
      setCountry({ code: "+44", flag: "🇬🇧" })
    );
    expect(state.countryCode).toBe("+44");
    expect(state.countryFlag).toBe("🇬🇧");
  });

  it("setShowCountryPicker updates showCountryPicker", () => {
    const state = authReducer(initialState, setShowCountryPicker(true));
    expect(state.showCountryPicker).toBe(true);
  });

  it("setAuthLoading updates isLoading", () => {
    const state = authReducer(initialState, setAuthLoading(true));
    expect(state.isLoading).toBe(true);
  });

  it("setOtp updates otp", () => {
    const state = authReducer(initialState, setOtp("123456"));
    expect(state.otp).toBe("123456");
  });

  it("setOtpResendTimer updates otpResendTimer", () => {
    const state = authReducer(initialState, setOtpResendTimer(10));
    expect(state.otpResendTimer).toBe(10);
  });

  it("decrementOtpResendTimer decrements and floors at 0", () => {
    let state = authReducer(initialState, setOtpResendTimer(5));
    state = authReducer(state, decrementOtpResendTimer());
    expect(state.otpResendTimer).toBe(4);
    state = authReducer(state, decrementOtpResendTimer());
    state = authReducer(state, decrementOtpResendTimer());
    state = authReducer(state, decrementOtpResendTimer());
    state = authReducer(state, decrementOtpResendTimer());
    expect(state.otpResendTimer).toBe(0);
    state = authReducer(state, decrementOtpResendTimer());
    expect(state.otpResendTimer).toBe(0);
  });

  it("startOtpResendTimer sets otpResendTimer to 15", () => {
    const state = authReducer(initialState, startOtpResendTimer());
    expect(state.otpResendTimer).toBe(15);
  });

  it("resetOtpState clears otp and resets timer to 30", () => {
    let state = authReducer(initialState, setOtp("123456"));
    state = authReducer(state, setOtpResendTimer(5));
    state = authReducer(state, resetOtpState());
    expect(state.otp).toBe("");
    expect(state.otpResendTimer).toBe(30);
  });

  it("resetAuthState restores full initial state", () => {
    let state = authReducer(initialState, setPhoneNumber("555"));
    state = authReducer(state, setOtp("123"));
    state = authReducer(state, setAuthLoading(true));
    state = authReducer(state, resetAuthState());
    expect(state).toEqual(initialState);
  });
});
