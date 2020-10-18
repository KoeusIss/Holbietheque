import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ setStatus }) {
  const [loginError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/login", user)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        console.log(localStorage.getItem("access_token"));
        setStatus(true);
        setLoading(true);
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Insert your Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Insert your Password"
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading" : "Submit"}
        </button>
      </form>
      {loginError ? (
        <h2 style={{ color: "red" }}>An error has occured</h2>
      ) : null}
    </div>
  );
}

export default Login;
