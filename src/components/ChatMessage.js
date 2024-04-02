import React from "react";
import Avatar from "react-avatar";

const ChatMessage = ({item}) => {
  return (
    <div className="flex items-center">
      <div>
        <Avatar
          className="cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedhsAofqDCJPTumMvVpODgSESIfBIZGtmhsvO3yb5BA&s"
          size={28}
          round={true}
        />
      </div>
      <div className="flex items-center">
        <h1 className="ml-2 font-bold text-sm">{item.name}</h1>
        <p className="ml-2 py-2 text-sm">{item.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
