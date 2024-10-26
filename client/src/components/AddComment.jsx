import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddComment({refresh}) {
    const [newComment, setNewComment] = useState('');
    const user = useSelector((state) => state.user.user);
    const {videoId} = useParams();
    console.log("videoId",videoId);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
    
        try {
          const response = await axios.post(`http://localhost:8000/api/comment/create/${videoId}`, {
            text: newComment
          }, {withCredentials: true});
          if (response.data.success) {
            console.log("Comment submitted successfully");
            setNewComment('');
            refresh();
          }
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      };
    return (
        <form onSubmit={handleCommentSubmit} className="mb-6">
               <div className="flex items-center space-x-4">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={``} />
                   <AvatarFallback>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                 </Avatar>
                 <Input
                   type="text"
                   placeholder="Add a comment..."
                   value={newComment}
                   onChange={(e) => setNewComment(e.target.value)}
                   className="flex-grow"
                 />
                 <Button type="submit" disabled={!newComment.trim()}>
                   Comment
                 </Button>
               </div>
             </form>
    )
}
export default AddComment;