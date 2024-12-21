/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { PiEmptyThin } from "react-icons/pi";
import useGetCollections from "../../../hooks/useGetCollections";
import AddNewCollection from "@/components/AddNewCollection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { limitWords } from "@/utils/limitWords";
import { Link } from "react-router-dom";
import useRemoveFromCollection from "../../../hooks/useRemoveFromCollection";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { isFetchingCollections, getCollections } = useGetCollections();
  const { isRemoving, removeFromCollection } = useRemoveFromCollection();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemove = async (creativeId, collectionId) => {
    await removeFromCollection(creativeId, collectionId, setCollections);
  }

  useEffect(() => {
    const fetchCollections = async (userId) => {
      const data = await getCollections(userId);
      setCollections(data.collections);
    };
    fetchCollections(user._id);
  }, []);

  return (
    <div className="px-10 pb-10 w-[80vw]">
      <h1 className="font-bold text-2xl text-center">Collections</h1>

      {/* added collections cards */}
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {
          collections.map((collection) => (
            <div key={collection._id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="w-40 h-40 hover:cursor-pointer relative group overflow-hidden">
                    {collection.creatives.length === 0 ?
                      <CardContent className="h-full w-full flex flex-col items-center justify-center p-0 gap-4">
                        <PiEmptyThin className="scale-[2] text-muted-foreground" />
                        <p className="text-xs text-muted-foreground whitespace-nowrap">Empty collection</p>
                      </CardContent> :
                      <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full p-2">
                        {collection.creatives.slice(0, 4).map((creative) => (
                          <img key={creative.creativeId._id} src={creative.creativeId.coverImg} alt={creative.creativeId.title} className="object-cover w-full h-full rounded-sm" />
                        ))}
                      </div>
                    }
                    <CardFooter className="group-hover:opacity-100 opacity-0 absolute flex flex-col items-start p-3 inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent transition-all ease-in duration-100">
                      <p className="text-white mt-auto">{collection.name}</p>
                      <p className="text-[10px] leading-none font-semibold text-white/90">{collection.creatives.length} saved</p>
                    </CardFooter>
                  </Card>
                </DialogTrigger>

                <DialogContent className="flex flex-col max-h-[90vh] lg:max-w-[60vw]">
                  <DialogHeader>
                    <DialogTitle>{collection.name}</DialogTitle>
                    <DialogDescription>
                      {
                        collection.creatives.length === 0 ?
                          <CardDescription className="text-muted-foreground flex justify-center items-center h-20 text-center">This collection is empty, save a creative <br /> from the portfolio page in this collection, & it&apos;ll show up here</CardDescription> :
                          <DialogDescription>
                            Click on a creative to view it.
                          </DialogDescription>
                      }
                    </DialogDescription>
                  </DialogHeader>
                  {
                    collection.creatives.length !== 0 && (
                      <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
                          {
                            collection.creatives.map((creative) => (
                              <Link key={creative.creativeId._id} to={`/creative/${creative.creativeId._id}`}>
                                <Card className="w-40 h-40 hover:cursor-pointer relative group overflow-hidden">
                                  <img src={creative.creativeId.coverImg} alt={creative.creativeId.title} className="object-cover w-full h-full rounded-sm" />
                                  <CardFooter className="group-hover:opacity-100 opacity-0 absolute flex flex-col items-start p-3 inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent transition-all ease-in duration-100">
                                    <p className="text-white mt-auto">{creative.creativeId.title}</p>
                                    <p className="text-[10px] leading-none font-semibold text-white/90">{limitWords(creative.creativeId.description, 10)}</p>
                                  </CardFooter>
                                  <Button
                                    variant="outline"
                                    className="group/delete absolute top-2 right-2"
                                    size="icon"
                                    disabled={isRemoving}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemove(creative.creativeId._id, collection._id);
                                    }}
                                  >
                                    {
                                      isRemoving ? <Trash2 className="animate-spin" /> : <Trash2 className="group-hover/delete:scale-125 transition-all ease-in duration-75" />
                                    }
                                  </Button>
                                </Card>
                              </Link>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }

                </DialogContent>
              </Dialog>
            </div>
          ))
        }

        {/* add new collection card */}
        <AddNewCollection collections={collections} setCollections={setCollections} />
      </div>
    </div>
  );
};

export default Collections;
