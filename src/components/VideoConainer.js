import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, YOUTUBE_VIDEO_API } from "../Constant/youtube";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/AppSlice";

const VideoConainer = () => {
  //const   [videoList, setVideoList] = useState([]);
  const { video, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  // Fetch data from Youtube api when the component is mounted.
  const fetchingYTVideo = async () => {
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
      //setVideoList(res?.data?.items)
      //console.log(res?.data?.items);
      dispatch(setHomeVideo(res?.data?.items));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideoByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`
      );
      //console.log(res.data.items);
      dispatch(setHomeVideo(res?.data?.items));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (category === "All") {
      fetchingYTVideo();
    } else {
      fetchVideoByCategory(category);
    }
  }, [category]);

  return (
    <div className="grid grid-cols-3 gap-3 ">
      {video.map((item) => {
        return (
          <Link
            to={`/watch?v=${
              typeof item.id === "object" ? item.id.videoId : item.id
            }`}
            key={typeof item.id === "object" ? item.id.videoId : item.id}
          >
            <VideoCart items={item} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoConainer;
