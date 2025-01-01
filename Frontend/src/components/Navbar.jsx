import { useEffect, useState } from 'react'
import { IoSearch, IoMenu, IoClose } from "react-icons/io5"
import NavLinks from './NavLinks'
import useLogout from '../../hooks/useLogout'
import { useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { FiLogOut } from 'react-icons/fi'

export default function Navbar() {

  const { loading, logout } = useLogout();
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative z-10">
      <div className={`flex h-20 items-center justify-between px-4 md:justify-end md:pr-10 md:gap-10`}>
        {isMobile ? (
          <>
            <span onClick={toggleMenu} className="text-3xl z-50" aria-label="Toggle menu">
              {isMenuOpen ? <Button className="p-0 px-4" variant="outline"><IoClose className='scale-150' /></Button> : <Button className="p-0 px-4" variant="outline"><IoMenu className='scale-150' /></Button>}
            </span>
            {
              !location.pathname.includes('profile') && (
                <IoSearch className='scale-150 mr-2' />
              )
            }
          </>
        ) : (
          <>
            <NavLinks />
            <div className='flex gap-2'>
              <IoSearch className='scale-[170%]' />
            </div>
          </>
        )}

        {
          location.pathname.includes('profile') && (
            <Button className="xl:hidden block" variant="destructive" onClick={logout}>
              <span className='flex items-center gap-2 w-full h-full'>
                {loading ? (
                  <>Logging out...<span className="loading loading-spinner loading-xs"></span></>
                ) : (
                  <>Log out<FiLogOut /></>
                )}
              </span>
            </Button>
          )
        }
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <NavLinks setIsMenuOpen={setIsMenuOpen} isMobile={isMobile} />
          </div>
        </div>
      )}
    </nav>
  )
}