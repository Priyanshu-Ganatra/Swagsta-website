/* eslint-disable react/prop-types */
import { MessageSquareText } from "lucide-react";
import { BiSolidLike } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const CreativeStatsAndSocials = ({ className }) => {
    return (
        <div className={`flex flex-col gap-2 ${className} text-[#bebec2] font-medium`}>
            <div className="flex justify-between items-center">
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer">
                    <BiSolidLike className="w-4 h-4" />
                    <p>500</p>
                </span>
                <span className="flex gap-2 justify-center items-center">
                    <IoEye className="w-4 h-4" />
                    <p>2.4K</p>
                </span>
                <span className="flex gap-2 justify-center items-center">
                    <MessageSquareText className="w-4 h-4 scale-x-[-1]" />
                    <p>234</p>
                </span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaFacebookF className="w-4 h-4 group-hover:text-blue-600 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </span>
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaPinterest className="w-4 h-4 group-hover:text-red-500 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Save</p>
                </span>
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaXTwitter className="w-4 h-4 group-hover:text-cyan-400 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </span>
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaLinkedin className="w-4 h-4 group-hover:text-blue-800 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </span>
            </div>
        </div>
    )
}

export default CreativeStatsAndSocials