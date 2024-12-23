/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux";

// Menu is nothing but the same navbar but in the mobile view
const NavLinks = ({ setIsMenuOpen, isMobile }) => {
    const user = useSelector((state) => state.auth) // after successful login/signup this would be populated with user data
    const isLoggedIn = (user.email !== undefined || localStorage.getItem('user') !== null) ? true : false

    return (
        <div className={`flex gap-4 items-center ${isMobile ? 'text-black flex-col' : 'flex-row'}`}>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/'}><p className="text-nowrap">About Us</p></NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/portfolio'}>Portfolio</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/services'}>Services</NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/case-studies'}><p className="text-nowrap">Case Studies</p></NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/contact'}><p className="text-nowrap">Contact Us</p></NavLink>
            <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/store'}>Store</NavLink>
            {
                isLoggedIn ?
                    <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/profile/data'}>Profile</NavLink>
                    :
                    <NavLink onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'uppercase font-bold route' : 'route'} to={'/login'}>Login</NavLink>
            }
        </div>
    )
}

export default NavLinks