import { NavLink } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

const NavLinks = () => {
    const user = useSelector((state) => state.auth) // after successful login/signup this would be populated with user data
    const isLoggedIn = (user.username !== undefined || localStorage.getItem('user') !== null) ? true : false
    const { loading, logout } = useLogout()

    return (
        <div className="flex gap-4 flex-col md:flex-row items-center">
            <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/'}>About Us</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/portfolio'}>Portfolio</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/services'}>Services</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/case-studies'}>Case Studies</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/contact'}>Contact Us</NavLink>
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
                        <NavLink className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/login'}>Login</NavLink>
                    </>
            }
        </div>
    )
}

export default NavLinks