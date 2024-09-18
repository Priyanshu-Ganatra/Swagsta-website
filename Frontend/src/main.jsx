import { store } from '../app/store.js'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
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
import AdminPage from './pages/AdminPage';
import { Provider } from 'react-redux';

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
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='w-screen h-screen overflow-x-hidden font-poppins text-sm select-none'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  </Provider>,
);