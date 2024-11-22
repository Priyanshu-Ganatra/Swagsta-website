import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteProject as deleteProjectApi } from "../src/apis/projectsApi";

export default function useDeleteProject() {
    const [isDeletingProject, setIsDeletingProject] = useState(false)

    const deleteProject = async (id) => {
        setIsDeletingProject(true)
        try {
            const res = await deleteProjectApi(id)
            return res
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsDeletingProject(false)
        }
    }

    return { isDeletingProject, deleteProject }
}