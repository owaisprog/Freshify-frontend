import { useState, useRef, useEffect } from "react";
import { Bell, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", time: "2m ago" },
    { id: 2, message: "Payment processed", time: "10m ago" },
    { id: 3, message: "New user registered", time: "1h ago" },
    { id: 4, message: "Server rebooted", time: "2h ago" },
    { id: 5, message: "Password changed", time: "3h ago" },
    { id: 6, message: "New login detected", time: "4h ago" },
    { id: 7, message: "New comment", time: "5h ago" },
  ]);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-200 cursor-pointer focus:bg-gray-200 transition-all duration-200 group"
      >
        <Bell
          size={24}
          className="transition-transform group-hover:scale-110"
        />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 transition-all duration-200">
          {/* Header */}
          <div className="px-6 py-4 bg-black text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Notifications</h3>
                <p className="text-gray-300 text-sm">
                  {notifications.length} unread notifications
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-sm text-gray-300 hover:text-white px-3 py-1 rounded-lg hover:bg-gray-800 flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </button>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Latest 5 notifications */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.slice(0, 5).map((notif, index) => (
              <div
                key={notif.id}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer border-l-4 border-black hover:border-gray-400 transition-all duration-200 group ${
                  index !== notifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-xl bg-black group-hover:bg-gray-700">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black">
                      {notif.message}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 bg-black rounded-full mr-2"></span>
                      {notif.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("organization-owner-notifications");
              }}
              className="w-full  py-2 px-4     bg-black  rounded-xl text-sm font-medium cursor-pointer text-gray-100 hover:bg-gray-300 hover:text-black hover:border-gray-300 transition-all duration-300"
            >
              View all notifications ({notifications.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
