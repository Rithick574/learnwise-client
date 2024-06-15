import { FC } from 'react';

interface ChatMessageProps {
  isUser: boolean;
  avatar: string;
  name: string;
  time: string;
  message: string;
  status: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ isUser, avatar, name, time, message, status }) => {
  return (
    
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar w-8/12">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            className="rounded-lg"
            src={avatar}
          />
        </div>
      </div>
      <div className="chat-header w-[56px]">
        {name}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">{status}</div>
    </div>
  );
};

export default ChatMessage;
