import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import GitHubRepos from "./GitHubRepos";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const params = useParams();
  useEffect(() => {
    getProfileById(params.id);
  }, [getProfileById, params.id]);

  return (
    <section className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" class="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                  />
                ))
              ) : (
                <h4>No Experience</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))
              ) : (
                <h4>No Education</h4>
              )}
            </div>

            {profile.githubusername && (
              <GitHubRepos username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
