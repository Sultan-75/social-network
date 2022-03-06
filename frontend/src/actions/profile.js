import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
import { setAlert } from "./alert";

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// Create or update user profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile updated" : "Profile created"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

// Add Experience in user profile
export const addExperience = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Add", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Education in user profile
export const addEducation = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) =>
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            errormsg: error.msg,
            errid: error.param,
          },
        })
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? That can be undone!")) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? That can be undone!")) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
