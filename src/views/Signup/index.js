import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/signup", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  const handlechange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <h1>SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Insert your email"
          name="email"
          onChange={handlechange}
        ></input>
        <input
          type="password"
          placeholder="Insert your password"
          name="password"
          onChange={handlechange}
        ></input>
        <input
          type="password"
          placeholder="confirm your password"
          name="password_confirmation"
          onChange={handlechange}
        ></input>
        <button type="submit">SIGNUP</button>
      </form>
    </div>
  );
}
export default Signup;
