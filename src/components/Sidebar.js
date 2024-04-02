import React from "react";
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdPodcasts } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { useSelector } from "react-redux";
import { FaHistory } from "react-icons/fa";
import { CgPlayListSearch } from "react-icons/cg";
import { BiSolidVideos } from "react-icons/bi";
import { MdWatchLater } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { HiTrendingUp } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdReport } from "react-icons/md";
import { MdHelpCenter } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { SiApplepodcasts } from "react-icons/si";
import { FaNewspaper } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";

const SidebarItem = [
  {
    icons: <CiHome size="30px" />,
    title: "Home",
  },
  {
    icons: <SiYoutubeshorts size="30px" />,
    title: "Shorts",
  },
  {
    icons: <MdOutlineSubscriptions size="30px" />,
    title: "Subcriptions",
  },
  {
    icons: <GrChannel size="30px" />,
    title: "Your Channel",
  },
  {
    icons: <FaHistory size="30px" />,
    title: "history",
  },
  {
    icons: <CgPlayListSearch size="30px" />,
    title: "Playlists",
  },
  {
    icons: <BiSolidVideos size="30px" />,
    title: "Your Videos",
  },
  {
    icons: <MdWatchLater size="30px" />,
    title: "Watch Later",
  },
  {
    icons: <BiSolidLike size="30px" />,
    title: "Liked Videos",
  },
  {
    icons: <HiTrendingUp size="30px" />,
    title: "Trending",
  },
  {
    icons: <FaYoutube size="30px" />,
    title: "Youtube  Premium",
  },
  {
    icons: <MdLocalMovies size="30px" />,
    title: "Movies",
  },
  {
    icons: <MdLiveTv size="30px" />,
    title: "Live",
  },
  {
    icons: <MdOutlineSubscriptions size="30px" />,
    title: "Gaming",
  },
  {
    icons: <FaNewspaper size="30px" />,
    title: "News",
  },
  {
    icons: <MdOutlineSportsBasketball size="30px" />,
    title: "Sports",
  },
  {
    icons: <SiApplepodcasts size="30px" />,
    title: "Podcats",
  },
  {
    icons: <IoMdSettings size="30px" />,
    title: "Settings",
  },
  {
    icons: <MdReport size="30px" />,
    title: "Report History",
  },
  {
    icons: <MdHelpCenter size="30px" />,
    title: "Help",
  },
  {
    icons: <MdFeedback size="30px" />,
    title: "Send Feedback",
  },
];

const Sidebar = () => {
  // we want the value of toggle that is present in Navbar to be used here so with hwlp of redux we acces that value
  const toggle = useSelector((store) => store.app.open);
  //console.log(toggle);
  return (
    <div
      className={`relative left-0  ${
        toggle ? "w-[20%]" : "w-[10%]"
      } pr-3 ml-4 mt-3 h-[calc(100vh-4.625rem)] bg-white overflow-y-scroll overflow-x-hidden`}
    >
      {SidebarItem.map((item, index) => {
        return (
          <div key={index} className=" ml-2 my-3 flex ">
            {item.icons}
            <h1 className={`ml-3 flex items-center ${toggle ? "" : "hidden"}`}>
              {item.title}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
