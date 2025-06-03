import { useState, useRef, useEffect } from "react";
import { Bell, X, Check, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryHook, useUpdateMutation } from "../../services/reactQuery";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@mantine/core";

export default function NotificationDropdown() {
  const {
    data: response = {},
    isLoading: isLoadingNotification,
    error: notificationError,
  } = useQueryHook({
    queryKey: "Notifications",
    endpoint: `/api/notifications`,
    staleTime: 0 * 60 * 1000,
  });

  const notifications = response.data || [];
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Calculate unread notifications
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Format notification time
  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Just now";
    }
  };
  const [markAsReadBtnLoading, setMarkAsReadBtnLoading] = useState(null);
  // Mutation for marking a notification as read
  const { mutate: updateSeen } = useUpdateMutation(["Notifications"]);
  // `/api/notifications/${notificationId}/read`
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
          console.log(data, "Faild to update read status");
        },
      }
    );
  }

  // Mutation for marking all notifications as read
  const { mutate: updateAllSeen, isPending: isLoadingSeenAll } =
    useUpdateMutation(["Notifications"]);
  // `/api/notifications/${notificationId}/read`
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
          console.log(data, "Faild to update read status");
        },
      }
    );
  }

  return (
    <div className="relative   " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-200 cursor-pointer focus:bg-gray-200 transition-all duration-200 group"
      >
        <Bell
          size={24}
          className="transition-transform group-hover:scale-110"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute  right-0 h-[calc(100dvh-110px)] grid grid-rows-[auto_1fr_auto] mt-3 w-[370px] sm:w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 transition-all duration-200">
          {/* Header */}
          <div className="px-6 py-4 bg-black  text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Notifications</h3>
                <p className="text-gray-300 text-sm">
                  {unreadCount} unread notifications
                </p>
              </div>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={updateAllSeenFun}
                    loading={isLoadingSeenAll}
                    className="!text-sm !text-gray-300 !bg-black hover:!text-white hover:!bg-gray-800 !transition-all !duration-300 !flex !items-center"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-300 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-gray-800 !transition-all !duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingNotification && (
            <div className="px-6 py-4 text-center text-gray-500">
              Loading notifications...
            </div>
          )}

          {/* Error State */}
          {notificationError && (
            <div className="px-6 py-4 text-center text-red-500">
              Error loading notifications
            </div>
          )}

          {/* Notifications List */}
          {!isLoadingNotification &&
            !notificationError &&
            notifications.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">
                No notifications
              </div>
            )}

          {!isLoadingNotification &&
            !notificationError &&
            notifications.length > 0 && (
              <div className="  overflow-y-auto">
                {notifications.slice(0, 5).map((notif, index) => (
                  <div
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/notifications");
                    }}
                    key={notif._id}
                    className={`px-6 py-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                      notif.isRead ? "border-gray-200" : "border-black"
                    } hover:border-gray-400 transition-all duration-200 group ${
                      index !== notifications.slice(0, 5).length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`p-3 rounded-xl transition-all duration-200 ${
                            !notif.isRead ? "bg-black shadow-md" : "bg-gray-400"
                          }`}
                        >
                          <Bell className="h-4 w-4 text-white" />
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
                    </div>
                    {/* This will only visible on mobile screens only  */}
                    <div className="flex justify-end   mt-2">
                      {!notif.isRead ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSeenFun(notif._id);
                          }}
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
                          <CheckCheck className="h-3 w-3 mr-1" />
                          <span>Read</span>
                        </span>
                      )}
                    </div>
                    {/* This will only visible on mobile screens only  */}
                  </div>
                ))}
              </div>
            )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50  border-t border-gray-200">
            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/notifications");
              }}
              className="w-full py-2 px-4 bg-black rounded-xl text-sm font-medium cursor-pointer text-gray-100 hover:hover:bg-gray-800 hover:text-white hover:border-gray-300 transition-all duration-300"
            >
              View all notifications
              {/* ({notifications.length}) */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
