/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { BiSolidLike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import useGetCollections from "../../hooks/useGetCollections";
import useAddToCollection from "../../hooks/useAddCreativeToCollection";
import { Card, CardContent, CardFooter } from "./ui/card";
import { PiEmptyThin } from "react-icons/pi";
import AddNewCollection from "./AddNewCollection";
import useLikeCreative from "../../hooks/useLikeCreative";
import toast from "react-hot-toast";

const LikeAndSave = ({ className, creativeId, creative, setCreative }) => {
    const [collections, setCollections] = useState([]);
    const { isFetchingCollections, getCollections } = useGetCollections();
    const { isAdding, addToCollection } = useAddToCollection();
    const { isLiking, likeCreative } = useLikeCreative()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && creative?.likedBy.includes(user._id)) {
            setIsLiked(true)
        }
    }, [creative]);

    useEffect(() => {
        const fetchCollections = async (userId) => {
            const data = await getCollections(userId);
            setCollections(data.collections);
        };
        if(user) fetchCollections(user._id);
    }, []);

    const handleLike = async () => {
        if (isLiking) return
        const res = await likeCreative(creativeId)
        if (res.success) {
            if (isLiked) {
                setIsLiked(false)
                setCreative((prevCreative) => {
                    const updatedCreative = { ...prevCreative };
                    updatedCreative.likedBy = updatedCreative.likedBy.filter((id) => id !== user._id);
                    return updatedCreative;
                });
            }
            else {
                setIsLiked(true)
                setCreative((prevCreative) => {
                    const updatedCreative = { ...prevCreative };
                    updatedCreative.likedBy.push(user._id);
                    return updatedCreative;
                });
            }
        }
    }

    const handleAddToCollection = async (collectionId) => {
        if (isAdding) return
        const res = await addToCollection(creativeId, collectionId);
        if (!isAdding && res) {
            setIsDialogOpen(false);
            setCollections((prevCollections) => {
                const updatedCollections = prevCollections.map((collection) => {
                    if (collection._id === collectionId) {
                        collection.creatives.push({ creativeId: creative });
                    }
                    return collection;
                });
                return updatedCollections;
            });
        }
    }

    return (
        <div className={`flex justify-around ${className} gap-4`}>
            {
                isLiked ? (
                    <button onClick={handleLike} className="flex items-center justify-center rounded-lg gap-2 border transition-all ease-in duration-75 hover:bg-gray-600 py-2 w-[50%]">
                        <BiSolidLike className="scale-125" />
                        <p className="font-medium">Liked</p>
                    </button>
                ) : (
                    <button onClick={handleLike} className="flex items-center justify-center rounded-lg gap-2 transition-all ease-in duration-200 bg-[#24baff] hover:bg-[#24d3ff] py-2 w-[50%]">
                        <BiSolidLike className="scale-125 text-black" />
                        <p className="text-black font-medium">Like</p>
                    </button>
                )
            }

            <button
                className="flex items-center justify-center rounded-lg gap-2 transition-all ease-in duration-200 bg-[#404044] hover:bg-[#696970] py-2 w-[50%]"
                onClick={() => {
                    if(!user) {
                        toast.error("Please login to save")
                        return
                    }
                    setIsDialogOpen(true)
                }}
            >
                <FaBookmark className="scale-[110%]" />
                <p className="font-medium">Save</p>
            </button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex flex-col max-h-[90vh] lg:max-w-[60vw]">
                    <DialogHeader className="flex-shrink-0">
                        <DialogTitle>Choose a collection</DialogTitle>
                        <DialogDescription>
                            Choose a collection to which you want to save this creative.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto">
                        {
                            isFetchingCollections ? (
                                <span className="min-h-[60vh] w-full flex justify-center items-center ">Loading...</span>
                            ) :
                                !collections.length ? (
                                    <AddNewCollection collections={collections} setCollections={setCollections} />
                                ) :
                                    (
                                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
                                            {collections.map((collection) => (
                                                <button
                                                    key={collection._id}
                                                    disabled={isAdding}
                                                    onClick={() => handleAddToCollection(collection._id)}
                                                >
                                                    <Card className="w-40 h-40 hover:cursor-pointer relative group overflow-hidden">
                                                        {collection.creatives.length === 0 ? (
                                                            <CardContent className="h-full w-full flex flex-col items-center justify-center p-0 gap-4">
                                                                <PiEmptyThin className="scale-[2] text-muted-foreground" />
                                                                <p className="text-xs text-muted-foreground whitespace-nowrap">Empty collection</p>
                                                            </CardContent>
                                                        ) : (
                                                            <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full p-2">
                                                                {collection.creatives.slice(0, 4).map((creative) => (
                                                                    <img
                                                                        key={creative.creativeId._id}
                                                                        src={creative.creativeId.coverImg}
                                                                        alt={creative.creativeId.title}
                                                                        className="object-cover w-full h-full rounded-sm"
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                        <CardFooter className="group-hover:opacity-100 opacity-0 absolute flex flex-col items-start p-3 inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent transition-all ease-in duration-100">
                                                            <p className="text-white mt-auto">{collection.name}</p>
                                                            <p className="text-[10px] leading-none font-semibold text-white/90">{collection.creatives.length} saved</p>
                                                        </CardFooter>
                                                    </Card>
                                                </button>
                                            ))}
                                        </div>

                                    )
                        }
                    </div>
                </DialogContent>


            </Dialog>
        </div>
    );
};

export default LikeAndSave;