import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getAllProjects as getAllProjectsApi } from "../src/apis/caseStudiesApi";
import { useDispatch } from 'react-redux';
import { setCaseStudyProjectsAction } from '../features/caseStudyProjects/caseStudySlice';

export default function useGetCaseStudyProjects() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const getCaseStudyProjects = async () => {
        setLoading(true)
        dispatch(setCaseStudyProjectsAction({ loading: true, caseStudyProjects: [] }))
        try {
            const data = await getAllProjectsApi()
            dispatch(setCaseStudyProjectsAction({ loading: false, caseStudyProjects: data }))
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { loading, getCaseStudyProjects }
}