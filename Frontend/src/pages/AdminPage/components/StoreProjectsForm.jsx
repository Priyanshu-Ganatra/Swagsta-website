/* eslint-disable react/prop-types */
import { useState, useRef, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from "lucide-react"
import useAddStoreProject from '../../../../hooks/useAddStoreProject'

const ImageUpload = ({ id, label, multiple, images, setImages }) => {
  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (multiple) {
          setImages(prev => [...prev, reader.result])
        } else {
          setImages(reader.result)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    if (multiple) {
      setImages(prev => prev.filter((_, i) => i !== index))
    } else {
      setImages(null)
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(id).click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Browse an image or drag and drop here</p>
        <p className="mt-1 text-xs text-gray-500">Max file size: 10MB</p>
      </div>
      <Input
        id={id}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(Array.from(e.target.files))}
      />
      {multiple ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Other ${index + 1}`} className="w-20 h-20 object-cover rounded" />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  removeImage(index)
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : images && (
        <div className="relative mt-2 border-2 border-dashed border-gray-300 rounded-lg p-2">
          <img src={images} alt="Cover" className="w-full h-auto object-cover rounded" />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault()
              removeImage(0)
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Component() {
  const { isAdding, addStoreProject } = useAddStoreProject()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [technicalDetails, setTechnicalDetails] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [price, setPrice] = useState('')
  const [otherImages, setOtherImages] = useState([])
  const [credits, setCredits] = useState([])
  const [storyline, setStoryline] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const creditInputRef = useRef(null)

  const handleCreditKeyDown = (e) => {
    if (e.key === 'Enter' && creditInputRef.current.value) {
      e.preventDefault()
      setCredits(prev => [...prev, creditInputRef.current.value])
      creditInputRef.current.value = ''
    }
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    addStoreProject({
      title,
      category,
      technicalDetails,
      coverImage,
      price,
      otherImages,
      credits,
      storyline,
      isFeatured
    }).then((data) => {
      if (data && data.success) {
        setTitle('')
        setCategory('')
        setTechnicalDetails('')
        setCoverImage(null)
        setPrice('')
        setOtherImages([])
        setCredits([])
        setStoryline('')
        setIsFeatured(false)
        creditInputRef.current.value = ''
      }
    }
    )
  }, [title, category, technicalDetails, coverImage, price, otherImages, credits, storyline, isFeatured, addStoreProject])

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h1 className="text-2xl text-center mb-6">Add a project</h1>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Input
          id="category"
          placeholder="Enter project category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="technicalDetails" className="text-sm font-medium">Technical details</label>
        <Textarea
          id="technicalDetails"
          placeholder="Enter technical details"
          rows={4}
          value={technicalDetails}
          onChange={(e) => setTechnicalDetails(e.target.value)}
        />
      </div>

      <ImageUpload
        id="coverImage"
        label="Cover image"
        multiple={false}
        images={coverImage}
        setImages={setCoverImage}
      />

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">Price in rupees</label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <ImageUpload
        id="otherImages"
        label="Other images"
        multiple={true}
        images={otherImages}
        setImages={setOtherImages}
      />

      <div className="space-y-2">
        <label htmlFor="credits" className="text-sm font-medium">Credits</label>
        <Input
          id="credits"
          placeholder="Enter credit and press Enter"
          onKeyDown={handleCreditKeyDown}
          ref={creditInputRef}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {credits.map((credit, index) => (
            <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
              {credit}
              <button
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.preventDefault()
                  setCredits(prev => prev.filter((_, i) => i !== index))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="storyline" className="text-sm font-medium">Storyline</label>
        <Textarea
          id="storyline"
          placeholder="Enter storyline"
          rows={4}
          value={storyline}
          onChange={(e) => setStoryline(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isFeatured"
          checked={isFeatured}
          onCheckedChange={setIsFeatured}
        />
        <label htmlFor="isFeatured" className="text-sm font-medium">Is featured?</label>
      </div>

      <Button type="submit" className="w-full" disabled={isAdding}>
        {isAdding ? 'Adding project...' : 'Add project'}
      </Button>
    </form>
  )
}