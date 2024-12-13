import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getCollections as getCollectionsApi } from "../src/apis/profileApi";

export default function useGetCollections() {
    const [isFetchingCollections, setisFetchingCollections] = useState(false)

    const getCollections = async (userId) => {
        setisFetchingCollections(true)
        try {
            const data = await getCollectionsApi(userId)
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setisFetchingCollections(false)
        }
    }

    return { isFetchingCollections, getCollections }
}