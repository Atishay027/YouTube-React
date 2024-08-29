import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../Constant/youtube";
import Avatar from "react-avatar";
import { AiFillLike } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { AiFillDislike } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/ChatSlice";

const Watch = () => {
  const [input, setInput] = useState(""); //for live chat
  const [singleVideo, setSingleVideo] = useState(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  // console.log("video id = ", videoId);
  const [ytIcons, setYtIcons] = useState(""); //to show icons for single video or play

  const dispatch = useDispatch();

  const channelId = async () => {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      const snippet = response?.data?.items[0]?.snippet;
      if (snippet) {
        const channelId = snippet.channelId;
        const channelResponse = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
        );
        const profilePictureUrl =
          channelResponse?.data?.items[0]?.snippet?.thumbnails?.default?.url;
        console.log("Profile Picture URL: ", profilePictureUrl);
        setYtIcons(profilePictureUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);
      //console.log("response data-: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    dispatch(
      setMessage({
        name: "Atishay",
        message: input,
      })
    );
    setInput("");
  };

  useEffect(() => {
    getSingleVideo();
    channelId();
  }, []);

  return (
    <div className="ml-4 mt-2 flex flex-wrap w-[100%]">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-[70%]">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <h1 className="font-bold mt-2 text-lg">
            {singleVideo?.snippet?.title}
          </h1>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex items-center w-full lg:w-[85%] mb-4 lg:mb-0">
              <div className="flex items-center">
                <Avatar
                  className="cursor-pointer"
                  src={ytIcons}
                  size={35}
                  round={true}
                />
                <h1 className="font-bold ml-2">
                  {singleVideo?.snippet?.channelTitle}
                </h1>
              </div>
              <button className="px-4 py-1 font-medium bg-black text-white rounded-full ml-4">
                Subscribe
              </button>
            </div>
            <div className="flex justify-between items-center w-full lg:w-[38%] mt-2 lg:mt-0">
              <div className="flex cursor-pointer bg-gray-200 px-2 py-3 rounded-full">
                <AiFillLike size="20px" className="mr-3 ml-2" />
                <AiFillDislike size="20px" className="mr-2" />
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 rounded-full px-3 py-2">
                <FaShareAlt size="20px" />
                Share
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 rounded-full px-3 py-2">
                <FaDownload size="20px" />
                Download
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%]  border border-gray-700 ml-0 lg:ml-5 rounded-lg h-fit p-4">
          <div className="flex items-center justify-between">
            <h1>Live Chat</h1>
            <BsThreeDotsVertical />
          </div>
          <div className="overflow-y-auto h-[31rem] flex flex-col-reverse">
            <LiveChat />
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <div className="flex items-center w-full">
              <Avatar
                className="cursor-pointer"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedhsAofqDCJPTumMvVpODgSESIfBIZGtmhsvO3yb5BA&s"
                size={35}
                round={true}
              />
              <input
                value={input}
                className="border-b border-gray-800 outline-none ml-2 w-full"
                type="text"
                placeholder="Send Message..."
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="bg-gray-300 p-2 rounded-full ml-2">
                <IoSend
                  onClick={sendMessage}
                  className="cursor-pointer"
                  size="20px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;