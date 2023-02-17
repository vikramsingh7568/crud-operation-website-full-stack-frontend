import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/signup.css";
import "../components/login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/profile");
    }
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    if ( !email || !password) {
      setError(true);
      return;
    }

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // we are storing local storage for long time to know about user information signup details
    result = await result.json();
    // console.log(result)
    console.log(result.auth);
    if (result.message) {
      localStorage.setItem("user", JSON.stringify(result));
    } 
    if (result) {
      setError(() => result);
      setEmailerror(true);
    }
    if (result.message === "succesfully login") {
      navigate("/profile");
      alert("user loged in successfully");
    }
    console.log(result);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="enter email"
        className={emailerror && error.email || !email && error  ? "input-type" : "border-default" } 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
       {error && !email && (
        <label className="name"> email is required </label>
      )}
      {emailerror && email && <label className="name"> {error.email} </label>}

      <input
        type="password"
        placeholder="enter password"
        className={emailerror && error.message || !password && error  ? "input-type" : "border-default" } 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

     {error && !password && (
        <label className="name"> user password is required </label>
      )}
      {emailerror && password && <label className="name"> {error.message} </label>}
      <button type="button" className="appButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
export default Login;
