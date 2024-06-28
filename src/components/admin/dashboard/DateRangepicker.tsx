import { useTheme } from '@/components/ui/theme-provider';
import { FC } from 'react';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateRangepickerProps {
  isVisible: boolean;
  onClose: () => void;
  dateRange: Range[];
  setDateRange: (range: Range[]) => void;
  onApply: () => void;
  maxDate: Date;
}

const DateRangepicker: FC<DateRangepickerProps> = ({ isVisible, onClose, dateRange, setDateRange, onApply,maxDate }) => {
  if (!isVisible) return null;
  const {theme} =useTheme()
  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const selectedRange = ranges.selection;
    setDateRange([selectedRange]);
  };
 

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-lg p-6 w-96 ${theme === "light" ? "bg-white" : "bg-gray-800"} `}>
        <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
        <DateRangePicker
        className="custom-date-range-picker"
          ranges={dateRange}
          onChange={handleSelect}
          maxDate={maxDate}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangepicker;
