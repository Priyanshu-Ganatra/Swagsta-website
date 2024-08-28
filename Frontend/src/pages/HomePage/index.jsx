import NavLinks from '@/components/NavLinks'
import MyIcon from '../../assets/logo.svg'
import Socials from '../../components/Socials'
import './index.css'

const HomePage = () => {
  return (
    <div className='mainDiv'>
      <div className='flex flex-col items-center'>
        {/* card */}
        <div className="flex flex-col gap-10 items-center mt-14 cardShadow w-[44%] px-10 bg-white rounded-lg">
          {/* logo */}
          <div className='mt-[63px]'>
            <img src={MyIcon} alt="Logo" />
          </div>

          {/* description */}
          <div className='text-center'>
            <p>
              Swagsta is an independently operated full-time Creative studio located in Mumbai, Maharashtra run by Mr. Sagar Shah offering a range of services. While services tend to be specialized in Graphics Designing, Creative Direction, Branding, & Motion Graphics we look to create opportunities for new ideas and projects to come to life.
              <br />
              <br />
              Please feel free to check out some of the clients we have had the pleasure of working with such as the Aaiena- A Unit of Sankshit Group, Drive Sales, Aditya Birla (ABSLMF), Thunder, EDAPT APP, Destin’e, TheArtAmore, Amirah, Shobha Shringar, AtoZ, HomeShiksha, Ohmazing, Windrush, Aajjii, QuadBTech, Finstreet, DIMIX, Strux and more.
            </p>
          </div>

          {/* routes */}
          <div className='flex gap-4 mb-[44px]'>
            <NavLinks />
          </div>
        </div>

        {/* socials */}
        <Socials />
      </div>
    </div>
  )
}

export default HomePage