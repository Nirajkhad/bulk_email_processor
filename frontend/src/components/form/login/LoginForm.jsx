import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import Toast from "../../toast";
import { saveData } from "../../../config/localStorage";

function LoginForm() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();


  const loginUser = async (url, payload) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + url, payload);
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await loginUser("/auth/login", formData);
      saveData("user", { username: formData.username });
      navigate("/verification");
    } catch (error) {
      setFormData({
        username: "",
        password: "",
      });
      setError(error.response.data.response);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {error && <Toast message={error} />}
      <div className="container vh-100 d-flex flex-column justify-content-center">
        <div className="row justify-content-center mb-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header text-center">Login</div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control`}
                      placeholder="Password"
                      required
                    />
                  </div>
                  {loading ? (
                    <button
                      className="btn btn-primary w-100 mt-2"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary mt-2 w-100"
                      disabled={
                        !formData.username ||
                        !formData.password 
                      }
                    >
                      {" "}
                      Login
                    </button>
                  )}
                </form>
                <div className="d-flex justify-content-end">
                  <NavLink to="/register">Register</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
