/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import useDeleteCaseStudyProject from "../../../../hooks/useDeleteCaseStudyProject"
import useGetCaseStudyProjects from "../../../../hooks/useGetCaseStudyProjects"
import CaseStudyForm from "./CaseStudiesForm"
import ProjectsCarousel from "./ProjectsCarousel"

const CaseStudiesEdit = () => {
    const { loading, getCaseStudyProjects } = useGetCaseStudyProjects()
    const { isDeletingCaseStudyProject, deleteCaseStudyProject } = useDeleteCaseStudyProject()
    const [projects, setProjects] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState(null)
    const [projectToUpdate, setProjectToUpdate] = useState(null)

    const onDelete = async (id) => {
        setProjectToDelete(id)
        setShowDeleteDialog(true)
    }

    const onEdit = (id) => {
        setProjectToUpdate(id)
        // console.log(id);
    }

    const handleConfirmDelete = async () => {
        const res = await deleteCaseStudyProject(projectToDelete)

        if (res.success) {
            setProjects(projects.filter((project) => project._id !== projectToDelete))
        }

        setShowDeleteDialog(false)
        setProjectToDelete(null)
    }

    const handleCancelDelete = () => {
        setShowDeleteDialog(false)
        setProjectToDelete(null)
    }

    const fetchProjects = async () => {
        setProjects(await getCaseStudyProjects())
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className="max-w-2xl mx-auto scroll-smooth">
            {!loading && projects.length !== 0 &&
                <h1 className="text-2xl text-center mt-6 block">
                    Added Projects
                </h1>}
            <ProjectsCarousel
                loading={loading}
                projects={projects}
                isDeleting={isDeletingCaseStudyProject}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            {!loading && projects.length !== 0 && <hr />}
            <CaseStudyForm projects={projects} projectToEdit={projectToUpdate} setProjectToEdit={setProjectToUpdate} setProjects={setProjects} />

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this project.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isDeletingCaseStudyProject ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CaseStudiesEdit