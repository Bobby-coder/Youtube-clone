import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import fallbackImage from "../assets/img/video-placeholder.gif";
import EditVideoModal from "@/components/EditVideoModal";
import { Link } from "react-router-dom";
import axios from "axios";
export default function VideoCardwithOptions({ video }) {
    const [open, setOpen] = useState(false);
    const [editVideo, setEditVideo] = useState(null);
    
    const handleDelete = async () => {
        try {
           const response = await axios.delete(`http://localhost:8000/api/videos/delete/${video._id}`, {withCredentials: true});
           if (response.data.success) {
            window.location.reload();
           }
        } catch (error) {
            console.log("error in deleting video", error);
        }
    }
    return (
        <>
            <EditVideoModal open={open} setOpen={setOpen} video={editVideo}/>
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md relative">
                <Link to={`/watch/${video._id}`}>
                    <div className="aspect-video bg-muted">
                        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                    }} />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                        {video.views} views • {video.createdAt.toString().split("T")[0]}
                    </p>
                </div>
                </Link>
                <div className="absolute bottom-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setEditVideo(video); setOpen(true) }}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}