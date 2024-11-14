/* eslint-disable react/prop-types */
import { limitWords } from '@/utils/limitWords'
import { useState } from 'react';

function timeAgo(createdAt) {
    const now = new Date();
    const postDate = new Date(createdAt);
    const seconds = Math.floor((now - postDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `Posted ${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `Posted ${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `Posted ${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `Posted ${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `Posted ${interval} minutes ago`;

    return `Posted just now`;
}

const CreativeDescription = ({ data }) => {
    const [isDescriptionExpanded, setisDescriptionExpanded] = useState(false);

    return (
        <div className='flex flex-col mt-6 gap-2'>
            <h3 className='font-bold text-xl text-[#eeeef1]'>{data?.title}</h3>
            <span className='flex flex-col'>
                <p className='text-creativeTitle'>{isDescriptionExpanded ? data?.description : limitWords(data?.description, 34)}</p>
                {data?.description.length > 34 &&
                    <p className='underline mt-2 hover:cursor-pointer text-txtMuted w-fit hover:text-[#24baff]' onClick={() => setisDescriptionExpanded(!isDescriptionExpanded)}>
                        {data?.description?.split(' ').length > 34 ? isDescriptionExpanded ? 'Show less' : 'Show more' : ''}
                    </p>}
            </span>
            <span className='italic text-txtMuted text-xs'>{timeAgo(data?.createdAt)}</span>
        </div>
    )
}

export default CreativeDescription