import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  auth,
  deleteComment,
  comment: { _id, user, name, avatar, text, date },
  postId,
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
        <p className="my-1 comment-text">{text}</p>
        <p className="post-date">
          Commented on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
