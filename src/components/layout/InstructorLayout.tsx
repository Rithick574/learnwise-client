import { RootState } from "@/redux/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SmallDeviceNavbar } from "../admin/SmallDeviceNavbar";
import { SideNavbarInstructor } from "../instructor/SideNavbarInstructor";

export const InstructorLayout: FC = () => {
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
      <SideNavbarInstructor />
      </div>
      <Outlet />
    </div>
  );
};
