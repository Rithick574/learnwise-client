import { RootState } from '@/redux/store';
import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import Skeleton from '../ui/Skeleton';

type Props = {
    children?: React.ReactNode;
};

export const InstructorLayout: FC<Props> = ({ children })=> {
    const { user } = useSelector((state: RootState) => state.user);
    const[loading,setLoading] =useState(true)
    const [open,setOpen] = useState(true)
    useEffect(()=>{
        
    })
  
  return (
    <div className="flex h-screen bg-gray-100">
            <div className={`${open ? "flex" : "hidden"} flex-col w-64`}>
                <div className="flex items-center justify-start ps-8 h-[5.3rem] bg-white border-b">
                    <span className="text-white text-2xl font-bold primary-text">Instructor</span>
                </div>
                <div className="flex-1 overflow-y-auto border-r secondary-bg">
                    <nav className="flex flex-col gap-4 flex-1 px-4 py-4">
                        <NavLink to="/instructor">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/home.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Dashboard</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/courses">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/book-open.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">My Courses</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/assessments">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/bar-chart-2.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Assessments</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/announcements">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/icons/megaphone.png" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Announcements</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/chat">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/message-circle.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Messages</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/live">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/icons/live.png" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Live Stream</span>
                            </div>
                        </NavLink>
                        <NavLink to="/instructor/settings">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/settings.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Settings</span>
                            </div>
                        </NavLink>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-24 bg-white border-b">
                    <div className={`flex w-full items-center ${open ? "gap-[22rem]": "gap-[38rem]"} ps-6`}>
                        <div className="flex gap-4">
                            <button onClick={() => {
                                setOpen((state) => !state);
                            }} className="focus:outline-none hover:bg-purple-100 secondary-light-bg px-4 rounded-lg">
                                <img src="/svgs/menu.svg" alt="" />
                            </button>

                            <div className="secondary-light-bg flex items-center justify-center gap-12 px-4 rounded-lg">
                                <input className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
                                <img src="/icons/search-icon.png" alt="" className="w-6" />
                            </div>
                        </div>

                        <nav className="contents">
                            <ul className="flex items-center gap-10">
                                <li className="p-2 rounded cursor-pointer">
                                    <div className="flex items-center justify-between gap-4">
                                        {(loading || !user) ? (
                                            <>
                                                <Skeleton width="44px" height="44px" />
                                                <div className="flex flex-col gap-2">
                                                    <Skeleton width="80px" height="18px" />
                                                    <Skeleton width="40px" height="14px" />
                                                </div>
                                            </>

                                        ) : (
                                            <>
                                                <img src={`${user?.profile?.avatar ? user?.profile?.avatar : "/ui/empty-profile.webp"}`} className="w-12 rounded-xl" />
                                                <div className="flex flex-col items-start h-full bg-white">
                                                    <h2 className="font-semibold text-sm">{user?.username}</h2>
                                                    <h6 className="font-light text-xs">{user?.role}</h6>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li className="">
                                    <Link to={""}>
                                        <img src="/icons/notification.png" alt='notification' className="w-12" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
                <div className="secondary-light-bg h-full overflow-y-auto">
                    {children}
                </div>

            </div>
        </div>
  )
}
