import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import { setAuthentication, isAuthenticated } from "../helpers/auth";
import { ShowErrorMsg } from "../helpers/message";
import { ShowLoading } from "../helpers/loading";
import { signin } from "../api/auth";

const Signin = ({ location }) => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          const redirect = location.search.split("=")[1];

          if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push("/admin/dashboard");
          } else if (
            isAuthenticated() &&
            isAuthenticated().role === 0 &&
            !redirect
          ) {
            history.push("/user/dashboard");
          } else {
            history.push("/shipping");
          }
        })
        .catch((err) => {
          console.log("signn api function error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div className="signin-container">
      <div className="row px-4 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && ShowErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{ShowLoading()}</div>}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
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

            {/* signup button */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Signin
              </button>
            </div>

            {/* already have account */}
            <p className="text-center text-white">
              Don't have an account? <Link to="/signup">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
