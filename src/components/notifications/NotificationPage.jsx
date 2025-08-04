import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Calendar,
  Scissors,
  XCircle,
  Check,
} from "lucide-react";
import { useQueryHook, useUpdateMutation } from "../../services/reactQuery";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@mantine/core";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);

  const { mutate: updateSeen } = useUpdateMutation(["Notifications"]);

  const {
    data: response = { data: [], pagination: { page: 1, total: 0, pages: 1 } },
    isLoading: isLoadingNotification,
    error: notificationError,
  } = useQueryHook({
    queryKey: ["Notifications", page],
    endpoint: `/api/notifications?page=${page}`,
    staleTime: 0 * 60 * 1000,
  });

  const notifications = response.data || [];
  const pagination = response.pagination || { page: 1, total: 0, pages: 1 };
  const [markAsReadBtnLoading, setMarkAsReadBtnLoading] = useState(null);

  // Mutation for marking a notification as read
  function updateSeenFun(notificationId) {
    setMarkAsReadBtnLoading(notificationId);
    updateSeen(
      {
        endpoint: `/api/notifications/${notificationId}/read`,
      },
      {
        onSuccess: (data) => {
          setMarkAsReadBtnLoading(null);
          console.log(data, "Read Status updated successfully");
        },
        onError: (data) => {
          setMarkAsReadBtnLoading(null);
          console.log(data, "Failed to update read status");
        },
      }
    );
  }

  // Mutation for marking all notifications as read
  const { mutate: updateAllSeen, isPending: isLoadingSeenAll } =
    useUpdateMutation(["Notifications"]);

  function updateAllSeenFun() {
    updateAllSeen(
      {
        endpoint: `/api/notification/read-all`,
      },
      {
        onSuccess: (data) => {
          console.log(data, "Read Status updated successfully");
        },
        onError: (data) => {
          console.log(data, "Failed to update read status");
        },
      }
    );
  }

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking_created":
        return <Calendar className="h-4 w-4 text-white" />;
      case "booking_rescheduled":
        return <Scissors className="h-4 w-4 text-white" />;
      case "booking_cancelled":
        return <XCircle className="h-4 w-4 text-white" />;
      default:
        return <Bell className="h-4 w-4 text-white" />;
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Format notification time
  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  // Handle pagination change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPage(newPage);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.pages;
    const currentPage = pagination.page;

    // Always show first page
    pages.push(1);

    // Show ellipsis if needed before current page
    if (currentPage > 3) {
      pages.push("...");
    }

    // Show current page and adjacent pages
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show ellipsis if needed after current page
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page if different from first
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="lg:gap-6 p-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b rounded-lg border-gray-100">
        <div className="flex items-center justify-between lg:px-6 px-2 lg:bg-[#FFFFFF] py-[10px] rounded-[16px]">
          <div className="flex items-center justify-between w-full h-16">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-black">Notifications</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                    {pagination.total} Total Notifications
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
            {unreadCount > 0 && (
              <Button
                onClick={updateAllSeenFun}
                loading={isLoadingSeenAll}
                loaderProps={{ type: "bars" }}
                radius={"md"}
                className="!text-sm !text-gray-300 !bg-black hover:!text-white hover:!bg-gray-800 !transition-all !duration-300 !flex !items-center"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Loading State */}
          {isLoadingNotification && (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Loading notifications...
              </h3>
            </div>
          )}

          {/* Error State */}
          {notificationError && (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Error loading notifications
              </h3>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          )}

          {/* Notifications */}
          {!isLoadingNotification &&
          !notificationError &&
          notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`px-6 py-5 hover:bg-gray-50 transition-all duration-200 cursor-pointer group border-l-4 ${
                    !notif.isRead
                      ? "bg-gray-50 border-l-black hover:bg-gray-100"
                      : "border-l-transparent hover:border-l-gray-300"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          !notif.isRead ? "bg-black shadow-md" : "bg-gray-400"
                        }`}
                      >
                        {getNotificationIcon(notif.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base leading-6 ${
                          !notif.isRead
                            ? "font-semibold text-black"
                            : "text-gray-600"
                        }`}
                      >
                        {notif.title}
                      </p>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                      <div className="flex items-center mt-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            !notif.isRead ? "bg-black" : "bg-gray-300"
                          }`}
                        ></span>
                        <p className="text-sm text-gray-500">
                          {formatTime(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 hidden md:block mt-2">
                      {!notif.isRead ? (
                        <Button
                          onClick={() => updateSeenFun(notif._id)}
                          disabled={markAsReadBtnLoading === notif._id}
                          loading={markAsReadBtnLoading === notif._id}
                          bg={"dark"}
                          radius={"md"}
                          loaderProps={{ type: "bars" }}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          <span>Mark as Read</span>
                        </Button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-600">
                          <CheckCheck className="h-3 w-3 mr-1 " />
                          <span>Read</span>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* This will only visible on mobile screens only  */}
                  <div className="flex justify-end   md:hidden mt-2">
                    {!notif.isRead ? (
                      <Button
                        onClick={() => updateSeenFun(notif._id)}
                        disabled={markAsReadBtnLoading === notif._id}
                        loading={markAsReadBtnLoading === notif._id}
                        bg={"dark"}
                        radius={"md"}
                        size="xs"
                        loaderProps={{ type: "bars" }}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        <span>Mark as Read</span>
                      </Button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-600">
                        <Check className="h-3 w-3 mr-1" />
                        <span>Read</span>
                      </span>
                    )}
                  </div>
                  {/* This will only visible on mobile screens only  */}
                </div>
              ))}
            </div>
          ) : !isLoadingNotification && !notificationError ? (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                No notifications
              </h3>
              <p className="text-gray-500">
                You&apos;re all caught up! We&apos;ll notify you when something
                happens.
              </p>
            </div>
          ) : null}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 &&
          !isLoadingNotification &&
          !notificationError && (
            <div className="mt-8 flex items-center justify-center space-x-2">
              <Button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || isLoadingNotification}
                radius="md"
                className="!text-sm !text-gray-300 !bg-black hover:!text-white hover:!bg-gray-800 !transition-all !duration-300"
              >
                Previous
              </Button>

              {getPageNumbers().map((pageNum, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    typeof pageNum === "number" && handlePageChange(pageNum)
                  }
                  disabled={pageNum === "..." || isLoadingNotification}
                  radius="md"
                  className={`!text-sm !transition-all !duration-300 ${
                    pagination.page === pageNum
                      ? "!bg-black !text-white"
                      : "!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
                  }`}
                >
                  {pageNum}
                </Button>
              ))}

              <Button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={
                  pagination.page >= pagination.pages || isLoadingNotification
                }
                radius="md"
                className="!text-sm !text-gray-300 !bg-black hover:!text-white hover:!bg-gray-800 !transition-all !duration-300"
              >
                Next
              </Button>
            </div>
          )}
      </main>
    </div>
  );
}
