/* eslint-disable react/prop-types */
import { limitWords } from '@/utils/limitWords'
import { useState } from 'react';

const CreativeDescription = ({ description }) => {
    const [isDescriptionExpanded, setisDescriptionExpanded] = useState(false);

    return (
        <div className='flex flex-col mt-6 gap-2'>
            <h3 className='font-bold text-xl text-[#eeeef1]'>Alien Romulus : Walk to Tylers</h3>
            <span className='flex flex-col'>
                <p className='text-creativeTitle'>{isDescriptionExpanded ? description : limitWords(description, 34)}</p>
                {description.length > 34 &&
                    <p className='underline mt-2 hover:cursor-pointer text-txtMuted w-fit hover:text-[#24baff]' onClick={() => setisDescriptionExpanded(!isDescriptionExpanded)}>
                        {isDescriptionExpanded ? 'Show less' : 'Show more'}
                    </p>}
            </span>
            <span className='italic text-txtMuted text-xs'>Posted 4 days ago</span>
        </div>
    )
}

export default CreativeDescription