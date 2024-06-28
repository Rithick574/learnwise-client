import { URL } from "@/Common/api";
import ChatHeader from "@/components/instructor/chat/ChatHeader";
import ChatMessage from "@/components/instructor/chat/ChatMessage";
import MessageInput from "@/components/instructor/chat/MessageInput";
import Sidebar from "@/components/instructor/chat/Sidebar";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface Chat {
  chatId: string;
  receiverId: string;
  profileImageUrl: string;
  name: string;
}

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  contentType: string;
  time: string;
  seen: number;
}

const InstructorChat: FC = () => {
  const [selectedChat, setSelectedChat] = useState<{ chat: Chat } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleUserSelect = async (chat: Chat) => {
    setSelectedChat({ chat });
    await fetchMessages(chat.chatId);
  };

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const res = await axios.get(`${URL}/chat/${chatId}`);
      const fetchedMessages = res.data.data.messages.map((message: any) => ({
        id: message._id,
        sender: message.sender.userName,
        senderId: message.sender._id,
        content: message.content,
        contentType: message.contentType || "text",
        time: new Date(message.createdAt).toLocaleTimeString(),
        seen: message.receiverSeen ? 1 : 0,
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Can't fetch messages. Please try again later.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex">
        <Sidebar onUserSelect={handleUserSelect} />
        <div className="p-5 w-full overflow-auto text-sm">
          <div className="overflow-auto h-96">
            {selectedChat ? (
              <>
                <ChatHeader user={selectedChat.chat} />
                <ChatMessage
                  selectedChat={selectedChat.chat}
                  setMessages={setMessages}
                  messages={messages}
                />
                <MessageInput
                  chatId={selectedChat.chat.chatId}
                  recieversId={selectedChat.chat.receiverId}
                  onMessageSent={handleNewMessage}
                />
              </>
            ) : (
              <h1>Select a chat to start messaging</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorChat;
