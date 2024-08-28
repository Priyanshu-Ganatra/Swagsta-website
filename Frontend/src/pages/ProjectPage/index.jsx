/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react"
import RemainingGrid from "./RemainingGrid"
import useGetOneCreative from "../../../hooks/useGetOneCreative"
import useLikeCreative from "../../../hooks/useLikeCreative"
import { useParams } from "react-router-dom"
import { MdStar } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserAction } from "../../../features/auth/authSlice"
import toast from "react-hot-toast"

export default function ProjectPage() {
    const dispatch = useDispatch()
    const localuser = localStorage.getItem('user')
    const user = useSelector(state => state.auth)
    const [creativeData, setCreativeData] = useState({})
    const { id } = useParams()
    const { loading: creativeLoading, getOneCreative } = useGetOneCreative()
    const { isLiking, likeCreative } = useLikeCreative()
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const getData = async () => {
            getOneCreative(id)
                .then((data) => {
                    setCreativeData(data)
                })
        }
        getData()
    }, [id]);

    useEffect(() => {
        if (localuser)
            dispatch(setAuthUserAction(JSON.parse(localuser)))
    }, []);

    useEffect(() => {
        setIsLiked(creativeData?.likedBy?.includes(user?.username))
    }, [creativeData]);

    const limitWords = (str = '', limit) => {
        if (str.split(' ').length > limit) {
            return str.split(' ').slice(0, limit).join(' ') + '...'
        }
        return str
    }

    const handleLike = async () => {
        if (!user.username) {
            alert('Please login to like this creative')
            return
        }
        await likeCreative(id, user.username)
            .then((data) => {
                if (isLiked) {
                    setIsLiked(false)
                } else {
                    setIsLiked(true)
                }
                setCreativeData(data.creative)
            }
            )
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: creativeData?.title,
                text: creativeData?.techDetails,
                url: window.location.href
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            toast.error('Web Share API not supported in your browser')
            navigator.clipboard.writeText(window.location.href)
            toast.success('Link copied to clipboard instead')
        }
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            {creativeLoading
                ?
                <div className='flex h-[200px] justify-center gap-3 flex-col whitespace-nowrap items-center'>
                    <span className="loading loading-ring loading-lg"></span>
                    <p>Loading creative data...</p>
                </div>
                :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main content area */}
                        <div className="md:col-span-2">
                            <div className="w-full h-[500px] bg-muted overflow-hidden relative rounded-lg">
                                <img src={creativeData?.coverImg} className=" w-full h-full object-contain" />
                                {creativeData?.featured && (
                                    <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                                        <MdStar size={16} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-4">
                                    <h2 className="text-2xl font-bold mb-2">{creativeData?.title}</h2>
                                    <p className="text-sm text-muted-foreground" title={creativeData?.techDetails}>
                                        {limitWords(creativeData?.techDetails, 69)}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <h2 className="text-md">Credits: {
                                        creativeData?.credits?.map((credit, index) => `${credit}${index === creativeData.credits.length - 1 ? '' : ', '}`)
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
                                        creativeData?.likes}</span>
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
                                        ${creativeData?.price}
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


                    <div className="mt-6 space-y-6 mb-10">
                        <Card>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground" title={creativeData?.storyLine}>
                                    {limitWords(creativeData?.storyLine, 300)}
                                </p>
                            </CardContent>
                        </Card>

                        {creativeData?.otherImages?.length > 0 &&
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full cursor-grab select-none"
                            >
                                <CarouselContent>
                                    {creativeData?.otherImages?.map((otherImg, index) => (
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
                </>}

            <div>
                <h2 className="text-2xl font-bold mb-4">Explore other creatives</h2>
                <RemainingGrid exceptId={id} />
            </div>
        </div>
    )
}

