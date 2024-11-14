/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card"

export default function Tags({ data, className }) {
    return (
        <Card className={`bg-[#202024] p-4 w-full ${className}`}>
            <h2 className="text-gray-200 text-lg font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {data?.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-[#404044] hover:bg-[#58585e] hover:cursor-pointer text-gray-300 px-2 py-1 rounded-md text-xs font-semibold"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Card>
    )
}