import { Loader2 } from "lucide-react"

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
    )
}

export default LoadingOverlay