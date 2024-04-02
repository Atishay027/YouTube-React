import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { API_KEY } from "../Constant/youtube";

const VideoCart = ({ items }) => {
  const [ytIcon, setYtIcon] = useState("");
  const channelName = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${items.snippet.channelId}&key=${API_KEY}`
      );
      //console.log(res);
      setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    channelName();
  }, []);
  return (
    <div className="w-94 cursor-pointer my-2">
      <img
        className="w-full rounded-xl flex items-center"
        src={items.snippet.thumbnails.high.url}
        alt="YTVideo"
      ></img>
      <div>
        <div className="flex mt-2">
          <Avatar
            className="cursor-pointer"
            src={ytIcon}
            size={35}
            round={true}
          />
          <div className=" ml-2">
            <h1 className="font-bold">{items.snippet.title}</h1>
            <p className="text-sm text-gray-500">
              {" "}
              {items.snippet.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
