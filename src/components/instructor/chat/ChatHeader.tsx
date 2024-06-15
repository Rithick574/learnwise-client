import { FC } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';

const ChatHeader: FC = () => {
  return (
    <div className="flex justify-between  font-semibold pb-5">
      <div>
        <h1 className="font-bold mt-4 text-2xl">Messages</h1>
        <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
          <p className="text-green-500 font-semibold">Instructor</p>
          <span>
            <BsCaretRightFill />
          </span>
          <p className="font-semibold">Messages</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
