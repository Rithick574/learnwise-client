import { ModeToggle } from "../ui/mode-toggle";
import { User } from "react-feather";
import {Link} from "react-router-dom"
 

const Header: React.FC = () => {
  return (
    <header className="shadow-md border-b-2">
      <div className="container mx-auto p-5 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            Learn
            <span className="text-[#46e256]">
            W
            </span>
            ise
            </h1>
        </div>
        <div className="flex items-center">
          <ul className="ml-8 p-2 flex space-x-14">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/policy">Policy</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
          <div className="ml-9">
            <ModeToggle />
          </div>
          <div className="ml-8">
              <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
