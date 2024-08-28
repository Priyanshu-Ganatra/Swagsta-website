import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getAllCreatives as getAllCreativesApi } from "../src/utils/creativesApi";
import { setCreativesAction } from "../features/creatives/creativesSlice";
import { useDispatch } from 'react-redux';

export default function useGetCreatives() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const getCreatives = async () => {
        setLoading(true)
        dispatch(setCreativesAction({ loading: true, creatives: [] }))
        try {
            const data = await getAllCreativesApi()
            dispatch(setCreativesAction({ loading: false, creatives: data }))
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, getCreatives }
}