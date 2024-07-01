import { FC, useState, useEffect } from "react";
import { FaRegCommentDots, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSocket } from "../../../contexts/SocketContext";
import axios from "axios";
import { URL } from "../../../Common/api";
import { RootState } from "@/redux/store";
import { BsCaretRightFill } from "react-icons/bs";

interface Notification {
  _id: string;
  type: string;
  action: string;
  details: string;
  content?: string;
  createdAt: string;
}

export const Notifications: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();

  useEffect(() => {
    fetchNotifications();
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to notification socket");
        socket.emit("joinNotifications", user._id);
      });

      socket.on("newNotification", (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user._id]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${URL}/chat/notification/${user._id}`);
      const data = response.data.data;
      console.log("🚀 ~ file: Notifications.tsx:45 ~ fetchNotifications ~ response:", response)
      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <FaRegCommentDots />;
      default:
        return <FaUserCircle />;
    }
  };

  return (
    <div className="p-5 w-full overflow-auto text-sm">
    <div className="flex justify-between items-center font-semibold pb-5">
      <div>
        <h1 className="font-bold mt-4 text-2xl">Notifications</h1>
        <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
          <p className="text-green-500 font-semibold">Learnwise</p>
          <span>
            <BsCaretRightFill />
          </span>
          <p className="font-semibold">Notifications</p>
        </div>
      </div>
    </div>
    <div className="flex">
      <div className="shadow-md sm:rounded-lg flex flex-col border w-full">
        <div className="p-4">
          {notifications &&
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-start p-4 mb-4 rounded-lg shadow bg-gray-900" 
              >
                <div className="mr-4 text-2xl">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">LearnWise</span>
                    <span className="text-sm text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{notification.action}</p>
                  <p className="text-gray-600">{notification.details}</p>
                  {notification.content && (
                    <p className="text-green-500 mt-2 text-base">
                      {notification.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};
