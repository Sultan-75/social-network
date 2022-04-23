import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { generatePublicUrl } from "../../urlConfig";

const PostItem = ({
  post: { text, title, image, name, avatar, date, user },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div className="post-img">
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div className="post-content">
        <h3 className="my-1">{title}</h3>
        <p className="my-1">{text}</p>
        <img className="comtent-img" src={generatePublicUrl(image)} alt="" />
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

export default PostItem;
