import { useState } from "react";
import { ModeToggle } from "../components/ui/mode-toggle";
import { User } from "react-feather";
import Login from "../pages/user/Login";
import {Link} from "react-router-dom"
 

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="shadow-md border-b-2">
      <div className="container mx-auto p-5 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl font-bold">LearnWise</span>
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
            <button onClick={toggleModal}>
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Login onClose={closeModal} />}
    </header>
  );
};

export default Header;
