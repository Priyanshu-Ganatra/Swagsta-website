import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CaseStudyForm from "./CaseStudiesForm"
import { Label } from "@/components/ui/label"

const CaseStudiesEdit = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <Label className="text-2xl text-center mt-6 block" htmlFor="terms">
                Added projects
            </Label>

            <Carousel id="terms">
                <CarouselContent className="gap-2 p-6 ">
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                    <CarouselItem className="max-w-40 w-40 max-h-40 h-40 bg-gray-400 rounded-md"></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <CaseStudyForm />
        </div>
    )
}

export default CaseStudiesEdit
