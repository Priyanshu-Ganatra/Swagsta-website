/* eslint-disable react/prop-types */
import { BiSolidLike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa6";

const LikeAndSave = ({ className }) => {
    return (
        <div className={`flex justify-around ${className} gap-4`}>
            <button className="flex items-center justify-center rounded-lg gap-2 transition-all ease-in duration-200 bg-[#24baff] hover:bg-[#24d3ff] py-2 w-[50%]">
                <BiSolidLike className="scale-125 text-black" />
                <p className="text-black font-medium">Like</p>
            </button>
            <button className="flex items-center justify-center rounded-lg gap-2 transition-all ease-in duration-200 bg-[#404044] hover:bg-[#696970] py-2 w-[50%]">
                <FaBookmark className="scale-[110%]" />
                <p className=" font-medium">Save</p>
            </button>
        </div>
    )
}

export default LikeAndSave