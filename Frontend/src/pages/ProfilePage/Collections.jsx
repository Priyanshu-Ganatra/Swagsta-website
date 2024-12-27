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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import useDeleteCollection from "../../../hooks/useDeleteCollection";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { isFetchingCollections, getCollections } = useGetCollections();
  const { isRemoving, removeFromCollection } = useRemoveFromCollection();
  const { isDeletingCollection, deleteCollection } = useDeleteCollection();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemove = async (creativeId, collectionId) => {
    await removeFromCollection(creativeId, collectionId, setCollections);
  }

  const handleDelete = async (collectionId) => {
    setAlertDialogOpen(false);
    await deleteCollection(collectionId, setCollections);
  }

  useEffect(() => {
    const fetchCollections = async (userId) => {
      const data = await getCollections(userId);
      setCollections(data.collections);
    };
    fetchCollections(user._id);
  }, []);

  return (
    <div className="md:px-10 pb-10 xl:w-[80vw]">
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
                    <CardFooter className="xl:group-hover:opacity-100 opacity-0 absolute flex flex-col items-start p-3 inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent transition-all ease-in duration-100">
                      <p className="text-white mt-auto">{collection.name}</p>
                      <p className="text-[10px] leading-none font-semibold text-white/90">{collection.creatives.length} saved</p>
                    </CardFooter>
                    <Button
                      variant="outline"
                      className="group/delete absolute top-2 right-2 opacity-100 xl:opacity-0 group-hover:opacity-100"
                      size="icon"
                      disabled={isDeletingCollection}
                      onClick={(e) => {
                        e.preventDefault();
                        setCollectionToDelete(collection._id);
                        setAlertDialogOpen(true);
                      }}
                    >
                      {isDeletingCollection ? (
                        <Trash2 className="text-red-500 animate-spin" />
                      ) : (
                        <Trash2 className="text-red-500 group-hover/delete:scale-125 transition-all ease-in duration-75" />
                      )}
                    </Button>
                  </Card>
                </DialogTrigger>
                <div className="xl:hidden flex flex-col items-center">
                  <p className="mt-1">{collection.name}</p>
                  <p className="text-[10px] leading-none font-semibold">{collection.creatives.length} saved</p>
                </div>

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
                                      isRemoving ? <Trash2 className="animate-spin text-red-500" /> : <Trash2 className="text-red-500 group-hover/delete:scale-125 transition-all ease-in duration-75" />
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

        <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this collection? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => handleDelete(collectionToDelete)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* add new collection card */}
        <AddNewCollection collections={collections} setCollections={setCollections} />
      </div>
    </div>
  );
};

export default Collections;