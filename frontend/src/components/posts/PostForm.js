import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    form.append("text", text);

    addPost(form);
    setTitle("");
    setImage();
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          type="text"
          name="title"
          placeholder="Your post title ...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="upload-btn-wrapper">
          <button className="upload-btn">Upload a file</button>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />{" "}
          <label className="upload-btn-wrapper-label">
            Browse Your Post Image
          </label>
        </div>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostForm);
