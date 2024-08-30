import { useState, useEffect } from 'react'
import { IoChevronBack, IoChevronForward, IoChevronDown } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import projects from '../../data/constants'

export default function Component() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const totalSlides = projects.length

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

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
        <div className="flex flex-col lg:flex-row w-full min-h-screen p-8 gap-12 relative md:pt-60 bg-black/20">
            <div className="absolute inset-0" />
            <div className="flex-[1] relative z-10 text-white">
                <h1 className="text-6xl font-bold font-oswald mb-4">{projects[currentSlide].title} (Oswald)</h1>
                <p className="text-lg mb-6">{projects[currentSlide].description}</p>
                <Button variant="outline" className="uppercase rounded-xl text-black border-white">
                    Read more
                    <IoChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="flex-1 relative z-10">
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
                                    className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <Button variant="outline" size="icon" onClick={prevSlide} className="mr-2 rounded-full border-white hover:bg-white hover:text-black">
                        <IoChevronBack className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSlide} className="mr-4 rounded-full border-white hover:bg-white hover:text-black">
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
    )
}