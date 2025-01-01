import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaHeart, FaShareAlt } from 'react-icons/fa'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import RemainingGrid from "./RemainingGrid"
import useGetOneProject from "../../../hooks/useGetOneProject"
import useLikeProject from "../../../hooks/useLikeProject"
import { useParams, useNavigate } from "react-router-dom"
import { MdStar } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"
import { useSelector } from "react-redux"
// import { setAuthUserAction } from "../../../features/auth/authSlice"
import toast from "react-hot-toast"
import { limitWords } from "@/utils/limitWords"
import Comments from "./Comments"

export default function ProjectPage() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    let { user } = useSelector((state) => state.auth)
    // console.log(user);

    const [isMobile, setIsMobile] = useState(false)
    const [projectData, setProjectData] = useState({})
    const { id } = useParams()
    const { loading: projectLoading, getOneProject } = useGetOneProject()
    const { isLiking, likeProject } = useLikeProject()
    const [isLiked, setIsLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1095)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        const getData = async () => {
            getOneProject(id)
                .then((data) => {
                    setProjectData(data)
                    setComments(data.comments)
                })
        }
        getData()
    }, [id]);

    // useEffect(() => {
    //     if (user)
    //         dispatch(setAuthUserAction(user))
    // }, [dispatch, user]);

    useEffect(() => {
        setIsLiked(projectData?.likedBy?.includes(user?._id))
    }, [projectData, user?._id]);

    const handleLike = async () => {
        setDialogMessage('You need to be logged in to like this project. Would you like to log in now?')
        if (!user) {
            setShowLoginDialog(true)
            return
        }
        await likeProject({ projectId: id, userId: user._id })
            .then((data) => {
                if (isLiked) {
                    setIsLiked(false)
                } else {
                    setIsLiked(true)
                }
                setProjectData(data.project)
            })
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: projectData?.title,
                text: projectData?.techDetails,
                url: window.location.href
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link copied to clipboard')
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <AlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Authentication Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => navigate('/login')}>
                            Log in
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {projectLoading
                ?
                <div className='flex h-[200px] justify-center gap-3 flex-col whitespace-nowrap items-center'>
                    <span className="loading loading-ring loading-lg"></span>
                    <p>Loading project data...</p>
                </div>
                :
                <>
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
                        {/* Main content area */}
                        <div className="md:col-span-2">
                            <div className="w-full h-[500px] bg-muted overflow-hidden relative rounded-lg">
                                <img src={projectData?.coverImg} className="w-full h-full object-contain" />
                                {projectData?.featured && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                                        <MdStar size={16} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className={`p-4 ${!isMobile && 'min-h-[292px]'}`}>
                                    <h2 className="text-2xl font-bold mb-2">{projectData?.title}</h2>
                                    <p className="text-sm text-muted-foreground text-justify" title={projectData?.techDetails}>
                                        {limitWords(projectData?.techDetails, 60)}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <h2 className="text-md">Credits: {
                                        projectData?.credits?.map((credit, index) => `${credit}${index === projectData.credits.length - 1 ? '' : ', '}`)
                                    }</h2>
                                </CardContent>
                            </Card>

                            <div className="flex items-center space-x-4">
                                <Button
                                    variant={isLiked ? "default" : "outline"}
                                    size="sm"
                                    className={`flex items-center space-x-2 ${isLiked ? 'bg-red-500 hover:bg-red-600' : ''}`}
                                    onClick={handleLike}
                                    aria-label={isLiked ? "Unlike" : "Like"}
                                >
                                    <FaHeart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                    <span>{isLiking ? isLiked ? 'Removing Like...' : 'Liking...' :
                                        projectData?.likedBy?.length}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2"
                                    onClick={handleShare}
                                    aria-label="Share"
                                >
                                    <FaShareAlt className="h-4 w-4" />
                                    <span>Share</span>
                                </Button>
                            </div>

                            {/* Pricing section */}
                            <div className="flex items-center space-x-2 max-w-md">
                                <div className="flex rounded-md overflow-hidden">
                                    <div className="bg-gray-200 text-xl font-bold p-1 px-3">
                                        ${projectData?.price}
                                    </div>
                                    <Button className="bg-blue-500 rounded-l-none hover:bg-blue-600 h-10 text-white font-bold">
                                        INSTANT BUY
                                    </Button>
                                </div>
                                <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow">
                                    Request file
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-6 ">
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground text-justify" title={projectData?.storyLine}>
                                    {limitWords(projectData?.storyLine, 300)}
                                </p>
                            </CardContent>
                        </Card>

                        {projectData?.otherImages?.length > 0 &&
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full cursor-grab select-none"
                            >
                                <CarouselContent>
                                    {projectData?.otherImages?.map((otherImg, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 aspect-square">
                                            <img
                                                src={otherImg}
                                                className="rounded-lg"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>}
                    </div>

                    <Comments comments={comments} setComments={setComments} id={id} setShowLoginDialog={setShowLoginDialog} setDialogMessage={setDialogMessage} user={user} />
                </>}

            <RemainingGrid exceptId={id} />
        </div>
    )
}