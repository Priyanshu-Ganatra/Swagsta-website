import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className={`${location.pathname == '/case-studies' && 'text-white bg-black/20'}`} >
      <Navbar />
      <Outlet />
    </div >
  );
};

export default MainLayout;