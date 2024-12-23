/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ArtistCard from '@/components/ArtistCard'
import CommentsSection from '@/components/CommentsSection'
import CreativeDescription from '@/components/CreativeDescription'
import CreativeStatsAndSocials from '@/components/CreativeStatsAndSocials'
import LikeAndSave from '@/components/LikeAndSave'
import SoftwareUsed from '@/components/SoftwareUsed'
import Tags from '@/components/Tags'
import useGetOneCreative from '../../../hooks/useGetOneCreative'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function getMediaType(url) {
  if (url.includes("video")) {
    return "video";
  } else if (url.includes("image")) {
    return "image";
  } else {
    return "unknown";
  }
}

const CreativePage = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [comments, setComments] = useState([])
  const { id } = useParams()
  const [data, setData] = useState(null);
  const { loading, getOneCreative } = useGetOneCreative()

  useEffect(() => {
    const loadData = async () => {
      const data = await getOneCreative(id)
      // console.log(data);
      setData(data)
      setComments(data.comments)
    }
    loadData()
  }, [id]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 992) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Listen for resize events

    return () => window.removeEventListener('resize', checkMobile); // Cleanup listener on unmount
  }, []);

  return (
    <div className={`flex ${isMobile ? 'flex-col mx-2 gap-2' : 'flex-row gap-6 mx-6 h-[calc(100vh-81px)]'}`}>
      <div className={`${isMobile ? 'w-full' : 'w-[70%] lg:w-[80%]'} overflow-auto h-full bg-black flex flex-col rounded-t-xl`}>
        {
          isMobile && <ArtistCard data={data} isMobile={isMobile} />
        }
        <div className='bg-black rounded-xl flex flex-col items-center gap-4 text-white'>
          {
            data?.otherMedia?.map((item, index) => (
              getMediaType(item) === "image" ?
                <img
                  key={index}
                  src={item}
                  alt={`image ${index + 1}`}
                  className="max-w-full h-auto"
                />
                :
                <video
                  key={index}
                  src={item}
                  controls
                  className="max-w-full h-auto"
                />
            ))
          }
        </div>
      </div>

      <div className={`overflow-auto ${isMobile ? 'w-full' : 'max-w-[30%] lg:w-[20%] min-w-[388px]'} text-white`}>
        {/* data */}
        <div className='flex flex-col p-8 rounded-xl bg-[#202024] relative'>
          {
            !isMobile && <ArtistCard data={data} isMobile={isMobile} />
          }
          <LikeAndSave className={`${!isMobile && 'mt-6'}`} creativeId={id} creative={data} setCreative={setData}/>
          <CreativeDescription data={data} />
          <CreativeStatsAndSocials data={data} className={'mt-4'} />
          <SoftwareUsed data={data} className={'mt-10'} />
        </div>
        {/* comments */}
        <CommentsSection setComments={setComments} comments={comments} id={id} className="mt-2 p-8" />
        {/* tags */}
        <Tags data={data} className="mt-2 p-8" />
        {/* more by this artist */}
      </div>
    </div>
  )
}

export default CreativePage