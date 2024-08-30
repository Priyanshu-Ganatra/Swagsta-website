/* eslint-disable react/prop-types */
import { MdStar } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CreativesGrid = ({ sidebarCollapsed, filteredCategories, sortBy }) => {
    const { loading, creatives } = useSelector(state => state.creatives)

    // Sort creatives based on the sortBy value
    const sortedCreatives = [...creatives].sort((a, b) => {
        if (sortBy === 'Featured') {
            return b.featured - a.featured;  // Prioritize featured items
        } else if (sortBy === 'Most liked') {
            return b.likes - a.likes;  // Sort by likes in descending order
        } else if (sortBy === 'Most recent') {
            return new Date(b.createdAt) - new Date(a.createdAt);  // Sort by date in descending order
        }
        return 0;  // Default case (no sorting)
    });

    return (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {loading
                ?
                <div
                    style={{
                        width: sidebarCollapsed ? 'calc(100vw - 100px)' : 'calc(100vw - 200px)'
                    }}
                    className='flex h-[200px] justify-center gap-3 flex-col items-center'
                >
                    <span className="loading loading-ring loading-lg"></span>
                    <p>Please wait intial load takes around a minute...</p>
                </div>
                :
                sortedCreatives.map((item) => {
                    const isFeatured = item.featured;
                    const isLarge = item.likes >= 10
                    const colSpan = isLarge ? 'col-span-2' : 'col-span-1';
                    const rowSpan = isLarge ? 'row-span-2' : 'row-span-1';
                    const shouldShow = filteredCategories.includes(item.category) || filteredCategories.length === 0

                    return (
                        shouldShow && (
                            <Link
                                key={item._id}
                                className={`relative ${colSpan} ${rowSpan} hover:cursor-pointer aspect-square rounded-lg bg-white overflow-hidden`}
                                to={`/project/${item._id}`}
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
                            </Link>
                        )
                    )
                })}
        </div>
    )
}

export default CreativesGrid