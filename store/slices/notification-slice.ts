import { client, getErrorMessage } from "@/api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  subtitle: string;
  notification_type:
    | "prescription_ready"
    | "review_completed"
    | "night_routine"
    | "order_shipped";
  is_read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: AppNotification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

export const fetchNotifications = createAsyncThunk<
  AppNotification[],
  string,
  { rejectValue: string }
>("notification/fetchNotifications", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await client.get<{
      success?: boolean;
      notifications?: AppNotification[];
    }>("/api/notifications", { params: { user_id: userId } });

    if (data?.success && Array.isArray(data.notifications)) {
      return data.notifications;
    }
    return [];
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const markNotificationRead = createAsyncThunk<
  AppNotification,
  string,
  { rejectValue: string }
>("notification/markRead", async (notificationId, { rejectWithValue }) => {
  try {
    const { data } = await client.patch<{
      success?: boolean;
      notification?: AppNotification;
    }>(`/api/notifications/${notificationId}/read`);

    if (data?.success && data.notification) {
      return data.notification;
    }
    return rejectWithValue("Failed to mark notification as read");
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const markAllNotificationsRead = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("notification/markAllRead", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await client.patch<{ success?: boolean }>(
      "/api/notifications/read-all",
      null,
      { params: { user_id: userId } },
    );
    if (!data?.success) {
      return rejectWithValue("Failed to mark all as read");
    }
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const createNotification = createAsyncThunk<
  AppNotification,
  {
    user_id: string;
    title: string;
    subtitle: string;
    notification_type: AppNotification["notification_type"];
  },
  { rejectValue: string }
>("notification/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await client.post<{
      success?: boolean;
      notification?: AppNotification;
    }>("/api/notifications", payload);

    if (data?.success && data.notification) {
      return data.notification;
    }
    return rejectWithValue("Failed to create notification");
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.is_read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load notifications";
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const idx = state.notifications.findIndex(
          (n) => n.id === action.payload.id,
        );
        if (idx >= 0) {
          state.notifications[idx].is_read = true;
        }
        state.unreadCount = state.notifications.filter(
          (n) => !n.is_read,
        ).length;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.is_read = true));
        state.unreadCount = 0;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
        if (!action.payload.is_read) {
          state.unreadCount += 1;
        }
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;
export default notificationSlice.reducer;
