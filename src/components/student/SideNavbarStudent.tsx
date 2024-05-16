import {FC} from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../ui/theme-provider';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/redux/store';
import { logout } from '@/redux/actions/user/userActions';
import { RiDashboardLine } from 'react-icons/ri';
import { FiBox, FiLogOut, FiSettings } from 'react-icons/fi';
import { PiNotificationBold } from 'react-icons/pi';
import { ImStack } from 'react-icons/im';

export const SideNavbarStudent:FC = () => {
//   const { user } = useSelector((state: RootState) => state.user);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
      toast.success("Logout successful");
      dispatch(logout());
      navigate("/");
  };
  return (
    <div className={`flex h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} mt-5`}>
    <div className="flex-col w-64">
        <div className="flex items-center justify-start ps-8 h-[5.3rem] border-b">
            <span className="text-2xl font-bold primary-text">Learn<span className='text-green-500'>W</span>ise Student</span>
        </div>
        <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col gap-3 px-4 py-4">
                <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/student/">
                    <RiDashboardLine className="w-5 opacity-80" />
                    <span className="font-medium text-md">Overview</span>
                </NavLink>
                <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/student/enrollments">
                    <FiBox className="w-5 opacity-80" />
                    <span className="font-medium text-md">Enrollments</span>
                </NavLink>
                <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/student/exams">
                    <ImStack className="w-5 opacity-80" />
                    <span className="font-medium text-md">Exams</span>
                </NavLink>
                <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/student/messages">
                    <PiNotificationBold className="w-5 opacity-80" />
                    <span className="font-medium text-sm">Messages</span>
                </NavLink>
                <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/student/settings">
                    <FiSettings className="w-5 opacity-80" />
                    <span className="font-medium text-md">Settings</span>
                </NavLink>
                <button className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} onClick={handleLogout}>
                    <FiLogOut className="w-5 opacity-80" />
                    <span className="font-medium text-md">Logout</span>
                </button>
            </nav>
        </div>
    </div>
</div>
  )
}
