import {
  formatDateTime,
  getTimeAgo,
  groupNotificationsByDate,
} from "../date-helpers";

jest.mock("@/i18n", () => ({
  t: (key: string, options?: Record<string, unknown>) =>
    options?.count != null ? `${key}:${options.count}` : key,
}));

describe("formatDateTime", () => {
  it("formats timestamp with month, day, year and time", () => {
    // Use 09:30 UTC so local hour is AM in most timezones
    const result = formatDateTime("2025-03-09T09:30:00.000Z");
    expect(result).toContain("9");
    expect(result).toContain("2025");
    expect(result).toMatch(/\d{1,2}:\d{2}/);
    expect(result).toMatch(/notification\.time\.(am|pm)/);
  });

  it("uses pm for afternoon", () => {
    const result = formatDateTime("2025-03-09T20:30:00.000Z");
    expect(result).toContain("notification.time.pm");
  });
});

describe("getTimeAgo", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns justNow for same minute", () => {
    jest.setSystemTime(new Date("2025-03-09T12:00:00.000Z"));
    const result = getTimeAgo("2025-03-09T11:59:30.000Z");
    expect(result).toBe("notification.time.justNow");
  });

  it("returns minuteAgo for 1 minute ago", () => {
    jest.setSystemTime(new Date("2025-03-09T12:01:00.000Z"));
    const result = getTimeAgo("2025-03-09T12:00:00.000Z");
    expect(result).toBe("notification.time.minuteAgo");
  });

  it("returns minutesAgo with count for multiple minutes", () => {
    jest.setSystemTime(new Date("2025-03-09T12:15:00.000Z"));
    const result = getTimeAgo("2025-03-09T12:10:00.000Z");
    expect(result).toBe("notification.time.minutesAgo:5");
  });

  it("returns hourAgo for 1 hour ago", () => {
    jest.setSystemTime(new Date("2025-03-09T13:00:00.000Z"));
    const result = getTimeAgo("2025-03-09T12:00:00.000Z");
    expect(result).toBe("notification.time.hourAgo");
  });

  it("returns hoursAgo with count for multiple hours", () => {
    jest.setSystemTime(new Date("2025-03-09T15:00:00.000Z"));
    const result = getTimeAgo("2025-03-09T12:00:00.000Z");
    expect(result).toBe("notification.time.hoursAgo:3");
  });

  it("returns full formatDateTime for different day", () => {
    jest.setSystemTime(new Date("2025-03-09T12:00:00.000Z"));
    const result = getTimeAgo("2025-03-08T10:00:00.000Z");
    expect(result).toContain("8");
    expect(result).toContain("2025");
  });
});

describe("groupNotificationsByDate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const baseNotification = {
    id: "n1",
    user_id: "u1",
    title: "Test",
    subtitle: "",
    notification_type: "order_shipped" as const,
    is_read: false,
  };

  it("groups notification from today under today label", () => {
    const now = new Date("2025-03-09T12:00:00.000Z");
    jest.setSystemTime(now);
    const notifications = [
      {
        ...baseNotification,
        createdAt: "2025-03-09T10:00:00.000Z",
      },
    ];
    const groups = groupNotificationsByDate(notifications);
    expect(groups["notification.groups.today"]).toHaveLength(1);
    expect(groups["notification.groups.today"][0].id).toBe("n1");
  });

  it("groups notification from yesterday under yesterday label", () => {
    jest.setSystemTime(new Date("2025-03-09T12:00:00.000Z"));
    const notifications = [
      {
        ...baseNotification,
        id: "n2",
        createdAt: "2025-03-08T10:00:00.000Z",
      },
    ];
    const groups = groupNotificationsByDate(notifications);
    expect(groups["notification.groups.yesterday"]).toHaveLength(1);
    expect(groups["notification.groups.yesterday"][0].id).toBe("n2");
  });

  it("groups notification from this week under thisWeek label", () => {
    jest.setSystemTime(new Date("2025-03-09T12:00:00.000Z"));
    const notifications = [
      {
        ...baseNotification,
        id: "n3",
        createdAt: "2025-03-05T10:00:00.000Z",
      },
    ];
    const groups = groupNotificationsByDate(notifications);
    expect(groups["notification.groups.thisWeek"]).toHaveLength(1);
    expect(groups["notification.groups.thisWeek"][0].id).toBe("n3");
  });

  it("removes empty groups", () => {
    jest.setSystemTime(new Date("2025-03-09T12:00:00.000Z"));
    const groups = groupNotificationsByDate([]);
    expect(groups["notification.groups.today"]).toBeUndefined();
    expect(groups["notification.groups.yesterday"]).toBeUndefined();
    expect(groups["notification.groups.thisWeek"]).toBeUndefined();
  });
});
