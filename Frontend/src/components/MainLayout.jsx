import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const MainLayout = () => {
  const location = useLocation();
  const { loading, caseStudyProjects } = useSelector(state => state.caseStudyProjects);

  return (
    <div className={`${location.pathname === '/case-studies' && !loading && caseStudyProjects.length ? 'text-white bg-black/20' : ''}`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;