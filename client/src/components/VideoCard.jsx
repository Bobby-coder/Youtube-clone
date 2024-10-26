import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import fallbackImage from '../assets/img/video-placeholder.gif';
import getRelativeTimeString from "@/lib/helper/dateConverter";
import { formatViewCount } from "@/lib/helper/viewCountConverter";


export function VideoCard({ title, channel, thumbnail, uploaded, views, channelAvatar, id, channelId }) {
    return (
        <Card className="w-[350px] h-[300px] border-none shadow-none">
            <Link to={`/watch/${id}`}>
                <div className="w-full h-[196px] overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                        }}
                    />
                </div>
            </Link>
            
            <CardContent className="flex flex-row gap-2 h-[104px] overflow-hidden">
                <Avatar className="w-10 h-10 mt-1 flex-shrink-0 cursor-pointer">
                    <AvatarImage src={channelAvatar} />
                    <AvatarFallback>{channel.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col gap-1 overflow-hidden">
                    <Link to={`/watch/${id}`}>
                        <CardTitle className="text-sm font-medium font-openSans line-clamp-2 cursor-pointer">{title}</CardTitle>
                    </Link>
                    <div className="flex flex-col gap-0.5">
                        <CardDescription className="text-xs text-gray-500 cursor-pointer truncate">{channel}</CardDescription>
                        <div className="flex flex-row gap-1 text-xs text-gray-500">
                            <CardDescription>{formatViewCount(views)} views</CardDescription>
                            <CardDescription>•</CardDescription>
                            <CardDescription>{getRelativeTimeString(uploaded)}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
