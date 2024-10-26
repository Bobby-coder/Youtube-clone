import React, { useEffect } from "react";
import { Users, Video, Bell, ThumbsUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import banner from "../assets/img/banner.jpg";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { VideoCard } from "@/components/VideoCard";
import Loading from "@/components/Loading";

const ChannelPage = () => {
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isnotfound, setIsnotfound] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((state) => state.user.user);
  const params= useParams();

  //fetch channel data
  const fetchChannelData = async () => {
    setIsloading(true);
    try {
      if (!params.handle) {
        console.error('No channel handle available');
        return;
      }
      const response = await axios.get(`http://localhost:8000/api/channel/${params.handle}`, { withCredentials: true });
      setData(response.data.channel);
      setIsnotfound(false);
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status === 404){
        setIsnotfound(true);
      }
      console.error('Error fetching channel data:', error);
    }finally{
      setIsloading(false);
    }
  };
  //fetch chnnel videos
  const fetchChannelVideos = async () => {
    try {
      setIsloading(true);
      if(!data){
        console.error("No channel selected");
        return;
      }
      console.log(data._id);
      const response = await axios.get(`http://localhost:8000/api/videos/channel/${data._id}`, { withCredentials: true });
      if(response.data.success){
        setVideos(response.data.videos);
      }
      console.log(response.data);
      console.log(
        "videos",videos
      );
    } catch (error) {
      console.log(error);
    }finally{
      setIsloading(false);
    }
  };
  
  useEffect(() => {
   
    if(params.handle){
      fetchChannelData();
    }
  }, [params.handle]);

  useEffect(() => {
    if(data){
      fetchChannelVideos();
      setIsSubscribed(data.subscribedBy.includes(user._id));
    }

  }, [data]);


  //handle subscribe button
  const handleSubscribeClick = async () => {
    try {
      if(!data){
        console.error("No channel selected");
        return;
      }
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let response;
      if (isSubscribed) {
        response = await axios.post(`http://localhost:8000/api/channel/unsubscribe/${data._id}`, {}, config);
      } else {
        response = await axios.post(`http://localhost:8000/api/channel/subscribe/${data._id}`, {}, config);
      }

      if (response.data.success) {
        setIsSubscribed(prev => !prev);
      }
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  if(isnotfound){
    return <div className="bg-background text-foreground mt-32 ml-0 lg:ml-10 text-center text-2xl font-bold">Channel not found</div>;
  }
  if(isloading){
    return <Loading/>;
  }
  return (
    <div className="bg-background text-foreground mt-24 ml-0 lg:ml-10">
      {/* Channel Banner */}
     {data?.channelBanner && (
        <div className={`w-[95%] h-40 md:h-56 lg:h-64 relative rounded-xl`}>
        <img
          src={data?.channelBanner}
          alt={`${data?.channel} banner`}
          className="w-full h-full object-cover rounded-xl mx-10"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = banner;
          }}
        />
      </div>
     )}

      {/* Channel Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background">
            <img
              src={data?.avatar}
              alt={data?.channelName}
              className="w-full h-full object-cover"
              onError={(e)=>{
                e.target.onError =null
                e.target.src =`https://api.dicebear.com/6.x/initials/svg?seed=${data?.channelName}`
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{data?.channelName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-muted-foreground">@{data?.channelId}</p>
              <span className="text-muted-foreground">•</span>
              <p>
                <span className="font-semibold">{data?.subscribers.toLocaleString()}</span> subscribers
              </p>
              <span className="text-muted-foreground">•</span>
              <p>
                <span className="font-semibold">{videos?.length}</span> videos
              </p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {data?.description ? data.description : "No description"}
            </p>
            <button onClick={handleSubscribeClick} className={`flex items-center space-x-2 mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors ${isSubscribed ? "!bg-gray-800 text-white" : ""}`}>
              <Bell size={20} />
              <span>{isSubscribed ? "Unsubscribe" : "Subscribe"}</span>
            </button>
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
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
              {videos && videos?.map((video) => (
                <VideoCard
                  key={video._id}
                  title={video.title}
                  channel={video.channel.name}
                  thumbnail={video.thumbnailUrl}
                  uploaded={video.createdAt.toString().split("T")[0]}
                  views={video.views}
                  channelAvatar={video.channel.avatar}
                  id={video._id}
                />
              ))}
            </div>
          </TabsContent>
         
          <TabsContent value="playlists">{/* Playlists content */}</TabsContent>
          <TabsContent value="community">{/* Community content */}</TabsContent>
          <TabsContent value="about">
            <div className="mt-6 max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p>{data?.description ? data?.description : "No description"}</p>
              <div className="mt-6 flex items-center space-x-4">
                <Users size={20} className="text-muted-foreground" />
                <span>{data?.subscribers.toLocaleString()} subscribers</span>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <Video size={20} className="text-muted-foreground" />
                <span>{data?.videos.length} videos</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};


export default ChannelPage;
