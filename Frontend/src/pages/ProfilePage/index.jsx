import { Button } from "@/components/ui/button";
import useLogout from "../../../hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import './index.css'

const ProfilePage = () => {
    const { loading, logout } = useLogout();

    return (
        <div style={{ height: 'calc(100vh - 80px)' }} className="flex">
            {/* sidebar */}
            <div className="w-[20%] flex flex-col bg-slate-300/80 backdrop-blur-3xl items-center absolute h-screen top-0 left-0 bottom-0 rounded-r-2xl">
                <div className="flex flex-col items-center mt-20">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1731978009363-21fa723e2cbe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="mt-1 font-semibold">John Doe</p>
                    <p className="text-[13px]">priyanshuganatra@gmail.com</p>
                </div>

                <div className="flex flex-col mt-12 gap-6">
                    <NavLink
                        to={'/profile/data'}
                        className={({ isActive }) => isActive ? "font-bold uppercase " : ""}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to={'/profile/collections'}
                        className={({ isActive }) => isActive ? "font-bold uppercase " : ""}
                    >
                        Collections
                    </NavLink>
                    <NavLink
                        to={'/profile/orders'}
                        className={({ isActive }) => isActive ? "font-bold uppercase " : ""}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to={'/profile/wishlist'}
                        className={({ isActive }) => isActive ? "font-bold uppercase " : ""}
                    >
                        Wishlist
                    </NavLink>
                    <NavLink
                        to={'/profile/payments-history'}
                        className={({ isActive }) => isActive ? "font-bold uppercase " : ""}
                    >
                        Payments History
                    </NavLink>
                </div>

                <Button className="absolute bottom-8" variant="destructive">
                    <NavLink to={'/'}>
                        <span className='flex w-fit items-center gap-2' onClick={logout}>
                            {loading ? (
                                <>Logging out...<span className="loading loading-spinner loading-xs"></span></>
                            ) : (
                                <>Log out<FiLogOut /></>
                            )}
                        </span>
                    </NavLink>
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