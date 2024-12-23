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
        <div className="flex">
            {/* sidebar */}
            <div className="w-[20%] flex flex-col bg-slate-300/80 backdrop-blur-3xl items-center absolute h-screen top-0 left-0 bottom-0 rounded-r-2xl">
                <div className="flex flex-col items-center mt-20">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user.pfp} />
                        <AvatarFallback>PFP</AvatarFallback>
                    </Avatar>
                    <p className="mt-1 font-semibold">{user.fullName}</p>
                    <p className="text-[13px]">{user.email}</p>
                </div>

                <div className="flex flex-col mt-12 gap-6">
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

                <Button className="absolute bottom-8" variant="destructive" onClick={logout}>
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
            <div className="ml-[20%]">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfilePage;