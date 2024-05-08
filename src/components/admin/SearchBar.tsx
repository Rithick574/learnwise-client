import {FC} from 'react'
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { useTheme } from "@/components/ui/theme-provider";

interface SearchBarProps {
    handleClick: (action: string, value: string) => void;
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
}

export const SearchBar:FC<SearchBarProps> = ({ handleClick, search, setSearch, placeholder }) => {

  const { theme } = useTheme();
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleClick("search", search);
        handleClick("page", "");
      };

      return (
        <div className="w-full">
            <form
                className={`flex items-center py-2 px-4 rounded-lg border ${theme === 'light' ? 'bg-white' : 'bg-gray-800 border-gray-700'}`}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className={`outline-none w-full ${theme === 'light' ? 'text-gray-900' : 'text-gray-200 bg-gray-800'}`}
                    placeholder={placeholder || "Search..."}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleClick("search", e.target.value);
                    }}
                />
                {search ? (
                    <button
                        type="button"
                        onClick={() => {
                            handleClick("search", "");
                            setSearch("");
                        }}
                        className="ml-2"
                    >
                        <GrClose className={`text-xl ${theme === 'light' ? 'text-gray-400 hover:text-gray-800' : 'text-gray-400 hover:text-gray-200'}`} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => handleClick("search", search)}
                        className="ml-2"
                    >
                        <BiSearch className={`text-xl ${theme === 'light' ? 'text-gray-400 hover:text-gray-800' : 'text-gray-400 hover:text-gray-200'}`} />
                    </button>
                )}
            </form>
        </div>
    );
}
