import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteCollection as deleteCollectionApi } from "../src/apis/profileApi";

export default function useDeleteCollection() {
    const [isDeletingCollection, setIsDeletingCollection] = useState(false)

    const deleteCollection = async (id, setCollections) => {
        setIsDeletingCollection(true)
        try {
            const res = await deleteCollectionApi(id)
            if (!res.success) {
                throw new Error(res.message)
            }
            else {
                toast.success(res.message)
                // remove this collection from all collections
                setCollections((collections) => collections.filter((collection) => collection._id !== id))
            }
    } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsDeletingCollection(false)
        }
    }

    return { isDeletingCollection, deleteCollection }
}