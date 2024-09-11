import { useState, useEffect } from 'react'
import { IoChevronBack, IoChevronForward, IoChevronDown } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import projects from '../../data/constants'
import { limitWords } from '@/utils/limitWords'

export default function CaseStudyPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [clientIntro] = useState('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nobis recusandae reprehenderit vel, maiores dolores, dolorem magni minima esse dicta facere quaerat velit cum natus sapiente. Modi tempore fugiat quae laborum, alias iusto est laboriosam quis magnam! Libero possimus dolore sint modi vel reiciendis, obcaecati hic autem aliquid, veniam inventore! Odio nisi quis vero quam sit, quae minus necessitatibus ratione velit mollitia voluptatibus voluptate beatae? Dignissimos quia quo ab magni nesciunt repudiandae dolore minus consequuntur a reiciendis voluptas pariatur ipsam placeat quasi quod deleniti, minima sequi quidem excepturi dicta rem exercitationem! Possimus placeat assumenda ex officia optio, est praesentium quod reiciendis consectetur dignissimos voluptas beatae facilis eveniet! Odio, fugiat, aperiam odit atque consequatur laboriosam voluptatem ratione obcaecati sint officiis aspernatur enim impedit necessitatibus ipsa mollitia placeat libero deserunt quidem tempore perferendis labore, veritatis dolorem doloremque eum! Non commodi perferendis cum quas soluta sapiente, alias adipisci minima exercitationem maiores omnis? Consequuntur laboriosam totam ex voluptatum labore tenetur enim obcaecati? Repellat maiores impedit cumque illo ducimus excepturi modi placeat voluptates nulla, provident numquam qui quaerat pariatur consequuntur fugit, possimus blanditiis aspernatur neque sit quod expedita, reprehenderit accusantium. Neque minima nobis ex eum veniam adipisci, aut harum, sint nihil a similique! Cumque beatae illo esse ab itaque quod reiciendis a laborum harum dolorum maiores perferendis, odio sint quisquam suscipit doloremque adipisci quo non fugiat quia! Rerum, quia consectetur culpa voluptate animi quaerat nemo et possimus impedit voluptatum ab non reiciendis labore, dolores molestiae rem eos. Facilis est dolorem ratione facere aliquid, nulla modi at omnis doloremque. Ut aliquam eos est amet expedita cum iste. Ducimus illo non voluptas porro dicta. Ullam, rem obcaecati possimus numquam aut reiciendis et repudiandae sit praesentium corrupti facilis aspernatur, tempora magni dolorem unde ex nulla omnis! Natus odit voluptates consectetur quasi inventore ut voluptate incidunt eveniet fugiat sed?')
    const [isMobile, setIsMobile] = useState(false)
    const totalSlides = projects.length

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
        document.body.style.backgroundImage = `url(${projects[currentSlide].img})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundAttachment = 'fixed'

        return () => {
            document.body.style.backgroundImage = ''
        }
    }, [currentSlide])

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full min-h-screen p-8 gap-12 relative md:pt-[18rem] 2xl:pt-[24rem]">
                <div className="absolute inset-0" />
                <div className="flex-[1.3] relative text-white">
                    <h1 className="text-6xl font-bold uppercase font-oswald mb-4">{projects[currentSlide].title}</h1>
                    <p className="text-lg mb-6">{projects[currentSlide].description}</p>
                    <Button variant="outline" className="uppercase hover:bg-gray-400 rounded-xl mt-8 text-black border-white">
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
                            {projects.map((project, index) => (
                                <div key={index} className="w-[30%] flex-shrink-0 px-2">
                                    <img
                                        src={project.img}
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

            <div className='p-8 flex flex-col md:flex-row gap-4 w-full'>
                <div className='h-96 w-full rounded-lg overflow-hidden md:w-1/2'>
                    <img className='object-cover w-full h-full object-center' src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className='h-96 flex flex-col gap-4 py-4 w-full md:w-1/2'>
                    <h2 className='font-bold text-2xl'>Client name</h2>
                    <p className='text-justify text-ellipsis'>Client intro: {isMobile ? limitWords(clientIntro, 80) : limitWords(clientIntro, 160)}</p>
                </div>
            </div>

            <div className='dynamicContent'></div>
        </>
    )
}