import React, { useEffect } from "react";
import { Users, Video, Camera } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import banner from "../assets/img/banner.jpg";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import CreateChannelDialog from "@/components/CreateChannel";
import VideoCardwithOptions from "@/components/VideoCardwithOptions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";





const OwnChannelPage = () => {
  const { user } = useSelector((state) => state.user);
  const isloggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchChannel = async () => {

      try {
        const response = await axios.get(`http://localhost:8000/api/channel`, { withCredentials: true });
        setChannel(response.data.channel);
        console.log(response.data.channel);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchChannel();
  }, [user, dispatch]);

  //fetch chnnel videos
  const fetchChannelVideos = async () => {
    try {
      setLoading(true);
      console.log(channel._id);
      const response = await axios.get(`http://localhost:8000/api/videos/channel/${channel._id}`, { withCredentials: true });
      if (response.data.success) {
        setVideos(response.data.videos);
      }
      console.log(response.data);
      console.log(
        "videos", videos
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (channel) {
      fetchChannelVideos();
    }
  }, [channel]);

  if(!isloggedIn){
    return (
      <div className="bg-background text-foreground mt-16 ml-0 lg:ml-10 text-center">
        
      <h1 className="text-4xl font-bold"> Please Login to view your channel</h1>
      <Link to="/sign-in">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 my-3">
          Login
        </button>
      </Link>
      <Link to="/sign-up">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 my-3">
          Signup
        </button>
      </Link>

      </div>
    )
  }

  const handleBannerChange = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('banner', file);
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/upload/banner/${channel._id}`, formData, { withCredentials: true });
      if(response.data.success){
        window.location.reload();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  if(!channel){
    return (
      <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-4xl">Channel does not exist please create one.</h1>
      </div>
    )
  }

  return (
    <>
    <div className="bg-background text-foreground mt-16 ml-0 lg:ml-10">
      {/* Channel Banner */}
      <div className={`w-[95%] h-40 md:h-56 lg:h-64 relative rounded-xl`}>
        {channel?.channelBanner ? (
          <img
            src={channel.channelBanner}
            alt={`${channel?.channelName} banner`}
            className="w-full h-full object-cover rounded-xl mx-10"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl mx-10">
            <label htmlFor="banner-upload" className="cursor-pointer">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-600">
                  Upload Channel Banner
                </span>
              </div>
              <input
                id="banner-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {handleBannerChange(e)}}
              />
            </label>
          </div>
        )}
      </div>

      {/* Channel Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
            <img
              src={channel?.avatar}
              alt={channel?.channelName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://api.dicebear.com/6.x/initials/svg?seed=${channel?.channelName}`;//default avatar
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{channel?.channelName}</h1>
            <p className="text-muted-foreground">@{channel?.channelId}</p>
            <p className="mt-2">
              <span className="font-semibold">
                {channel?.subscribers.toLocaleString()}
              </span>{" "}
              subscribers •{" "}
              <span className="font-semibold">{videos.length}</span> videos
            </p>
            <button className="flex items-center space-x-2 mt-3 bg-button-bg text-button-foreground px-4 py-2 rounded-full hover:bg-button-hover transition-colors">

              <span>Customize channel</span>
            </button>
          </div>
          <div className="flex-grow"></div>

        </div>
      </div>
      
      {/* Channel Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 min-h-screen">
        <Tabs defaultValue="home">
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Latest Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCardwithOptions key={video._id} video={video}/>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="playlists">{/* Playlists content */}</TabsContent>
          <TabsContent value="community">{/* Community content */}</TabsContent>
          <TabsContent value="about">
            <div className="mt-6 max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p>{channel?.description ? channel?.description : "No description"}</p>
              <div className="mt-6 flex items-center space-x-4">
                <Users size={20} className="text-muted-foreground" />
                <span>{channel?.subscribers.toLocaleString()} subscribers</span>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <Video size={20} className="text-muted-foreground" />
                <span>{channel?.videos.length} videos</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
    </div>
    </>
  );
};

export default OwnChannelPage;
