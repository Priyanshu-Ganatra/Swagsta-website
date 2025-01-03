import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { RedirectAuthUser } from "./components/RedirectAuthUser";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CheckAuthAndFetchContent from "./CheckAuthAndFetchContent";

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

    return (
        <div className="w-screen h-screen overflow-x-hidden font-poppins text-sm select-none">
            <RouterProvider router={router} />
            <Toaster />
            <CheckAuthAndFetchContent />
        </div>
    );
};

export default App;
