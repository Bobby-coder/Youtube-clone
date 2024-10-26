import { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SuggestedVideo from "@/components/SuggestedVideo";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import CommentList from "@/components/CommentList";
import AddComment from "@/components/AddComment";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import getRelativeTimeString from "@/lib/helper/dateConverter";

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const isloggedin = useSelector((state) => state.user.isLoggedIn);
  const [setFetchTrigger] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [channelData, setChannelData] = useState(null);
  //fetch video data
  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/videos/${videoId}`
      );
      setVideoData(response.data.video);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(channelData);

  //fetch suggested videos
  const fetchSuggestedVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/videos`);
      if (response.data.success) {
        setSuggestedVideos(response.data.videos);
      }
    } catch (error) {
      console.error("Error fetching suggested videos:", error);
    }
  };

  const fetchChannelData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/channelbyid/${videoData.channel._id}`
      );
      if (response.data.success) {
        setChannelData(response.data.channel);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchSuggestedVideos();
  }, [videoId]);

  useEffect(() => {
    if (videoData) {
      fetchChannelData();
    }
  }, [videoData]);

  //whenever this function is called, it will trigger a re-fetch of the comments
  function refreshComments() {
    setFetchTrigger((prev) => !prev);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-background text-foreground mt-5">
      <div className="max-w-[1280px] mx-auto px-4 py-6 lg:py-8 lg:flex lg:space-x-6">
        {/* Video Player and Info */}
        <div className="lg:w-2/3">
          {/* Video Player */}
          <div className="aspect-video bg-black mb-4">
            {videoData.assetUrl ? (
              <ReactPlayer
                url={videoData.assetUrl}
                width="100%"
                height="100%"
                controls
                playing={true}
                stopOnUnmount={false}
              />
            ) : (
              <img
                src={videoData.thumbnailUrl}
                alt={videoData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/640x360?text=Video+Thumbnail";
                }}
              />
            )}
          </div>

          {/* Video Title */}
          <h1 className="text-xl font-bold mb-2">{videoData.title}</h1>

          {/* Channel Info, Video Stats and Actions */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <Link to={`/channel/${channelData?.channelId}`}>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={videoData.channel.avatar} />
                  <AvatarFallback>
                    {videoData?.channel?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{videoData.channel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {channelData?.subscribers} subscribers
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Button>Subscribe</Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className={`mr-2 h-4 w-4`} />
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className={`mr-2 h-4 w-4`} />{" "}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Video Description with Stats */}
          <div className="bg-secondary p-4 rounded-lg mb-6">
            <div className="text-muted-foreground text-sm mb-2">
              {videoData.views.toLocaleString()} views •{" "}
              {getRelativeTimeString(videoData.createdAt)}
            </div>
            <p>{videoData.description}</p>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="font-semibold mb-4">{commentCount} Comments</h3>

            {/* New Comment Form */}
            {isloggedin && <AddComment refresh={refreshComments} />}

            {/* Existing Comments */}
            <CommentList
              refresh={refreshComments}
              setCommentCount={setCommentCount}
            />
          </div>
        </div>

        {/* Suggested Videos */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <h2 className="font-semibold mb-4">Suggested Videos</h2>

          {suggestedVideos.map((i) => (
            <SuggestedVideo
              key={i._id}
              videoId={i._id}
              tittle={i.title}
              channel={i.channel.name}
              views={i.views}
              uploaded={i.createdAt}
              thumbnailUrl={i.thumbnailUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
