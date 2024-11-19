import { useState, useEffect } from 'react'
import { IoChevronBack, IoChevronForward, IoChevronDown } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { limitWords } from '@/utils/limitWords'
import { useSelector } from 'react-redux'

export default function CaseStudyPage() {
    const { loading, caseStudyProjects } = useSelector(state => state.caseStudyProjects)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const totalSlides = !loading ? caseStudyProjects.length : 0

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    useEffect(() => {
        document.body.style.backgroundImage = `url(${caseStudyProjects[currentSlide]?.primaryImg})`;
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundAttachment = 'fixed'

        return () => {
            document.body.style.backgroundImage = ''
        }
    }, [caseStudyProjects, currentSlide, loading])

    if (loading) return <div className='flex justify-center gap-3 h-[75vh] flex-col items-center'>
        <span className="loading loading-ring loading-lg"></span>
        <p className='uppercase text-center mx-1 font-bold'>Loading, Please wait...</p>
    </div>

    if (!loading && caseStudyProjects.length === 0) return <div className='flex justify-center gap-3 h-[75vh] flex-col items-center'>
        <p className='uppercase text-center mx-1 font-bold'>No case study projects found</p>
    </div>

    // Simplified scroll function
    const scrollToSection = () => {
        const section = document.getElementById('section2')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className="scroll-smooth">
            <div className="flex flex-col lg:flex-row w-full min-h-screen p-8 gap-12 relative md:pt-[16rem] 2xl:pt-[23rem]">
                <div className="absolute inset-0" />
                <div className="flex-[1.3] relative text-white">
                    <h1 className="text-6xl font-bold uppercase font-oswald mb-4">{caseStudyProjects[currentSlide]?.title}</h1>
                    <p title={caseStudyProjects[currentSlide]?.description} className="text-lg mb-6">{isMobile ? limitWords(caseStudyProjects[currentSlide]?.description, 30) : limitWords(caseStudyProjects[currentSlide]?.description, 17)}</p>
                    <Button variant="outline" className="uppercase hover:bg-gray-400 rounded-xl mt-8 text-black border-white" onClick={scrollToSection}>
                        Read more
                        <IoChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 30}%)` }}
                        >
                            {caseStudyProjects?.map((project, index) => (
                                <div key={index} className="w-[30%] flex-shrink-0 px-2">
                                    <img
                                        src={project.primaryImg}
                                        alt={project.title}
                                        className="w-full aspect-[3/4] object-cover rounded-lg hover:cursor-pointer shadow-lg"
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <Button variant="outline" size="icon" onClick={prevSlide} className="mr-2 hover:bg-gray-400 rounded-full border-white text-black">
                            <IoChevronBack className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextSlide} className="mr-4 hover:bg-gray-400 rounded-full border-white text-black">
                            <IoChevronForward className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 bg-gray-300 h-1 rounded-full">
                            <div
                                className="bg-white h-1 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                            />
                        </div>
                        <div className="text-4xl font-bold text-white ml-4">
                            0{currentSlide + 1}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-8 flex flex-col md:flex-row gap-4 w-full scroll-mt-24' id='section2'>
                <div className='h-96 w-full rounded-lg overflow-hidden md:w-1/2'>
                    <img className='object-cover w-full h-full object-center' src={caseStudyProjects[currentSlide]?.secondaryImg} alt="secondary img" />
                </div>
                <div className='h-96 flex flex-col gap-4 py-4 w-full md:w-1/2'>
                    <h2 className='font-bold text-2xl'>{caseStudyProjects[currentSlide]?.clientName}</h2>
                    <p className='text-justify text-ellipsis'>Client intro: {isMobile ? limitWords(caseStudyProjects[currentSlide]?.clientIntro, 80) : limitWords(caseStudyProjects[currentSlide]?.clientIntro, 160)}</p>
                </div>
            </div>

            <div className='dynamicContent'></div>
        </div>
    )
}