/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAddNewCollection from "../../../hooks/useAddNewCollection";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PiPlusThin } from "react-icons/pi";
import useGetCollections from "../../../hooks/useGetCollections";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const { isFetchingCollections, getCollections } = useGetCollections();
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const { isAdding, addNewCollection } = useAddNewCollection();
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchCollections = async (userId) => {
      const data = await getCollections(userId);
      setCollections(data.collections);
      console.log(data.collections);
    }
    fetchCollections(user._id);
  }, []);

  const onSubmit = () => {
    if(newCollectionName === "") return
    addNewCollection({ userId: user._id, name: newCollectionName });
    if(!isAdding) {
      toggleIsAddingCollection(false);
    }
  }

  const toggleIsAddingCollection = (bool) => {
    setIsAddingCollection(bool);
    setNewCollectionName("");
  };

  const handleInputChange = (e) => {
    setNewCollectionName(e.target.value);
  };

  return (
    <div className="px-10 pb-10 w-[80vw]">
      <h1 className="font-bold text-2xl text-center">Collections</h1>

      {/* cards */}
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {
          collections.map((collection) => (
            <Card key={collection._id} className="w-40 h-40 hover:cursor-pointer relative group">
              <CardFooter className="group-hover:flex hidden absolute flex-col items-start p-0 bottom-2 right-2 left-2">
                <p className="">{collection.name}</p>
                <p className="text-xs font-semibold">{collection.creatives.length} saved</p>
              </CardFooter>
            </Card>
          ))
        }

        {/* add new collection card */}
        <Card className="w-40 h-40 hover:cursor-pointer">
          {!isAddingCollection ? (
            <Button
              className="h-full w-full p-0"
              variant="outline"
              onClick={() => toggleIsAddingCollection(true)}
            >
              <CardContent className="h-full w-full flex flex-col justify-center items-center gap-2">
                <PiPlusThin className="text-muted-foreground min-w-14 min-h-14" />
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  Add new collection
                </p>
              </CardContent>
            </Button>
          ) :
            <div className="px-2 w-full h-full flex flex-col justify-center items-center">
              <Input
                placeholder="Enter name"
                value={newCollectionName}
                onChange={handleInputChange}
              />
              <span className="flex gap-2 mt-2">
                <Button
                  className=""
                  variant="outline"
                  onClick={() => onSubmit()}
                >
                  <Check />
                </Button>
                <Button
                  onClick={() => toggleIsAddingCollection(false)}
                  variant="outline"
                >
                  <X />
                </Button>
              </span>
            </div>
          }
        </Card>
      </div>
    </div>
  );
};

export default Collections;