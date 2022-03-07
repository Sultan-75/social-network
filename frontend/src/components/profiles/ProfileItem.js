import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt={name} />
      <div>
        <h2>{name}</h2>
        <p>Developer at {company}</p>
        <p>{location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills &&
          skills.map((skill) => (
            <li key={skill} className="text-primary">
              <i className="fas fa-check"></i> {skill}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
