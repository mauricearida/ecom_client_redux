import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { Link, useHistory } from "react-router-dom";

import { isAuthenticated } from "../helpers/auth";
import { ShowErrorMsg, ShowSuccessMsg } from "../helpers/message";
import { ShowLoading } from "../helpers/loading";
import { signup } from "../api/auth";
import "./App.css";

const Signup = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    errorMsg,
    successMsg,
    loading,
  } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errorMsg: "",
      successMsg: "",
    });

    //console.log("event", event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({
        ...formData,
        loading: true,
      });

      signup(data)
        .then((response) => {
          console.log("axios signup success", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("axios signup error", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="row px-4 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && ShowSuccessMsg(successMsg)}
          {errorMsg && ShowErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{ShowLoading()}</div>}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {/* username */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                name="username"
                value={username}
                className="form-control"
                placeholder="Username"
                type="text"
                onChange={handleChange}
              />
            </div>

            {/* email */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <input
                id="email"
                name="email"
                value={email}
                className="form-control"
                placeholder="Email address"
                type="email"
                onChange={handleChange}
              />
            </div>

            {/* password */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                name="password"
                value={password}
                className="form-control"
                placeholder="Create password"
                type="password"
                onChange={handleChange}
              />
            </div>

            {/* password2 */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                name="password2"
                value={password2}
                className="form-control"
                placeholder="Confirm password"
                type="password"
                onChange={handleChange}
              />
            </div>

            {/* signup button */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Signup
              </button>
            </div>

            {/* already have account */}
            <p className="text-center text-white">
              Have an account? <Link to="/signin">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
