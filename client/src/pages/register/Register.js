import { useEffect, useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import "./Register.css";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [errorData, setErrorData] = useState("");

  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  
  var data = JSON.stringify({
    "address": "0x596F08aDAa76889161A98c9Bb79869e7f9518C74",
    "username": "test5"
  });
  
  var config = {
    method: 'post',
    url: 'https://polyess-listner.herokuapp.com/register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios(config)
      const result = await response.data
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-screen d-flex flex-column justify-content-center align-items-center">
      <div class="logo my-3 mb-5">
        <h1 className="text-center" style={{ color: "#d1996d" }}>
          <b>Enter Details to Play</b>
        </h1>
      </div>
      <form onSubmit={registerHandler} className="register-screen__form mb-5">
        <h3 className="register-screen__title">Register</h3>
        {/* {errorData && <span className="error-message">{setErrorData}</span>} */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            required
            id="address"
            autoComplete="true"
            placeholder="Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn form-btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
