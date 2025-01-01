import { useEffect } from "react";
import { checkAuth } from "@/apis/authApi";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUserAction } from "../features/auth/authSlice";
import LoadingOverlay from "@/pages/ProfilePage/LoadingOverlay";
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import NotFoundPage from './pages/NotFoundPage';
import PortfolioPage from './pages/PortfolioPage';
import StorePage from './pages/StorePage';
import ProjectPage from './pages/ProjectPage';
import MainLayout from './components/MainLayout';
import { Toaster } from 'react-hot-toast'
import ServicesPage from './pages/ServicesPage';
import ContactUs from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage/index.jsx';
import CreativePage from './pages/CreativePage/index.jsx';
import Collections from './pages/ProfilePage/Collections.jsx';
import Profile from './pages/ProfilePage/Profile.jsx';
import Orders from './pages/ProfilePage/Orders.jsx';
import Wishlist from './pages/ProfilePage/Wishlist.jsx';
import PaymentsHistory from './pages/ProfilePage/PaymentsHistory.jsx';
import useGetProjects from "../hooks/useGetProjects";
import useGetCreatives from "../hooks/useGetCreatives";
import useGetCaseStudyProjects from "../hooks/useGetCaseStudyProjects";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    let { loading, user } = useSelector((state) => state.auth);

    if (!loading && !user) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

// redirect authenticated users to profile page
const RedirectAuthUser = ({ children }) => {
    let { loading, user } = useSelector((state) => state.auth);

    if (!loading && user) {
        return <Navigate to='/profile/data' replace />;
    }

    return children;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
        errorElement: <NotFoundPage />,
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/case-studies',
                element: <CaseStudyPage />,
            },
            {
                path: '/portfolio',
                element: <PortfolioPage />,
            },
            {
                path: '/creative/:id',
                element: <CreativePage />,
            },
            {
                path: '/store',
                element: <StorePage />,
            },
            {
                path: '/project/:id',
                element: <ProjectPage />,
            },
            {
                path: '/services',
                element: <ServicesPage />,
            },
            {
                path: '/contact',
                element: <ContactUs />,
            },
            {
                path: '/login',
                element: (
                    <RedirectAuthUser>
                        <LoginPage />
                    </RedirectAuthUser>
                ),
            },
            {
                path: '/signup',
                element: (
                    <RedirectAuthUser>
                        <SignupPage />
                    </RedirectAuthUser>
                ),
            },
            {
                path: '/verify-email',
                element: <VerifyEmailPage />,
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: 'data',
                        element: <Profile />,
                    },
                    {
                        path: 'collections',
                        element: <Collections />,
                    },
                    {
                        path: 'orders',
                        element: <Orders />,
                    },
                    {
                        path: 'wishlist',
                        element: <Wishlist />,
                    },
                    {
                        path: 'payments-history',
                        element: <PaymentsHistory />,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const { getProjects } = useGetProjects();
    const { getCreatives } = useGetCreatives();
    const { getCaseStudyProjects } = useGetCaseStudyProjects();

    console.log('app component rendered');
    

    useEffect(() => {
        // Initial data loading
        const loadData = async () => {
            await getProjects();
            await getCreatives();
            await getCaseStudyProjects();
        };
        loadData();
    }, []);

    useEffect(() => {
        // Check authentication status
        const fetchUser = async () => {
            dispatch(setAuthUserAction({ loading: true, user: null }));
            const res = await checkAuth();
            if (res.user) {
                dispatch(setAuthUserAction({ loading: false, user: res.user }));
            } else {
                dispatch(setAuthUserAction({ loading: false, user: null }));
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <div className="w-screen h-screen overflow-x-hidden font-poppins text-sm select-none">
            <RouterProvider router={router} />
            <Toaster />
        </div>
    );
};

export default App;
