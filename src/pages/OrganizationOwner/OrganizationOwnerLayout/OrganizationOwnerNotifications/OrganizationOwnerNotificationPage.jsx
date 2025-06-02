import {
  Bell,
  ArrowLeft,
  CheckCheck,
  Calendar,
  Star,
  DollarSign,
  MessageSquare,
  Scissors,
  Tag,
} from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      message: "New order received",
      time: "2m ago",
      type: "order",
      read: false,
    },
    {
      id: 2,
      message: "Payment processed",
      time: "10m ago",
      type: "payment",
      read: false,
    },
    {
      id: 3,
      message: "New user registered",
      time: "1h ago",
      type: "user",
      read: true,
    },
    {
      id: 4,
      message: "Server rebooted",
      time: "2h ago",
      type: "system",
      read: true,
    },
    {
      id: 5,
      message: "Password changed",
      time: "3h ago",
      type: "security",
      read: true,
    },
    {
      id: 6,
      message: "New login detected",
      time: "4h ago",
      type: "security",
      read: false,
    },
    {
      id: 7,
      message: "New comment",
      time: "5h ago",
      type: "message",
      read: true,
    },
  ];

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <Calendar className="h-4 w-4 text-white" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-white" />;
      case "user":
        return <Star className="h-4 w-4 text-white" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-white" />;
      case "security":
        return <Scissors className="h-4 w-4 text-white" />;
      case "system":
        return <Tag className="h-4 w-4 text-white" />;
      default:
        return <Bell className="h-4 w-4 text-white" />;
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b rounded-lg  border-gray-100">
        <div className=" flex items-center justify-between  lg:px-6 px-2 lg:bg-[#FFFFFF] py-[10px] rounded-[16px]">
          <div className="flex items-center justify-between  w-full h-16">
            <div className="flex items-center space-x-4 ">
              <div>
                <h1 className="text-2xl font-bold text-black">Notifications</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                    {notifications.length} Total Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                      {unreadCount} unread
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* {unreadCount > 0 && (
              <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 font-medium shadow-lg flex items-center space-x-2">
                <CheckCheck className="h-4 w-4" />
                <span>Mark all as read</span>
              </button>
            )} */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px]  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications List */}
        <div className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-200">
          {/* List Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-black">
              All Notifications
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Stay updated with your latest activities
            </p>
          </div>

          {/* Notifications */}
          <div className="divide-y divide-gray-100">
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div
                  key={notif.id}
                  className={`px-6 py-5 hover:bg-gray-50 transition-all duration-200 cursor-pointer group border-l-4 ${
                    !notif.read
                      ? "bg-gray-50 border-l-black hover:bg-gray-100"
                      : "border-l-transparent hover:border-l-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          !notif.read ? "bg-black shadow-md" : "bg-gray-400"
                        }`}
                      >
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base leading-6 ${!notif.read ? "font-semibold text-black" : "text-gray-600"}`}
                      >
                        {notif.message}
                      </p>
                      <div className="flex items-center mt-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${!notif.read ? "bg-black" : "bg-gray-300"}`}
                        ></span>
                        <p className="text-sm text-gray-500">{notif.time}</p>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="flex-shrink-0 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black text-white">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bell className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500">
                  You&apos;re all caught up! We&apos;ll notify you when
                  something happens.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Load More Button (if needed) */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-8 py-3 bg-black  rounded-xl text-sm font-medium cursor-pointer text-gray-100 hover:bg-gray-300 hover:text-black hover:border-gray-300 transition-all duration-300 ">
            <span>Load more </span>
          </button>
        </div>
      </main>
    </div>
  );
}
