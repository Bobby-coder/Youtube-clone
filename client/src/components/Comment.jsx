import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSelector } from "react-redux"
import axios from "axios"
import { useParams } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"


function Comment({ comment, refresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);
    const { videoId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user)
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/comment/delete/${comment._id}`,{ withCredentials: true });
            if (res.data.success) {
                console.log("Comment deleted");
                refresh();
            }
        } catch (error) {
            console.log(error);
            setError("Failed to delete comment");
        }
    }

    // Edit comment
    async function handleEdit() {
        try {
            setError(null);
            setLoading(true);
            if (commentText.trim() === "") {
                setError("Comment text cannot be empty");
                return;
            }
            const res = await axios.put(`http://localhost:8000/api/comment/edit/${videoId}`, { text: commentText, commentId: comment._id }, { withCredentials: true });
            if (res.data.success) {
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
            setError("Failed to edit comment");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex space-x-4 mb-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src={`http://localhost:8000/api/uploads/${comment.user.profilePicture}`} />
                <AvatarFallback>{comment.user.firstName.charAt(0).toUpperCase() + comment.user.lastName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold">{comment.user.firstName} {comment.user.lastName} <span className="font-normal text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span></p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {user && user._id === comment.user._id ? (
                                <>
                                    <DropdownMenuItem onClick={() => setIsEditing(true)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem>Report</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {isEditing ? (
                    <div className="flex flex-col space-y-2">
                        <Input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="border-b border-l-0 border-r-0 border-t-0 rounded-none px-0 w-full"
                        />
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button size="sm" onClick={() => {
                                handleEdit();
                            }} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                ) : (
                    <>
                    <p className="text-sm mb-1">{commentText}</p>
                    <div className="flex items-center mt-2 space-x-4 text-xs">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-1" onClick={() => {  
                            setIsLiked(!isLiked); setIsDisliked(false);
                        }}>
                            <ThumbsUp className={`h-3 w-3 mr-1 ${isLiked ? 'text-blue-500' : ''}`} />
                            <span>{isLiked ?  1 : 0}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-1" onClick={() => {
                            setIsDisliked(!isDisliked); setIsLiked(false);
                        }}>
                            <ThumbsDown className={`h-3 w-3 mr-1 ${isDisliked ? 'text-blue-500' : ''}`} />
                            
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-semibold p-1">
                            Reply
                        </Button>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Comment;