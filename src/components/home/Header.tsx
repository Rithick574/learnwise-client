import { ModeToggle } from "../ui/mode-toggle";
import { User } from "react-feather";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import { RootState,AppDispatch } from "@/redux/store";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineUser, AiOutlineHistory, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { debounce } from "time-loom";
import OutsideTouchCloseComponent from "./OutsideTouchCloseComponent";
import { logout } from "@/redux/actions/user/userActions";

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate()

  const toggleDropDown = debounce(() => {
    setDropDown(!dropDown);
  }, 100);

  const handleLogout = () => {
    toggleDropDown();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="shadow-md border-b-2">
      <div className="container mx-auto p-5 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            Learn
            <span className="text-[#46e256]">W</span>ise
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
          <User size={24} onClick={toggleDropDown} />
            {user ? (
              dropDown && (
                <OutsideTouchCloseComponent
                  toggleVisibility={toggleDropDown}
                  style="absolute top-20 right-10 font-normal w-44 rounded-lg shadow-3xl"
                >
                 <div className="flex flex-col gap-y-3">
                 <NavLink
                    to="/dashboard/"
                    className="navbar-drop-ul"
                    onClick={toggleDropDown}
                  >
                    <RiDashboardLine className="text-xl inline" /> Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className="navbar-drop-ul"
                    onClick={toggleDropDown}
                  >
                    <AiOutlineUser className="text-xl inline" /> Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard/mycourses"
                    className="navbar-drop-ul"
                    onClick={toggleDropDown}
                  >
                    <AiOutlineHistory className="text-xl inline" /> Courses
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="navbar-drop-ul mr-24"
                  >
                    <AiOutlineLogout className="text-xl inline" /> Logout
                  </button>
                 </div>
                </OutsideTouchCloseComponent>
              )
            ) : (
             
              <Link to="/login">
              
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
