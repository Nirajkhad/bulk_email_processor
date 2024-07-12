import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from 'axios';
import Toast from "../../toast";
import Loader from "../../loading/Loader";
import { saveData } from "../../../config/localStorage";

function RegisterForm() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (url,payload) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + url, payload);
  }

  const handleFormSubmit = async (e) => {
    try{
      e.preventDefault();
      setLoading(true);
      await registerUser("/auth/register",formData);
      saveData("user",{"username":formData.username}); 
      navigate('/verification');
    }
    catch(error){
      setFormData({
        username:'',
        email:'',
        password: ''
      })
      setError(error.response.data.response);
    }
    finally{
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "username":
        if (value.length < 3) {
          error = "Username must be at least 3 characters long.";
        }
        break;
      case "email":
        if (!validator.isEmail(value)) {
          error = "Invalid email address.";
        }
        break;
      case "password":
        if (
          !validator.matches(
            value,
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
        ) {
          error =
            "Password must contain at least 8 characters, including letters, numbers, and special symbols.";
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };
  return (
    <>
    {error && <Toast message={error}/>}
    <div className="container vh-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center mb-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-center">Login</div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Username"
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                { loading ?
                <button className="btn btn-primary w-100 mt-2" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Registering ...
              </button>
                 : <button
                  type="submit"
                  className="btn btn-primary mt-2 w-100"
                  disabled={
                    !formData.username || !formData.email || !formData.password || errors.username || errors.email || errors.password
                  }> Register</button>}
                
                 
               
              </form>
              <div className="d-flex justify-content-end">
                <NavLink to="/login">Login</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default RegisterForm;
