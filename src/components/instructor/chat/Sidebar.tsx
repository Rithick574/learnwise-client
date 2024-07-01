import { RootState } from "@/redux/store";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "@/contexts/SocketContext";
import axios from "axios";
import { URL } from "@/Common/api";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

interface SidebarProps {
  onUserSelect: (chat: any) => void;
}

const Sidebar: FC<SidebarProps> = ({ onUserSelect }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const socket = useSocket() as Socket | null;

  const fetchChatList = async () => {
    if (user) {
      try {
        const res = await axios.get(`${URL}/chat/chats/${user._id}`);
        if (res) {
          setIsLoading(false);
        }
        const fetchedChats = res.data.data.map((chat: any) => {
          const participant = chat.participants.find(
            (p: any) => p._id !== user._id
          );
          const participantLastSeen = chat.lastSeen.find(
            (ls:any) => ls.participant.toString() === participant._id
          );

        const options: Intl.DateTimeFormatOptions = {
          hour: '2-digit',
          minute: '2-digit',
        };
          return {
            name: participant.firstName,
            chatId: chat._id,
            time: new Date(chat.createdAt).toLocaleTimeString([],options),
            seen: chat.messages.length,
            lastMessage:
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].content
                : "No messages yet",
            profileImageUrl:
              participant?.profile?.avatar || "../ui/empty-profile.webp",
            receiverId: participant._id,
            senderId:user._id,
            lastSeen: participantLastSeen ? new Date(participantLastSeen.seenAt).toLocaleTimeString([],options) : 'Never'
          };
        });

        setChats(fetchedChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching chatters list:", error);
        toast.error("Can't fetch chat list. Please try again later.");
        setIsLoading(false);
      }
    } else {
      toast.error("Can't get logged user. Please re-login.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Socket changed:", socket);

    if (socket && typeof socket.connected === "boolean") {
      setIsConnected(socket.connected);
      socket.on("connect", () => setIsConnected(true));
      socket.on("disconnect", () => setIsConnected(false));
      socket.on("getOnlineUsers", (users: any[]) => setOnlineUsers(users));
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("getOnlineUsers");
      }
    };
  }, [socket]);

  useEffect(() => {
    fetchChatList();

    if (isConnected && socket && typeof socket.on === "function") {
      socket.on("new message", ({ chatId, message }: any) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.chatId === chatId
              ? {
                  ...chat,
                  lastMessage: message.content,
                  time: message.time,
                  seen: chat.seen + 1,
                }
              : chat
          )
        );
      });
    }

    return () => {
      if (isConnected && socket && typeof socket.off === "function") {
        socket.off("new message");
      }
    };
  }, [socket, isConnected]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-4/12 p-4 h-full">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full mb-4 bg-gray-800 rounded-lg p-2"
        />
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-5 border border-gray-200 shadow-sm mb-2 rounded-lg cursor-pointer"
            onClick={() => onUserSelect(chat)}
          >
            <img
              src={chat.profileImageUrl}
              alt={chat.name}
              className="w-10 h-10 rounded-full mr-4 object-cover"
            />
            <div className="flex-1">
              <div className="font-bold">{chat.name}</div>
              <div className="text-sm text-gray-600">{chat.lastMessage}</div>
              {/* <div className="text-xs text-gray-500">{chat.time}</div> */}
            </div>
            <div>
              {onlineUsers.includes(chat.receiverId) ? (
                <span className="text-green-500">Online</span>
              ) : (
               <div className="flex flex-col">
                 <span className="text-gray-500">Last seen </span>
                 <span>{chat.lastSeen}</span>
               </div>
              )}
            </div>
            {/* {chat.seen > 0 && (
              <div className="ml-2 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {chat.seen}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
