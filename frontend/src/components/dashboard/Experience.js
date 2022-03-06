import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ deleteExperience, experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Present"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      {experiences.length === 0 ? (
        "Empty"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </>
  );
};

export default connect(null, { deleteExperience })(Experience);
