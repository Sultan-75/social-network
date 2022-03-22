import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
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
      {loading || post === null ? <Spinner /> : <PostItem post={post} />}
    </section>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
