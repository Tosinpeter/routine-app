import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { client, getErrorMessage } from "@/shared/api/client";

const AUTH_STORAGE_KEY = "@routine_app:auth";
const PROFILE_STORAGE_KEY = "@routine_app:profile";

export interface SessionProfile {
  id: string;
  phone_number: string | null;
  fullname: string | null;
  age: string | null;
  gender: string | null;
  skin_type: string | null;
  skin_sensitivity: string | null;
  skin_concerns: string[] | null;
  health_conditions: string | null;
}

interface SessionState {
  token: string | null;
  profile: SessionProfile | null;
  isLoading: boolean;
}

const initialState: SessionState = {
  token: null,
  profile: null,
  isLoading: true,
};

export const loadSession = createAsyncThunk(
  "session/load",
  async (_, { rejectWithValue }) => {
    try {
      const [storedToken, storedProfile] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(PROFILE_STORAGE_KEY),
      ]);
      const profile = storedProfile
        ? (JSON.parse(storedProfile) as SessionProfile)
        : null;
      return { token: storedToken ?? null, profile };
    } catch (err) {
      console.error("Error loading session:", err);
      return rejectWithValue(undefined);
    }
  }
);

export const setSession = createAsyncThunk(
  "session/set",
  async (
    { token, profile }: { token: string; profile: SessionProfile },
    { rejectWithValue }
  ) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          id: profile.id,
          phone_number: profile.phone_number,
          fullname: profile.fullname,
          age: profile.age,
          gender: profile.gender,
          skin_type: profile.skin_type,
          skin_sensitivity: profile.skin_sensitivity,
          skin_concerns: profile.skin_concerns,
          health_conditions: profile.health_conditions,
        })
      );
      return { token, profile };
    } catch (err) {
      console.error("Error persisting session:", err);
      return rejectWithValue(undefined);
    }
  }
);

export const updateSessionProfile = createAsyncThunk(
  "session/updateProfile",
  async (profile: SessionProfile, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          id: profile.id,
          phone_number: profile.phone_number,
          fullname: profile.fullname,
          age: profile.age,
          gender: profile.gender,
          skin_type: profile.skin_type,
          skin_sensitivity: profile.skin_sensitivity,
          skin_concerns: profile.skin_concerns,
          health_conditions: profile.health_conditions,
        })
      );
      return profile;
    } catch (err) {
      console.error("Error persisting profile:", err);
      return rejectWithValue(undefined);
    }
  }
);

export const logoutSession = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, PROFILE_STORAGE_KEY]);
    } catch (err) {
      console.error("Error clearing session:", err);
      return rejectWithValue(undefined);
    }
  }
);

/** Build SessionProfile from API verify-otp response data */
function sessionProfileFromPayload(payload: Record<string, unknown>): SessionProfile {
  return {
    id: String(payload.id ?? ""),
    phone_number: typeof payload.phone_number === "string" ? payload.phone_number : null,
    fullname: typeof payload.fullname === "string" ? payload.fullname : null,
    age: payload.age != null ? String(payload.age) : null,
    gender: typeof payload.gender === "string" ? payload.gender : null,
    skin_type: typeof payload.skin_type === "string" ? payload.skin_type : null,
    skin_sensitivity: typeof payload.skin_sensitivity === "string" ? payload.skin_sensitivity : null,
    skin_concerns: Array.isArray(payload.skin_concerns) ? payload.skin_concerns as string[] : null,
    health_conditions: typeof payload.health_conditions === "string" ? payload.health_conditions : null,
  };
}

export interface RequestOtpResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const requestOtp = createAsyncThunk(
  "session/requestOtp",
  async (phone_number: string): Promise<RequestOtpResult> => {
    try {
      const { data } = await client.post<{ success?: boolean; error?: string; message?: string }>(
        "/api/auth/request-otp",
        { phone_number }
      );
      if (data.success === false) {
        return { success: false, error: data.error ?? "Request failed" };
      }
      return { success: data.success ?? true, message: data.message };
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    }
  }
);

export interface VerifyOtpResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export const verifyOtp = createAsyncThunk(
  "session/verifyOtp",
  async (
    { phone_number, code }: { phone_number: string; code: string },
    { dispatch }
  ): Promise<VerifyOtpResult> => {
    try {
      const { data } = await client.post<Record<string, unknown>>("/api/auth/verify-otp", {
        phone_number,
        code,
      });
      if (
        data?.success === true &&
        typeof data?.token === "string" &&
        data?.data &&
        typeof data.data === "object"
      ) {
        const payload = data.data as Record<string, unknown>;
        const profile = sessionProfileFromPayload(payload);
        await dispatch(setSession({ token: data.token, profile })).unwrap();
        return { success: true, data: payload };
      }
      return { success: false, data: data as Record<string, unknown> };
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<SessionProfile | null>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.isLoading = false;
      })
      .addCase(loadSession.rejected, (state) => {
        state.token = null;
        state.profile = null;
        state.isLoading = false;
      })
      .addCase(setSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.profile = action.payload.profile;
      })
      .addCase(updateSessionProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(logoutSession.fulfilled, () => initialState);
  },
});

export const { setProfile } = sessionSlice.actions;
export default sessionSlice.reducer;

export const selectIsAuthenticated = (state: { session: { token: string | null } }) =>
  !!state.session.token;
