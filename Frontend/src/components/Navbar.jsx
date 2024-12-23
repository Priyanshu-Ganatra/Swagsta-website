/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { IoSearch, IoMenu, IoClose } from "react-icons/io5"
import useGetProjects from '../../hooks/useGetProjects'
import NavLinks from './NavLinks'
import useGetCreatives from '../../hooks/useGetCreatives'
import useGetCaseStudyProjects from '../../hooks/useGetCaseStudyProjects'

export default function Navbar() {
  const { getProjects } = useGetProjects()
  const { getCreatives } = useGetCreatives()
  const { getCaseStudyProjects } = useGetCaseStudyProjects()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      await getProjects()
      await getCreatives()
      await getCaseStudyProjects()
    }
    loadData()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative z-10">
      <div className={`flex h-20 items-center justify-between px-4 md:justify-end md:pr-10 md:gap-10`}>
        {isMobile ? (
          <>
            <button onClick={toggleMenu} className="text-3xl z-50" aria-label="Toggle menu">
              {isMenuOpen ? <IoClose className='text-black' /> : <IoMenu />}
            </button>
            <IoSearch className='scale-150' />
          </>
        ) : (
          <>
            <NavLinks />
            <div className='flex gap-2'>
              <IoSearch className='scale-[170%]' />
            </div>
          </>
        )}
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <NavLinks setIsMenuOpen={setIsMenuOpen} isMobile={isMobile} />
          </div>
        </div>
      )}
    </nav>
  )
}