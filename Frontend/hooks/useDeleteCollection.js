import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteCollection as deleteCollectionApi } from "../src/apis/profileApi";
import { useDispatch } from 'react-redux';
import { setRemoveCollectionAction } from '../features/profile/collectionsSlice';

export default function useDeleteCollection() {
    const [isDeletingCollection, setIsDeletingCollection] = useState(false)
    const dispatch = useDispatch();

    const deleteCollection = async (id) => {
        setIsDeletingCollection(true)
        try {
            const res = await deleteCollectionApi(id)
            if (!res.success) {
                throw new Error(res.message)
            }
            else {
                toast.success(res.message)
                // remove this collection from all collections
                dispatch(setRemoveCollectionAction(id))
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