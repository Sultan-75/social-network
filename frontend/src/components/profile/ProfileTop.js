import React from "react";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    social,
    company,
    location,
    website,
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt={name} />
      <h1 className="large">{name}</h1>
      <p className="lead">Developer at {company && company}</p>
      <p>{location && location}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        <a
          href={social ? social.twitter : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a
          href={social ? social.facebook : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a
          href={social ? social.linkedin : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a
          href={social ? social.youtube : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube fa-2x"></i>
        </a>
        <a
          href={social ? social.instagram : "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default ProfileTop;
