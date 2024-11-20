/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import CreativesForm from '@/pages/AdminPage/components/CreativesForm'
import useGetCreatives from '../../../../hooks/useGetCreatives'
import { useEffect, useState } from 'react'
import ProjectsCarousel from "./ProjectsCarousel"
import useDeleteCreative from "../../../../hooks/useDeleteCreative"

const PortfolioEdit = () => {
  const { loading, getCreatives } = useGetCreatives()
  const { isDeletingCreative, deleteCreative } = useDeleteCreative()
  const [creatives, setCreatives] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [creativeToDelete, setCreativeToDelete] = useState(null)
  const [creativeToUpdate, setCreativeToUpdate] = useState(null)

  const onDelete = async (id) => {
    setCreativeToDelete(id)
    setShowDeleteDialog(true)
  }

  const onEdit = (id) => {
    setCreativeToUpdate(id)
  }

  const handleConfirmDelete = async () => {
    const res = await deleteCreative(creativeToDelete)

    if (res.success) {
      setCreatives(creatives.filter((creative) => creative._id !== creativeToDelete))
    }

    setShowDeleteDialog(false)
    setCreativeToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteDialog(false)
    setCreativeToDelete(null)
  }

  const fetchCreatives = async () => {
    const creatives = await getCreatives()
    setCreatives(creatives)
  }

  useEffect(() => {
    fetchCreatives()
  }, [])

  return (
    <div className="max-w-2xl mx-auto scroll-smooth">
      {!loading && creatives.length !== 0 &&
        <h1 className="text-2xl text-center mt-6 block">
          Added Creatives
        </h1>}
      <ProjectsCarousel
        loading={loading}
        projects={creatives}
        isDeleting={isDeletingCreative}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      {!loading && creatives.length !== 0 && <hr />}
      <CreativesForm creatives={creatives} creativeToEdit={creativeToUpdate} setCreativeToEdit={setCreativeToUpdate} setCreatives={setCreatives} />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this creative.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PortfolioEdit