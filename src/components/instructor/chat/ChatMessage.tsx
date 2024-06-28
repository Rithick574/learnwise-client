import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '@/contexts/SocketContext';
import { RootState } from '@/redux/store';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  contentType: string;
  time: string;
  seen: number;
}

interface Chat {
  chatId: string;
  receiverId: string;
  profileImageUrl: string;
  name: string;
}

interface ChatMessageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedChat: Chat;
}

const ChatMessage: FC<ChatMessageProps> = ({ messages, setMessages, selectedChat }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const [isSocketReady, setIsSocketReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (socket) {
      setIsSocketReady(true);
    } else {
      console.warn('Socket is not ready or does not have expected methods');
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketReady && socket) {
      const handleNewMessage = (message: any) => {
        if (message.obj.chatId === selectedChat.chatId) {
          setMessages((prevMessages) => [...prevMessages, message.obj]);
          scrollToBottom();
        }
      };

      socket.on('newMessage', handleNewMessage);
      return () => {
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [isSocketReady, selectedChat, setMessages, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReadReceipt = (messageId: string) => {
    // Logic to update the read receipt in the backend
  };

  useEffect(() => {
    messages.forEach((message) => {
      if (!message.seen && message.senderId !== user._id) {
        handleReadReceipt(message.id);
      }
    });
  }, [messages]);

  const renderContent = (message: Message) => {
    switch (message.contentType) {
      case 'image':
        return <img src={message.content} alt="Sent image" className="w-48 rounded-lg" />;
      case 'video':
        return (
          <video src={message.content} controls className="w-48 object-cover rounded-lg">
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <audio src={message.content} controls className="">
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return <div>{message.content}</div>;
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat ${message.senderId === user._id ? 'chat-end' : 'chat-start'} mb-4`}
        >
          <div className={`chat-bubble ${message.senderId === user._id ? 'bg-black text-white' : 'bg-gray-700 text-white'}`}>
            <div className="font-bold">{message.senderId === user._id ? 'You' : message.sender}</div>
            {renderContent(message)}
            <div className="text-xs text-gray-300 flex justify-between mt-2">
              <span>{message.time}</span>
              <span>{message.seen ? '✔️✔️' : '✔️'}</span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;
