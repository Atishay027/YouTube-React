import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchSuggestion,
  toggleSidebar,
} from "../utils/AppSlice";
import { SEARCH_SUGGESTIONS_API } from "../Constant/youtube";
import axios from "axios";

const Navbar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);
  const [suggestion, setSuggestion] = useState(false);

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };
  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };
  // console.log(toggle);

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
      // console.log(res.data[1]);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  const selectSuggestion = (selectedText) => {
    setInput((prevInput) => selectedText);
    setSuggestion(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      //Use Debounching for live projetc
      showSuggestion();
    }, 200);
    return () => clearTimeout(timer);
  }, [input]);

  const openSuggestion = () => {
    setSuggestion(true);
  };

  return (
    <div className="flex fixed top-0 w-[100%] z-10  bg-white">
      <div className="px-5 py-1 w-[96%] flex justify-between ">
        <div className="flex items-center">
          <GiHamburgerMenu
            onClick={toggleHandler}
            size="24px"
            className="cursor-pointer"
          />
          <img
            className="px-3"
            width={"135px"}
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
            alt="yt-logo"
          />
        </div>

        <div className="w-[40%] flex items-center">
          <div className="flex w-[100%]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className=" w-full outline-none py-2 px-4 border border-gray-400 rounded-l-full "
              type="text"
              placeholder="Search"
              onFocus={openSuggestion}
            ></input>

            <button
              className="py-2 px-4 border border-gray-400  rounded-r-full "
              onClick={searchVideo}
            >
              <CiSearch size="24px" />
            </button>
          </div>
          {suggestion && searchSuggestion.length !== 0 && (
            <div className="absolute top-3 z-50 w-[33.5%] py-5 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, idx) => {
                  return (
                    <div className="px-4 flex items-center hover:bg-gray-100">
                      <CiSearch size="24px" />
                      <li
                        onClick={() => selectSuggestion(text)}
                        key={idx}
                        className="px-2 py-1 cursor-pointer text-md font-medium"
                      >
                        {text}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex w-[10%] justify-between items-center">
          <IoIosNotifications className="cursor-pointer" size={24} />
          <FaVideo className="cursor-pointer" size={22} />

          <Avatar
            className="cursor-pointer"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedhsAofqDCJPTumMvVpODgSESIfBIZGtmhsvO3yb5BA&s"
            size={35}
            round={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
