/* eslint-disable react/prop-types */
import { ImageIcon, X } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function ImageUpload({ id, image, setFormData }) {
    const handleImageUpload = (event, imageType) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    [imageType]: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-2">
            <Label>{id === "primaryImage" ? "Primary Image" : "Secondary Image"}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
                <input
                    type="file"
                    id={id}
                    name={id}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, id)}
                />
                {image ? (
                    <div className="relative">
                        <img src={image} alt="Uploaded image" className="max-w-full h-auto mx-auto" />
                        <button
                            onClick={() => setFormData(prevData => ({ ...prevData, [id]: null }))}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <label htmlFor={id} className="cursor-pointer">
                        <div className="flex flex-col items-center">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-500">Browse an image or drag and drop here</span>
                            <span className="mt-1 text-xs text-gray-400">Max file size: 10MB</span>
                        </div>
                    </label>
                )}
            </div>
        </div>
    )
}
