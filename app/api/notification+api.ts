export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Parse URL to check for error simulation
  const url = new URL(request.url);
  const simulateError = url.searchParams.get("error") === "true";

  // Simulate error state for testing
  if (simulateError) {
    return Response.json(
      { error: "Failed to fetch notifications", message: "Network error occurred" },
      { status: 500 }
    );
  }

  const notifications = [
    {
      id: "1",
      title: "Your Prescription is Ready",
      subtitle: "Download and consult a local pharmacy",
      timestamp: "2026-02-07T10:00:00Z",
      notificationType: "prescription_ready",
      isRead: false,
    },
    {
      id: "2",
      title: "Doctor review completed",
      subtitle: "Your treatment plan is approved",
      timestamp: "2026-02-07T08:15:00Z",
      notificationType: "review_completed",
      isRead: false,
    },
    {
      id: "3",
      title: "Time for your night routine",
      subtitle: "Consistency helps your skin heal faster",
      timestamp: "2026-02-06T15:30:00Z",
      notificationType: "night_routine",
      isRead: true,
    },
    {
      id: "4",
      title: "Your order has beed shipped",
      subtitle: "Track your delivery",
      timestamp: "2026-02-06T07:00:00Z",
      notificationType: "order_shipped",
      isRead: true,
    },
  ];

  return Response.json(notifications);
}
