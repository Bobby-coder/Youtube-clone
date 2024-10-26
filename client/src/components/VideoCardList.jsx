import React, { useEffect } from 'react';
import {VideoCard} from '@/components/VideoCard';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const VideoCardList = () => {
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState(videos);
    const [loading, setLoading] = useState(true);
    const filterCategory = useSelector((state) => state.filter.filterCategory);
    const search = useSelector((state) => state.filter.search);
 
    useEffect(() => {
        if (filterCategory == "all") {
            setFilteredVideos(videos);
        } else {
            setFilteredVideos(videos.filter((video) => video.category == filterCategory));
        }
    }, [filterCategory, videos]);

    useEffect(() => {
        if (search == "") {
            setFilteredVideos(videos);
        } else {
            setFilteredVideos(videos.filter((video) => video.title.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, videos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://youtube-backend-eight.vercel.app/api/videos");
                setVideos(response.data.videos);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className='flex flex-row flex-wrap mt-20 ml-2 mr-2 lg:ml-20 gap-2 justify-center'>
            {filteredVideos.map((video) => (
                <VideoCard key={video._id} id={video._id} channelId={video.channel._id} title={video.title} channel={video.channel.name} thumbnail={video.thumbnailUrl} uploaded={video.createdAt.toString().slice(0, 10)} views={video.views} channelAvatar={video.channel.avatar} />
            ))}
        </div>
    );
}

export default VideoCardList;
