import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaWhatsapp, FaBehance } from 'react-icons/fa'
import { IoCloseSharp } from "react-icons/io5"
import { CiImageOn } from "react-icons/ci"

const socialIcons = {
    facebook: <FaFacebook className="h-5 w-5" />,
    instagram: <FaInstagram className="h-5 w-5" />,
    twitter: <FaTwitter className="h-5 w-5" />,
    linkedin: <FaLinkedin className="h-5 w-5" />,
    youtube: <FaYoutube className="h-5 w-5" />,
    whatsapp: <FaWhatsapp className="h-5 w-5" />,
    behance: <FaBehance className="h-5 w-5" />,
}

export default function AboutUsForm() {
    const [formData, setFormData] = useState({
        text: '',
        img: null,
        socials: {}
    })
    const imgRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSocialChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            socials: { ...prev.socials, [name]: value }
        }))
    }

    const toggleSocial = (name) => {
        setFormData(prev => {
            const newSocials = { ...prev.socials }
            if (name in newSocials) {
                delete newSocials[name]
            } else {
                newSocials[name] = ''
            }
            return { ...prev, socials: newSocials }
        })
    }

    const handleImgChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setFormData(prev => ({ ...prev, img: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setFormData(prev => ({ ...prev, img: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        // Here you would typically send the data to your backend
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-card rounded-lg shadow">
            <div className="space-y-2">
                <Label htmlFor="text">Edit About Us Text</Label>
                <Textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="img">Edit About Us Cover Image</Label>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                    onClick={() => imgRef.current.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <Input
                        id="img"
                        name="img"
                        type="file"
                        accept="image/*"
                        ref={imgRef}
                        onChange={handleImgChange}
                        className="hidden"
                    />
                    <CiImageOn className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Select an image, or drag and drop here</p>
                </div>
                {formData.img && (
                    <div className="relative w-full mt-2">
                        <IoCloseSharp
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-6 h-6 cursor-pointer"
                            onClick={() => {
                                setFormData(prev => ({ ...prev, img: null }))
                                imgRef.current.value = null
                            }}
                        />
                        <img src={formData.img} alt="Uploaded" className="w-full mx-auto object-contain rounded" />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <Label>Edit/Add Social Media Links</Label>
                <div className="space-y-2">
                    {Object.entries(formData.socials).map(([name, value]) => (
                        <div key={name} className="flex items-center space-x-2 w-full">
                            {socialIcons[name]}
                            <Input
                                type="text"
                                value={value}
                                onChange={(e) => handleSocialChange(name, e.target.value)}
                                placeholder={`${name} link`}
                                className="flex-grow"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSocial(name)}
                            >
                                <IoCloseSharp className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(socialIcons).map(([name, icon]) => (
                            !formData.socials.hasOwnProperty(name) && (
                                <Button
                                    key={name}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleSocial(name)}
                                >
                                    {icon}
                                    <span className="ml-2">Add {name}</span>
                                </Button>
                            )
                        ))}
                    </div>
                </div>
            </div>

            <Button type="submit" className="w-full">Save About Us</Button>
        </form>
    )
}