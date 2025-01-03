import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { PiPlusThin } from "react-icons/pi";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import useAddNewCollection from "../../hooks/useAddNewCollection";
import { useSelector } from "react-redux";

const AddNewCollection = () => {
    const [isAddingCollection, setIsAddingCollection] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");
    const { isAdding, addNewCollection } = useAddNewCollection();
    let { user } = useSelector((state) => state.auth)

    const onSubmit = async () => {
        if (newCollectionName === "") return
        await addNewCollection({ userId: user._id, name: newCollectionName });
        if (!isAdding) {
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
    )
}

export default AddNewCollection