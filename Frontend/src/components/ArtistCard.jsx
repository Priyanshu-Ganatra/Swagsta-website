/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EllipsisVertical, UserPlus, X } from "lucide-react"

const ArtistCard = ({ setIsModalOpen }) => {
    return (
        <div className='flex gap-2'>
            {/* avatar */}
            <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* artist name */}
            <div className='flex flex-col'>
                <h2 className='mt-2 font-bold text-2xl text-creativeTitle'>Brandon Liao</h2>
                <p className='text-txtMuted max-w-52'>3D designer</p>
                <div className='flex gap-1 hover:bg-white/25 hover:cursor-pointer rounded text-white justify-center border-2 border-txtMuted mt-2 items-center px-2 w-fit'>
                    <UserPlus className='w-4 scale-x-[-1]' />
                    <p>Follow</p>
                </div>
            </div>
            {/* options and close icons */}
            <div className='flex absolute top-5 right-5 '>
                <EllipsisVertical className='scale-75 hover:cursor-pointer hover:scale-[85%] transition-all ease-in duration-300 hover:text-white text-txtMuted' />
                <X onClick={() => setIsModalOpen(false)} className='scale-75 hover:cursor-pointer hover:scale-[85%] transition-all ease-in duration-300 hover:text-white text-txtMuted' />
            </div>
        </div>
    )
}

export default ArtistCard