import { useState } from 'react'
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

    return (
        <div className="flex flex-col lg:flex-row w-full mt-20 mx-auto p-8 gap-12">
            <div className="flex-1">
                <h1 className="text-6xl font-bold mb-4">{projects[currentSlide].title}</h1>
                <p className="text-lg mb-6">{projects[currentSlide].description}</p>
                <Button variant="outline" className="uppercase rounded-xl">
                    Read more
                    <IoChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="flex-[2] relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                    >
                        {projects.map((project, index) => (
                            <div key={index} className="w-1/3 flex-shrink-0 px-2">
                                <img src={project.img} className="bg-gray-200 w-full aspect-[3/4]"></img>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className="flex">
                        <Button variant="outline" size="icon" onClick={prevSlide} className="mr-2">
                            <IoChevronBack className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextSlide}>
                            <IoChevronForward className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="bg-gray-300 h-1 w-full rounded-full">
                            <div
                                className="bg-gray-600 h-1 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="text-4xl font-bold">
                        0{currentSlide + 1}
                    </div>
                </div>
            </div>


        </div>
    )
}