import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getData, saveData } from "../../../config/localStorage";
import Toast from "../../toast";

export default function VerificationForm() {
  const [timeLeft, setTimeLeft] = React.useState(60); 
  const [timerCompleted, setTimerCompleted] = React.useState(false);
  const [disableBtn,setDisableBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();

  const [formData,setFormData] = React.useState({
    username:'',
    otp:''
  })

  React.useEffect(() => {
    if (timeLeft <= 0) {
      setTimerCompleted(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timeLeft]);

  const getToken = async (url,payload) => {
    return (await axios.post(process.env.REACT_APP_BACKEND_URL + url, payload)).data.response;
  }

  const handleChange = (e)=> {
    const { name, value } = e.target;
    if(value.length ===  6){
      setDisableBtn(false);
    }
    setFormData({ ...formData, [name]: value,username:getData("user").username });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await getToken("/auth/generate/token",formData);
      saveData("user",{token});
      navigate('/dashboard');
    } catch (error) {
      setError(error.response.data.response);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
        {error && <Toast message={error}/>}

    <div className="container vh-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center mb-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-center">Verification</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="otp">Verification Code</label>
                  <input
                    type="text"
                    name="otp"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="XXXXXX"
                    value={formData.otp}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2 w-100">
                  Submit
                </button>
              </form>
              <div className="d-flex justify-content-between align-items-center mt-3">
                {/* <div> */}
                  {/* {timerCompleted ? (
                    <p className="text-success">You can now resend the code.</p>
                  ) : (
                    <p className="text-muted">Resend code in {timeLeft} seconds</p>
                  )}
                </div> */}
              </div>
                  <div className="d-flex justify-content-end">
                  {/* <button className="btn btn-secondary" disabled={disableBtn}>  Resend</button> */}
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
