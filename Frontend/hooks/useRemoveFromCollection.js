import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { removeFromCollection as removeFromCollectionApi } from "../src/apis/profileApi";

export default function useRemoveFromCollection() {
    const [isRemoving, setisRemoving] = useState(false)

    const removeFromCollection = async (creativeId, collectionId, setCollections) => {
        setisRemoving(true)
        try {
            const res = await removeFromCollectionApi(creativeId, collectionId)
            // remove the creative from the collection with this collectionId
            setCollections((prevCollections) => {
                const newCollections = prevCollections.map((collection) => {
                    if (collection._id === collectionId) {
                        collection.creatives = collection.creatives.filter((creative) => creative.creativeId._id !== creativeId)
                    }
                    return collection
                })
                return newCollections
            })
            toast.success(res.message)
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setisRemoving(false)
        }
    }

    return { isRemoving, removeFromCollection }
}