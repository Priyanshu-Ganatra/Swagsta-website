/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { limitWords } from "@/utils/limitWords";

const ProjectsCarousel = ({ loading, projects, isDeleting, onDelete, isEditing, onEdit }) => {
    if (loading)
        return (<div className="gap-2 p-6 flex items-center justify-center">
            <span className="loading loading-ring loading-lg"></span> Loading projects...
        </div>)

    if (!loading && projects.length === 0)
        return null

    return (
        <Carousel>
            <CarouselContent className="gap-2 p-6 relative">
                {isDeleting &&
                    <div className="mx-6 z-10 min-h-40 h-40 absolute left-0 right-0 rounded-md bg-gray-300/50 flex items-center justify-center">
                    <span className="loading loading-ring loading-lg"></span> Deleting a project, please wait...
                </div>}
                {projects.map((project) => (
                    <CarouselItem
                        key={project._id}
                        className="max-w-40 p-0 w-40 max-h-40 h-40 rounded-md overflow-hidden relative"
                    >
                        <div
                            className="w-full h-full flex flex-col justify-between bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${project.primaryImg})`,
                            }}
                        >
                            <div className="bg-white/40 flex p-2 font-bold justify-center border-b border-black">{limitWords(project.title, 3)}</div>
                            <div className="w-full flex justify-between items-end p-2 bg-gradient-to-t from-black/40 to-transparent">
                                <Button
                                    variant="outline"
                                    className="group"
                                    size="icon"
                                    onClick={() => onDelete(project._id)}
                                >
                                    <Trash2 className="group-hover:scale-125 transition-all ease-in duration-75" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="group"
                                    size="icon"
                                    onClick={() => onEdit(project._id)}
                                >
                                    <Pencil className="group-hover:scale-125 transition-all ease-in duration-75" />
                                </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ProjectsCarousel;
