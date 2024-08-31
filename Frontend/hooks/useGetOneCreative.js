import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getOneCreative as getOneCreativeApi } from "../src/apis/creativesApi";

export default function useGetOneCreative() {
    const [loading, setLoading] = useState(false)

    const getOneCreative = async (id) => {
        setLoading(true)
        try {
            const data = await getOneCreativeApi(id)
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, getOneCreative }
}