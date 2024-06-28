import { FC } from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b w-1/2">
      {['Courses', 'Member Ship'].map(tab => (
        <button
          key={tab}
          className={`py-2 px-4 focus:outline-none ${activeTab === tab ? 'border-b-2 border-gray-500' : 'text-gray-500'}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
