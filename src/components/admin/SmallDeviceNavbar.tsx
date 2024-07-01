import {FC, useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import emptyProfileSrc from "/ui/empty-profile.webp"; 
import { SideNavbarStudent } from '../student/SideNavbarStudent';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const SmallDeviceNavbar:FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const toggleSideNavbar = () => {
        setShowSideNavbar(!showSideNavbar);
      };
  return (
    <div className="lg:hidden p-5 shadow-lg z-10 flex items-center justify-between">
    <div className="w-7 flex items-center cursor-pointer rounded-lg opacity-70 hover:opacity-100">
    <img src={user?.profile?.avatar || emptyProfileSrc} className='rounded' alt="Empty Profile" />
    </div>
    <div
      className="text-xl text-gray-500 active:text-black"
      onClick={toggleSideNavbar}
    >
      <GiHamburgerMenu />
    </div>

    <div
      className={`side-navbar-admin ${
        showSideNavbar ? "show" : ""
      } absolute top-0 left-0  bg-opacity-40`}
      onClick={toggleSideNavbar}
    >
      <div className="h-screen w-fit px-5 py-3 flex-shrink-0 shadow-lg pt-5">
        <SideNavbarStudent />
      </div>
    </div>
  </div>
  )
}
