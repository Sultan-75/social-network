import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  deleteComment,
  comment: { _id, user, name, avatar, text, date },
  postId,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
      <button onClick={() => deleteComment(postId, _id)}>Delete</button>
    </div>
  );
};

export default connect(null, { deleteComment })(CommentItem);
