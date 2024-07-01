import { FC, useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useNavigate } from 'react-router-dom';
import { BsFillCameraVideoFill } from 'react-icons/bs';

interface Chat {
  receiverId: string;
  chatId: string;
  profileImageUrl: string;
  name: string;
}

interface ChatHeaderProps {
  user: Chat;
}

interface TypingEvent {
  sender: string;
  roomId: string;
}

interface LastSeenEvent {
  userId: string;
  lastSeenTime: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ user }) => {
  const socket = useSocket();
  const navigate=useNavigate()
  const [typingStatus, setTypingStatus] = useState<boolean | null>(null);
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [isCalling, _setIsCalling] = useState<boolean>(false); 

  useEffect(() => {
    if (socket && user) {
      const handleTyping = ({ sender, roomId }: TypingEvent) => {
        if (sender === user.receiverId && roomId === user.chatId) {
          setTypingStatus(true);
        }
      };

      const handleStopTyping = ({ sender, roomId }: TypingEvent) => {
        if (sender === user.receiverId && roomId === user.chatId) {
          setTypingStatus(false);
        }
      };

      const handleUserOnline = (onlineUsers: string[]) => {
        console.log("🚀 ~ file: ChatHeader.tsx:50 ~ handleUserOnline ~ onlineUsers:", onlineUsers)
        setOnlineStatus(onlineUsers.includes(user.receiverId));
      };

      const handleLastSeen = ({ userId, lastSeenTime }: LastSeenEvent) => {
        if (userId === user.receiverId) {
          setLastSeen(lastSeenTime);
        }
      };

      socket.on('typing', handleTyping);
      socket.on('stopTyping', handleStopTyping);
      socket.on('getOnlineUsers', handleUserOnline);
      socket.on('userLastSeen', handleLastSeen);

      return () => {
        socket.off('typing', handleTyping);
        socket.off('stopTyping', handleStopTyping);
        socket.off('getOnlineUsers', handleUserOnline);
        socket.off('userLastSeen', handleLastSeen);
      };
    }
  }, [socket, user]);

  const startCall = () => {
    navigate(`/call?id=${user.receiverId}&senderId=${user.receiverId}`)
  };

  const renderStatus = () => {
    if (typingStatus) {
      return 'Typing...';
    } else if (onlineStatus) {
      return 'Online';
    } else if (lastSeen) {
      return `Last seen at ${new Date(lastSeen).toLocaleTimeString()}`;
    } else {
      return 'Offline';
    }
  };

  return (
    <div className="border  rounded-lg p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="text-sm text-gray-600">{renderStatus()}</div>
        </div>
      </div>
      <div className="flex space-x-2">
      {!isCalling ? (
          <button className="btn btn-circle btn-outline" onClick={startCall}>
            <BsFillCameraVideoFill />
          </button>
        ) : (
          <span className="text-gray-600">Calling...</span>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
