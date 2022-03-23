import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import PostItem from "./PostItem";

const Post = ({ getPost, post: { post, loading } }) => {
  const params = useParams();

  useEffect(() => {
    getPost(params.id);
  }, [getPost, params.id]);

  return (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <>
          <PostItem post={post} />
          <CommentForm postId={post._id} />
          <div className="comments">
            {post.comments.length > 0 &&
              post.comments.map((comment) => (
                <CommentItem
                  postId={post._id}
                  key={comment._id}
                  comment={comment}
                />
              ))}
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
