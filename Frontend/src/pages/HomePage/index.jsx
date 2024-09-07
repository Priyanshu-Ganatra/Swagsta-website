import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import NavLinks from '@/components/NavLinks';
import Socials from '../../components/Socials';
import useGetAboutUsData from '../../../hooks/useGetAboutUsData';
import './index.css';

const HomePage = () => {
  const { isFetchingAboutUsData, getAboutUsData } = useGetAboutUsData();
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    getAboutUsData().then(data => {
      setSocials(data.socials);
      setText(DOMPurify.sanitize(data.text));
      setImg(data.img);
    });
  }, []);

  if (isFetchingAboutUsData) {
    return (
      <div className='flex flex-col items-center gap-4 mt-[40%] md:mt-[20%]'>
        <span className="loading loading-ring loading-lg"></span>
        <p className='uppercase font-bold'>Loading, Please wait...</p>
      </div>
    );
  }

  return (
    <div className='mainDiv'>
      <div className='flex flex-col items-center'>
        {/* card */}
        <div className="flex flex-col gap-10 items-center mt-14 cardShadow md:w-[44%] w-[90%] 2xl:w-[35%] px-6 md:px-10 bg-white rounded-lg">
          {/* logo */}
          <div className='mt-[63px]'>
            <img src={img} height={170} width={170} alt="Logo" />
          </div>

          {/* description */}
          <div className='text-center'>
            <p dangerouslySetInnerHTML={{ __html: text }} />
          </div>

          {/* routes */}
          <div className='flex gap-4 mb-[44px]'>
            <NavLinks />
          </div>
        </div>

        {/* socials */}
        <Socials socials={socials} />
      </div>
    </div>
  );
};

export default HomePage;