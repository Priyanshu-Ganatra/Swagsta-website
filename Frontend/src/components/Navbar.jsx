/* eslint-disable react-hooks/exhaustive-deps */
import useGetCreatives from '../../hooks/useGetCreatives';
import { IoSearch } from "react-icons/io5";
import NavLinks from './NavLinks'
import { useEffect } from 'react';

const Navbar = () => {
    const { getCreatives } = useGetCreatives()
    
    useEffect(() => {
      const loadCreatives = async () => {
        await getCreatives()
      }
      loadCreatives()
    }, []);

    return (
        <div className={`flex gap-10 h-20 items-center justify-end pr-10`}>
            {/* links */}
            <NavLinks />    

            {/* search */}
            <div className='flex gap-2'>
                {/* <input type="text" placeholder="Search" className="border border-gray-300 block rounded-xl p-2" /> */}
                <IoSearch className='scale-[170%]'/>
            </div>
        </div>
    )
}

export default Navbar