import { NavLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

const NavLinks = () => {
    const user = useSelector((state) => state.auth) // bug: this is {}
    const isLoggedIn = (user.username !== undefined || localStorage.getItem('user') !== null) ? true : false
    const { loading, logout } = useLogout()

    return (
        <div className="flex gap-4">
            <NavLink className={({ isActive }) => isActive ? 'text-cyan-500' : 'route'} to={'/'}>About Us</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-cyan-500' : 'route'} to={'/portfolio'}>Portfolio</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-cyan-500' : 'route'} to={'/services'}>Services</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-cyan-500' : 'route'} to={'/case-studies'}>Case Studies</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-cyan-500' : 'route'} to={'/contact'}>Contact Us</NavLink>
            {
                isLoggedIn ?
                    <p className='route flex items-center gap-2' onClick={logout}>
                        {loading ?
                            <>
                                Logging out...
                                <span className="loading loading-spinner loading-xs"></span>
                            </> :
                            <>
                                Log out
                                <FiLogOut />
                            </>}
                    </p>
                    :
                    <>
                        <NavLink className={({ isActive }) => isActive ? 'text-cyan-500 uppercase font-bold' : 'route uppercase font-bold'} to={'/login'}>Login</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-cyan-500 uppercase font-bold' : 'route uppercase font-bold'} to={'/signup'}>Sign up</NavLink>
                    </>
            }
        </div>
    )
}

export default NavLinks