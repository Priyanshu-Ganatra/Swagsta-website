/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, GalleryVerticalEnd, Info, BookOpenText, UserRoundPen, Users, LayoutDashboard, SquareArrowOutUpRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactUsForm from '@/pages/AdminPage/components/ContactUsForm'
import AboutUsForm from '@/pages/AdminPage/components/AboutUsForm'
import CaseStudiesEdit from '@/pages/AdminPage/components/CaseStudiesEdit'
import PortfolioEdit from './components/PortfolioEdit'
import StoreEdit from './components/StoreEdit'
import useGetAboutUsData from '../../../hooks/useGetAboutUsData'

export default function AdminPage() {
    const { isFetchingAboutUsData, getAboutUsData } = useGetAboutUsData();
    const [logo, setLogo] = useState();
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPage, setSelectedPage] = useState('dashboard')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        ; (
            async () => {
                const data = await getAboutUsData()
                setLogo(data.img)
            }
        )()
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen)

    const closeSidebar = useCallback(() => {
        if (isMobile) {
            setIsOpen(false)
        }
    }, [isMobile])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const getTitle = (page) => {
        switch (page) {
            case 'dashboard':
                return page
            case 'case-studies':
                return "edit case studies page data"
            case 'portfolio':
                return "edit portfolio page data"
            case 'about':
                return "edit about us page data"
            case 'contact':
                return "edit contact us page data"
            case 'store':
                return "edit store page data"
            case 'users':
                return page
        }
    }

    return (
        <div className="relative min-h-screen">
            <Button
                variant="outline"
                size="icon"
                className="fixed top-4 left-4 z-50"
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 scale-150" />}
            </Button>

            {/* Overlay */}
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 backdrop-blur-sm z-40"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
            >
                <div className="flex bg-white p-4">
                    {isMobile ?
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleSidebar}
                            aria-label="Close menu"
                        >
                            <X className="h-6 scale-150 w-6" />
                        </Button>
                        : !isFetchingAboutUsData && <img src={logo} alt="logo" className='mx-auto mt-3 border border-dashed border-black/50 rounded-full object-cover w-28 h-28' />
                    }
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li onClick={() => setSelectedPage('dashboard')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('case-studies')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <BookOpenText className="mr-2 h-4 w-4" />
                                Case Studies Page
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('portfolio')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <GalleryVerticalEnd className="mr-2 h-4 w-4" />
                                Portfolio Page
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('store')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Store Page
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('about')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <Info className="mr-2 h-4 w-4" />
                                About Us Page
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('contact')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <UserRoundPen className="mr-2 h-4 w-4" />
                                Contact Us Page
                            </Button>
                        </li>
                        <li onClick={() => setSelectedPage('users')}>
                            <Button variant="ghost" className="w-full justify-start" onClick={closeSidebar}>
                                <Users className="mr-2 h-4 w-4" />
                                Users
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="p-4 sm:ml-64">
                <h1 className="text-2xl font-bold mb-4 mt-16 uppercase text-center md:mt-10">{getTitle(selectedPage)}</h1>
                {
                    selectedPage === "contact" && <ContactUsForm />
                }
                {
                    selectedPage === "about" && <AboutUsForm />
                }
                {
                    selectedPage === "case-studies" && <CaseStudiesEdit />
                }
                {
                    selectedPage === "portfolio" && <PortfolioEdit />
                }
                {
                    selectedPage === "store" && <StoreEdit />
                }
            </div>

            <Button variant="outline" className='fixed p-0 top-5 right-5'>
                <Link className='flex items-center gap-2 w-full h-full m-4 min-w-full justify-center' to={'/'}>Visit site <SquareArrowOutUpRight className='scale-75' /></Link>
            </Button>
        </div>
    )
}