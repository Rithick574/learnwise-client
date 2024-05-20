import { logout } from '@/redux/actions/user/userActions';
import { AppDispatch } from '@/redux/store';
import {FC} from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiBox, FiSettings, FiLogOut } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { ImStack } from "react-icons/im";
import { BsCreditCard } from "react-icons/bs";
import { useTheme } from "@/components/ui/theme-provider";
import { MdCastForEducation } from "react-icons/md"
import { PiNotificationBold } from "react-icons/pi";


export const SideNavbar:FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        toast.error("Logout successful");
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className={`flex h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
            <div className="flex-col w-64 border-r">
                <div className="flex items-center justify-start ps-8 h-[5.3rem] border-b">
                    <span className="text-2xl font-bold primary-text">Learn<span className='text-green-500'>W</span>ise Admin</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col gap-3 px-4 py-4">
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/">
                            <RiDashboardLine className="w-5 opacity-80" />
                            <span className="font-medium text-md">Dashboard</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/courses">
                            <FiBox className="w-5 opacity-80" />
                            <span className="font-medium text-md">Courses</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/categories">
                            <ImStack className="w-5 opacity-80" />
                            <span className="font-medium text-md">Category</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/requests">
                            <PiNotificationBold className="w-5 opacity-80" />
                            <span className="font-medium text-sm">Applications</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/payments">
                            <BsCreditCard className="w-5 opacity-80" />
                            <span className="font-medium text-md">Payments</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/instructors">
                            <MdCastForEducation className="w-5 opacity-80" />
                            <span className="font-medium text-md">Instructors</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/admin/settings">
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
    );
}
