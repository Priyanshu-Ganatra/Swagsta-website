import { Button } from "@/components/ui/button";
import useLogout from "../../../hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import './index.css'

const ProfilePage = () => {
    const { loading, logout } = useLogout();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="flex flex-col xl:flex-row">
            {/* sidebar */}
            <div className="xl:min-w-[274px] flex flex-col justify-evenly xl:gap-0 gap-4 xl:p-0 p-4 xl:justify-start bg-slate-300/80 backdrop-blur-3xl items-center xl:absolute xl:top-0 xl:left-0 xl:bottom-0 xl:h-screen rounded-2xl xl:rounded-r-2xl xl:rounded-l-none mb-4 xl:mb-0">
                <div className="flex flex-col items-center xl:mt-20">
                    <Avatar className="xl:w-24 xl:h-24 w-14 h-14">
                        <AvatarImage src={user.pfp} />
                        <AvatarFallback>PFP</AvatarFallback>
                    </Avatar>
                    <p className="mt-1 font-semibold">{user.fullName}</p>
                    <p className="text-[13px]">{user.email}</p>
                </div>

                <hr className="border-t border-black w-full xl:hidden visible" />

                <div className="flex xl:flex-col xl:mt-12 gap-3 xl:gap-6 md:text-sm items-center text-xs whitespace-nowrap">
                    <NavLink
                        to={'/profile/data'}
                        className={({ isActive }) => isActive ? "font-bold uppercase route" : "route"}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to={'/profile/collections'}
                        className={({ isActive }) => isActive ? "font-bold uppercase route" : "route"}
                    >
                        Collections
                    </NavLink>
                    <NavLink
                        to={'/profile/orders'}
                        className={({ isActive }) => isActive ? "font-bold uppercase route" : "route"}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to={'/profile/wishlist'}
                        className={({ isActive }) => isActive ? "font-bold uppercase route" : "route"}
                    >
                        Wishlist
                    </NavLink>
                    <NavLink
                        to={'/profile/payments-history'}
                        className={({ isActive }) => isActive ? "font-bold uppercase route" : "route"}
                    >
                        Payments History
                    </NavLink>
                </div>

                <Button className="xl:absolute xl:bottom-8 hidden xl:block" variant="destructive" onClick={logout}>
                    <span className='flex items-center gap-2 w-full h-full'>
                        {loading ? (
                            <>Logging out...<span className="loading loading-spinner loading-xs"></span></>
                        ) : (
                            <>Log out<FiLogOut /></>
                        )}
                    </span>
                </Button>
            </div>

            {/* content */}
            <div className="xl:ml-[20%]">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfilePage;