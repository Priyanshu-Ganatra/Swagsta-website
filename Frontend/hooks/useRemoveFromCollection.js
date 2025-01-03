import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { removeFromCollection as removeFromCollectionApi } from "../src/apis/profileApi";

export default function useRemoveFromCollection() {
    const [isRemoving, setisRemoving] = useState(false)

    const removeFromCollection = async (creativeId, collectionId) => {
        setisRemoving(true)
        
        try {
            const res = await removeFromCollectionApi(creativeId, collectionId)
            toast.success(res.message)
            return res
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setisRemoving(false)
        }
    }

    return { isRemoving, removeFromCollection }
}