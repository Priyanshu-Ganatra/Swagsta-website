/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdStar } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PortfolioPageGrid = ({ filteredCategories, sortBy }) => {
    const { loading: creativesLoading, creatives } = useSelector(state => state.creatives)

    // Sort creatives based on the sortBy value
    const sortedCreatives = [...creatives].sort((a, b) => {
        if (sortBy === 'Featured') {
            return b.featured - a.featured;  // Prioritize featured items
        } else if (sortBy === 'Most liked') {
            return b.likedBy.length - a.likedBy.length;  // Sort by likes in descending order
        } else if (sortBy === 'Most recent') {
            return new Date(b.createdAt) - new Date(a.createdAt);  // Sort by date in descending order
        }
        return 0;  // Default case (no sorting)
    });

    if (creativesLoading) {
        return (
            <div className='flex h-[200px] justify-center gap-3 flex-col items-center'>
                <span className="loading loading-ring loading-lg"></span>
                <p className='uppercase text-center mx-1 font-bold'>Loading, Please wait...</p>
            </div>
        )
    }

    if (!creativesLoading && creatives.length === 0)
        return (
            <div className='flex justify-center gap-3 h-[200px] flex-col items-center'>
                <p className='uppercase text-center mx-1 font-bold'>No creatives found</p>
            </div>
        )

    return (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {
                sortedCreatives.map((item) => {
                    const isFeatured = item.featured;
                    const isLarge = item.likedBy.length >= 10
                    const colSpan = isLarge ? 'col-span-2' : 'col-span-1';
                    const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';
                    const shouldShow = filteredCategories.some(software => item.softwareUsed.includes(software)) || filteredCategories.length === 0

                    return (
                        shouldShow && (
                            <Link
                                key={item._id}
                                className={`relative ${colSpan} ${rowSpan} hover:cursor-pointer aspect-square group rounded-lg bg-slate-400 overflow-hidden`}
                                to={`/creative/${item._id}`}
                            >
                                <img
                                    src={item.coverImg}
                                    alt={`Creative ${item._id}`}
                                    className="w-full h-full object-cover"
                                />
                                {isFeatured && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                                        <MdStar size={16} />
                                    </div>
                                )}
                                <div className='group-hover:left-0 -left-96 transition-all ease-out duration-200 w-full h-full absolute top-0 flex items-end'>
                                    <div className='flex gap-1 ml-2 mb-2 z-50'>
                                        <Avatar className={`'w-10 h-10'}`}>
                                            <AvatarImage src={item.creatorProfilePic} className={'object-cover'} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h2 className='text-white font-bold text-xl'>{item.title}</h2>
                                            <p className='text-white text-xs'>{item.creatorName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full absolute top-0 transition-opacity opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-t from-black to-black/35 duration-200 ease-out"></div>
                            </Link>
                        )
                    )
                })
            }
        </div>
    )
}

export default PortfolioPageGrid