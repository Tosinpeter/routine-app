export const requestPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: "granted" })
);

export const scheduleNotificationAsync = jest.fn(() =>
  Promise.resolve("notification-id")
);

export const cancelAllScheduledNotificationsAsync = jest.fn(() =>
  Promise.resolve()
);

export const setNotificationHandler = jest.fn();

export const getPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: "undetermined" })
);

export const setNotificationChannelAsync = jest.fn(() => Promise.resolve());
