import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getAllProjects as getAllProjectsApi } from "../src/apis/projectsApi";
import { setProjectsAction } from "../features/projects/projectsSlice";
import { useDispatch } from 'react-redux';

export default function useGetProjects() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const getProjects = async () => {
        setLoading(true)
        dispatch(setProjectsAction({ loading: true, projects: [] }))
        try {
            const data = await getAllProjectsApi()
            dispatch(setProjectsAction({ loading: false, projects: data }))
            return data
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, getProjects }
}