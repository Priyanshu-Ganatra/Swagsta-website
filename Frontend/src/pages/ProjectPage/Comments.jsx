import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAddComment from "../../../hooks/useAddCommentOnProject";
import { ChevronDown, ChevronUp } from "lucide-react";
import LoginModal from "@/components/LoginModal";

function Comments({ id, comments, setComments, user, isLoginDialogOpen, setIsLoginDialogOpen }) {
    const { isAdding, addComment } = useAddComment();
    const [newComment, setNewComment] = useState("");
    const [shownComments, setShownComments] = useState(4);

    const handleAddComment = async () => {
        if (!user) {
            setNewComment("");
            setIsLoginDialogOpen(true);
            return;
        }
        if (newComment.trim()) {
            await addComment({
                text: newComment,
                projectId: id,
            }, setComments);
            setNewComment("");
        }
    };

    const handleShowMore = () => {
        setShownComments(shownComments + 4);
    };

    const handleShowLess = () => {
        setShownComments(4);
    };

    return (
        <div className="mt-6 space-y-6 mb-6">
            <h3 className="text-2xl font-bold">Comments</h3>
            <div className="space-y-4">
                <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full"
                />
                <Button onClick={handleAddComment} disabled={isAdding} className="disabled:cursor-not-allowed">
                    {isAdding ? "Adding..." : "Add Comment"}
                </Button>
            </div>
            <div className="space-y-4">
                {comments?.slice(0, shownComments)?.map((comment, i) => (
                    <div key={i} className="flex space-x-4">
                        <Avatar>
                            <AvatarImage src={comment?.userId?.pfp} alt="PFP" />
                            <AvatarFallback>PFP</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold">{user && comment?.userId?._id === user._id ? "You" : comment.userId.fullName}</h4>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            {comments?.length > shownComments ? (
                <Button onClick={handleShowMore} variant="ghost" className="w-full">
                    Show More Comments <ChevronDown />
                </Button>
            ) : (
                shownComments > 4 && (
                    <Button onClick={handleShowLess} variant="ghost" className="w-full">
                        Show Less <ChevronUp />
                    </Button>
                )
            )}

            <LoginModal isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen} />
        </div>
    );
}

export default Comments;
