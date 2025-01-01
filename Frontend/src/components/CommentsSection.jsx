/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAddComment from "../../hooks/useAddCommentOnCreative"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useSelector } from "react-redux"

const CommentsSection = ({ setComments, comments, id: creativeId, className }) => {
    let { user } = useSelector((state) => state.auth)
    const { isAdding, addComment } = useAddComment()
    const [text, setText] = useState('')
    const [visibleCount, setVisibleCount] = useState(4) // State to track visible comments

    const handleSubmit = async () => {
        await addComment({
            text,
            creativeId
        }, setComments)
        setText('')
    }

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 4) // Load 4 more comments
    }

    return (
        <div className={`w-full mx-auto bg-[#202024] text-gray-300 p-4 rounded-lg ${className}`}>
            <h2 className="text-sm font-semibold mb-4 text-gray-400">
                {comments.length > 0 ? `${comments.length} COMMENT${comments.length > 1 ? 'S' : ''}` : 'Be the first one to comment here!'}
            </h2>
            <div className="space-y-4">
                {
                    comments.slice(0, visibleCount).map((comment, i) => (
                        <div key={i} className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.userId.pfp} alt="PFP" />
                                <AvatarFallback>PFP</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm">{user && comment.userId._id === user._id ? "You" : comment.userId.fullName}</h3>
                                </div>
                                <p className="mt-1 text-sm">{comment.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {comments.length > visibleCount && (
                <Button
                    className="w-full mt-4 text-gray-400 hover:text-white hover:bg-[#2a2a2a] text-sm font-normal justify-start px-2"
                    onClick={handleLoadMore}
                >
                    Load More Comments
                </Button>
            )}
            <div className="mt-4 flex space-x-2">
                <Input
                    className="flex-1 bg-[#2a2a2a] border-none text-gray-300 text-sm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment"
                />
                <Button className="bg-[#4a96d6] hover:bg-[#3a86c6] px-3" disabled={isAdding} onClick={handleSubmit}>
                    {isAdding ? <span className="loading loading-spinner loading-xs"></span> : <ArrowRight className="scale-75" />}
                </Button>
            </div>
        </div>
    )
}

export default CommentsSection