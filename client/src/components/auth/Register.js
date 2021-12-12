import { useState } from "react";
import axios from "axios";
import { useWeb3React} from '@web3-react/core'
import "./Register.css";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [errorData, setErrorData] = useState("");

  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const userAddr=account

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (!address) {
      setAddress("");
      setTimeout(() => {
        setErrorData("");
      }, 5000);
      return setErrorData("Please Enter a Password");
    }

    try {
      const { data } = await axios.post(
        "",
        {
          username,
          address,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/login");
    } catch (error) {
      setErrorData(error.response.data.error);
      setTimeout(() => {
        setErrorData("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {errorData && <span className="error-message">{setErrorData}</span>}
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
            type="password"
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