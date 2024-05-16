import { logout } from '@/redux/actions/user/userActions';
import { AppDispatch } from '@/redux/store';
import {FC} from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiBox, FiSettings, FiLogOut } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { useTheme } from "@/components/ui/theme-provider";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssessment,MdOutlineAnnouncement } from "react-icons/md";
import { PiStudent } from "react-icons/pi";


export const SideNavbarInstructor:FC = () => {
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
            <div className="flex-col w-64">
                <div className="flex items-center justify-start ps-8 h-[5.3rem]">
                    <span className="text-2xl font-bold primary-text">Learn<span className='text-green-500'>W</span>ise Mentor</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col gap-4 px-4 py-4">
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/">
                            <RiDashboardLine className="w-5 opacity-80" />
                            <span className="font-medium text-md">Dashboard</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/courses">
                            <FiBox className="w-5 opacity-80" />
                            <span className="font-medium text-md">My Courses</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/payments">
                            <MdOutlineAssessment className="w-5 opacity-80" />
                            <span className="font-medium text-md">Assessments</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/instructors">
                            <MdOutlineAnnouncement className="w-5 opacity-80" />
                            <span className="font-medium text-md">Announcements</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/instructors">
                            <PiStudent className="w-5 opacity-80" />
                            <span className="font-medium text-md">My Students</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-4 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/students">
                            <TiMessages className="w-5 opacity-80" />
                            <span className="font-medium text-md">Messages</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/profile">
                            <CgProfile className="w-5 opacity-80" />
                            <span className="font-medium text-md">Profile</span>
                        </NavLink>
                        <NavLink className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} to="/instructor/settings">
                            <FiSettings className="w-5 opacity-80" />
                            <span className="font-medium text-md">Settings</span>
                        </NavLink>
                        <button className={`pl-6 py-3 flex items-center justify-start gap-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-lg`} onClick={handleLogout}>
                            <FiLogOut className="w-5 opacity-80" />
                            <span className="font-medium text-md">Logout</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
