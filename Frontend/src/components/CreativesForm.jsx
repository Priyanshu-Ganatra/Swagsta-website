/* eslint-disable react/prop-types */
'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from 'lucide-react'
import useAddCreative from '../../hooks/useAddCreative'

const softwareOptions = ['PureRef', 'ZBrush', 'Maya', 'Blender', 'Photoshop']

export default function CreativeForm() {
    const [name, setName] = useState('')
    const [profession, setProfession] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [software, setSoftware] = useState([])
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [otherMedia, setOtherMedia] = useState([])
    const { isAdding, addCreative } = useAddCreative()

    const tagInputRef = useRef(null)
    const profilePictureRef = useRef(null)
    const coverImageRef = useRef(null)
    const otherMediaRef = useRef(null)

    const handleSoftwareChange = useCallback((value) => {
        setSoftware(prev => {
            if (prev.includes(value)) {
                return prev.filter(item => item !== value)
            } else {
                return [...prev, value]
            }
        })
    }, [])

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            setTags(prev => [...prev, tagInput.trim()])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }

    const clearForm = () => {
        setName('')
        setProfession('')
        setTitle('')
        setDescription('')
        setSoftware([])
        setTags([])
        setTagInput('')
        setProfilePicture(null)
        setCoverImage(null)
        setOtherMedia([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let profilePictureBase64 = null
        let coverImageBase64 = null
        let otherMediaBase64 = []

        if (profilePicture) {
            profilePictureBase64 = await convertToBase64(profilePicture)
        }

        if (coverImage) {
            coverImageBase64 = await convertToBase64(coverImage)
        }

        for (let file of otherMedia) {
            const base64 = await convertToBase64(file)
            otherMediaBase64.push(base64)
        }

        const result = await addCreative({
            name,
            profession,
            title,
            description,
            software,
            tags,
            profilePicture: profilePictureBase64,
            coverImage: coverImageBase64,
            otherMedia: otherMediaBase64
        })

        if (result.success) {
            clearForm()
        }
    }

    const FileUploadArea = ({ id, accept, multiple, onChange, inputRef, text, subtext, preview }) => (
        <div>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => inputRef.current.click()}
            >
                <input
                    id={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={onChange}
                    ref={inputRef}
                    className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">{text}</p>
                <p className="mt-1 text-xs text-gray-500">{subtext}</p>
            </div>
            {preview}
        </div>
    )

    const ImagePreview = ({ file }) => {
        if (!file) return null
        return (
            <div className="mt-4">
                <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-full h-auto rounded-lg" />
            </div>
        )
    }

    const MultipleMediaPreview = ({ files }) => {
        if (!files.length) return null
        return (
            <div className="mt-4 grid grid-cols-2 gap-4">
                {files.map((file, index) => (
                    <div key={index}>
                        {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="max-w-full h-auto rounded-lg" />
                        ) : (
                            <video src={URL.createObjectURL(file)} controls className="max-w-full h-auto rounded-lg" />
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white">
            <h1 className="text-2xl text-center mb-6">Add a creative</h1>

            <div>
                <Label htmlFor="name">Creator&apos;s Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <FileUploadArea
                    id="profilePicture"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                    inputRef={profilePictureRef}
                    text="Browse an image or drag and drop here"
                    subtext="Max file size: 10MB"
                    preview={<ImagePreview file={profilePicture} />}
                />
            </div>

            <div>
                <Label htmlFor="profession">Creator&apos;s Profession</Label>
                <Input id="profession" value={profession} onChange={(e) => setProfession(e.target.value)} required />
            </div>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div>
                <Label>Software Used</Label>
                <Select onValueChange={handleSoftwareChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select software" />
                    </SelectTrigger>
                    <SelectContent>
                        {softwareOptions.map((option) => (
                            <SelectItem
                                key={option}
                                value={option}
                            >
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="mt-2 flex flex-wrap gap-2">
                    {software.map((item) => (
                        <Badge key={item} variant="secondary" className="flex items-center space-x-1">
                            <span>{item}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                                onClick={() => handleSoftwareChange(item)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="coverImage">Cover Image</Label>
                <FileUploadArea
                    id="coverImage"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    inputRef={coverImageRef}
                    text="Browse an image or drag and drop here"
                    subtext="Max file size: 10MB"
                    preview={<ImagePreview file={coverImage} />}
                />
            </div>

            <div>
                <Label htmlFor="otherMedia">Other Media</Label>
                <FileUploadArea
                    id="otherMedia"
                    accept="image/*,video/*"
                    multiple={true}
                    onChange={(e) => setOtherMedia(Array.from(e.target.files || []))}
                    inputRef={otherMediaRef}
                    text="Browse images and videos or drag and drop here"
                    subtext="Max file size for images: 10MB each & for videos: 100MB each"
                    preview={<MultipleMediaPreview files={otherMedia} />}
                />
            </div>

            <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center space-x-2">
                    <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        ref={tagInputRef}
                        placeholder="Add a tag and press Enter"
                    />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                                onClick={() => removeTag(tag)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            </div>

            <Button type="submit" disabled={isAdding} className="w-full active:scale-95 transition-transform">
                {isAdding ? 'Adding creative...' : 'Add creative'}
            </Button>
        </form>
    )
}