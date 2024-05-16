import { RootState } from '@/redux/store';
import {FC, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { SideNavbarStudent } from '../student/SideNavbarStudent';
import { SmallDeviceNavbar } from '../admin/SmallDeviceNavbar';

export const StudentLayout:FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => { 
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex lg:flex-row flex-col overflow-y-hidden h-screen">
      <SmallDeviceNavbar />
      <div className="hidden lg:block pl-6 pr-5 py-3 flex-shrink-0">
      <SideNavbarStudent />
      </div>
      <Outlet />
    </div>
  )
}

