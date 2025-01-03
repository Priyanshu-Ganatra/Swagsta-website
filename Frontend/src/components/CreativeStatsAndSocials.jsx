import { MessageSquareText } from "lucide-react";
import { BiSolidLike } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const CreativeStatsAndSocials = ({ data, className }) => {
    const location = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location)}`
    const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(location)}&text=${encodeURIComponent(data?.title)}`
    const pinterestShareUrl = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(location)}&media=${encodeURIComponent(data?.coverImg)}&description=${encodeURIComponent(data?.title)}`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(location)}&title=${encodeURIComponent(data?.title)}&summary=${encodeURIComponent(data?.description)}&source=${encodeURIComponent(location)}`

    return (
        <div className={`flex flex-col gap-2 ${className} text-[#bebec2] font-medium`}>
            <div className="flex justify-between items-center">
                <span className="flex gap-2 justify-center items-center hover:cursor-pointer">
                    <BiSolidLike className="w-4 h-4" />
                    <p>{data?.likedBy.length}</p>
                </span>
                <span className="flex gap-2 justify-center items-center">
                    <IoEye className="w-4 h-4" />
                    <p>{data?.views}</p>
                </span>
                <span className="flex gap-2 justify-center items-center">
                    <MessageSquareText className="w-4 h-4 scale-x-[-1]" />
                    <p>{data?.comments.length}</p>
                </span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <a target="_blank" href={facebookShareUrl} className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaFacebookF className="w-4 h-4 group-hover:text-blue-600 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </a>
                <a target="_blank" href={pinterestShareUrl} className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaPinterest className="w-4 h-4 group-hover:text-red-500 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Save</p>
                </a>
                <a target="_blank" href={twitterShareUrl} className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaXTwitter className="w-4 h-4 group-hover:text-cyan-400 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </a>
                <a target="_blank" href={linkedInShareUrl} className="flex gap-2 justify-center items-center hover:cursor-pointer group">
                    <FaLinkedin className="w-4 h-4 group-hover:text-blue-800 transition-all ease-in duration-200" />
                    <p className="text-xs group-hover:text-white">Share</p>
                </a>
            </div>
        </div>
    )
}

export default CreativeStatsAndSocials