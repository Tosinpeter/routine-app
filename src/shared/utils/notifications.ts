import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleNightRoutineReminder() {
  await Notifications.cancelScheduledNotificationAsync("night-routine").catch(() => {});

  await Notifications.scheduleNotificationAsync({
    identifier: "night-routine",
    content: {
      title: "Time for your night routine",
      body: "Consistency helps your skin heal faster",
      sound: true,
      data: { type: "night_routine" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 21,
      minute: 0,
    },
  });
}

export async function scheduleMorningRoutineReminder() {
  await Notifications.cancelScheduledNotificationAsync("morning-routine").catch(() => {});

  await Notifications.scheduleNotificationAsync({
    identifier: "morning-routine",
    content: {
      title: "Good morning! Start your routine",
      body: "Your morning skincare routine is waiting",
      sound: true,
      data: { type: "prescription_ready" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 8,
      minute: 0,
    },
  });
}

export async function sendLocalNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      data: data ?? {},
    },
    trigger: null,
  });
}

export async function setupScheduledNotifications() {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#CF604A",
      sound: "default",
    });
  }

  await scheduleMorningRoutineReminder();
  await scheduleNightRoutineReminder();
}
