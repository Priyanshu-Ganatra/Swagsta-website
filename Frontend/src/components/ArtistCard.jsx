/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, X } from "lucide-react"
import { Link } from "react-router-dom"

const ArtistCard = ({ isMobile, data }) => {
    return (
        <div className={`flex bg-[#202024] ${isMobile ? 'p-4 relative gap-4' : 'gap-2'}`}>
            {/* avatar */}
            <Avatar className={`${isMobile ? 'w-14 h-14 mt-2' : 'w-20 h-20'}`}>
                <AvatarImage src={data?.creatorProfilePic} className='object-cover'/>
                <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            {/* artist name */}
            <div className='flex flex-col'>
                <h2 className='mt-2 font-bold text-2xl text-creativeTitle'>{data?.creatorName}</h2>
                <p className='text-txtMuted max-w-52'>{data?.creatorProfession}</p>
                <div className='flex gap-1 hover:bg-white/25 hover:cursor-pointer rounded text-white justify-center border-2 border-txtMuted mt-2 items-center px-2 w-fit'>
                    <UserPlus className='w-4 scale-x-[-1]' />
                    <p>Follow</p>
                </div>
            </div>
            {/* options and close icons */}
            <div className='flex absolute top-5 right-5 '>
                <Link to={'/portfolio'}><X className='scale-75 hover:cursor-pointer hover:scale-[85%] transition-all ease-in duration-300 hover:text-white text-txtMuted' /></Link>
            </div>
        </div>
    )
}

export default ArtistCard