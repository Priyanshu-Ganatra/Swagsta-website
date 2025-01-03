import { useState } from 'react'
// import { toast } from 'react-hot-toast'
import { getCollections as getCollectionsApi } from "../src/apis/profileApi";
import { useDispatch } from 'react-redux';
import { setCollectionsAction } from "../features/profile/collectionsSlice";

export default function useGetCollections() {
    const [isFetchingCollections, setisFetchingCollections] = useState(false)
    const dispatch = useDispatch()

    const getCollections = async () => {
        setisFetchingCollections(true)
        dispatch(setCollectionsAction({ loading: true, collections: [] }))
        try {
            const data = await getCollectionsApi()
            dispatch(setCollectionsAction({ loading: false, collections: data.collections }))
            return data
        } catch (error) {
            // toast.error(error.message)
        }
        finally {
            setisFetchingCollections(false)
        }
    }

    return { isFetchingCollections, getCollections }
}