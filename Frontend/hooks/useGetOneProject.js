import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getOneProject as getOneProjectApi } from "../src/apis/projectsApi";

export default function useGetOneProject() {
    const [loading, setLoading] = useState(false)

    const getOneProject = async (id) => {
        setLoading(true)
        try {
            const data = await getOneProjectApi(id)
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, getOneProject }
}