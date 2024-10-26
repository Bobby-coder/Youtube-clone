import Comment from "./Comment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

function CommentList({refresh, setCommentCount}) {
    const { videoId } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/comments/${videoId}`);
            const sortedComments = response.data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComments(sortedComments);
            setCommentCount(response.data.comments.length);
        } catch (error) {
            console.error("Error fetching comments:", error);
            if(error.response.status === 404){
                setCommentCount(0);
            }
            
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchComments();
    }, [videoId, refresh]);

    if (loading) {
        return <Loading />;
    }
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} refresh={refresh} />
      ))}
    </div>
  );
}
export default CommentList;