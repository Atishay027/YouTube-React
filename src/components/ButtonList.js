import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/AppSlice";

const buttonLists = [
  "All",
  "JavaScript",
  "ReactJS",
  "Music",
  "Data Structure",
  "Java",
  "Stocks",
  "Vlogs",
  "C++",
  "News",
  "technology",
  "Programming",
  "Trending",
  "Comedy",
  "Thriller",
  "New to you",
  "Podcasts",
  "Cars",
  "Recently uploaded",
];

const ButtonList = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();
  const videoBytag = (tag) => {
    if (active !== tag) {
      setActive(tag);
      dispatch(setCategory(tag));
    }
  };
  return (
    <div className="w-full flex overflow-x-scroll no-scrollbar my-2 ">
      {buttonLists.map((buttonName, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => {
                videoBytag(buttonName);
              }}
              className={`${
                active === buttonName
                  ? "bg-slate-800 text-white"
                  : "bg-gray-200"
              } border-gray-800w-fit font-medium border rounded-md cursor-pointer mx-1 px-2 py-2`}
            >
              <span className="whitespace-nowrap">{buttonName}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonList;
