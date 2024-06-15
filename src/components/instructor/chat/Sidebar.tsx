import { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <div className="w-4/12 p-4  h-full">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full mb-4 bg-gray-800 rounded-lg p-2"
      />
      {/* List of previous chat participants */}
      {/* <div>
        <p className="font-semibold mb-2">Previous Chats</p>
        <ul className="list-none">
          Replace with dynamic content
          <li className="mb-2">John Doe</li>
          <li className="mb-2">Jane Smith</li>
          <li className="mb-2">Obi-Wan Kenobi</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Sidebar;
