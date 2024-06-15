import { FC } from 'react';

const MessageInput: FC = () => {
  return (
    <div className="flex mt-36 
    ">
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered w-full mr-2 bg-gray-700 p-3 rounded-lg"
      />
      <button className="btn bg-blue-700 px-7 rounded-lg absolute right-0 py-3 mr-7">Send</button>
    </div>
  );
};

export default MessageInput;
