import ChatHeader from "@/components/instructor/chat/ChatHeader";
import ChatMessage from "@/components/instructor/chat/ChatMessage";
import MessageInput from "@/components/instructor/chat/MessageInput";
import Sidebar from "@/components/instructor/chat/Sidebar";
import { FC } from "react";

const InstructorChat: FC = () => {
  return (
    <div className="w-full">
      <div className="flex w-full">
        <ChatHeader />
      </div>

      <div className="w-full flex">
        <Sidebar />
        <div className="p-5 w-full overflow-auto text-sm">
          <div className="overflow-auto h-96">
            <div>
              <ChatMessage
                isUser={false}
                avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                name="Kenobi"
                time="12:45"
                message="You were the Chosen One!"
                status="Delivered"
              />
            </div>
            <div>
              <ChatMessage
                isUser={true}
                avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                name="Anakin"
                time="12:46"
                message="I hate you!"
                status="Seen at 12:46"
              />
            </div>
          </div>
          <div className="mt-45">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorChat;
