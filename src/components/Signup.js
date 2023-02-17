import React, { useEffect, useState, useRef } from "react";
import "../components/signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  // if user is signed up then we are preventing user to go on signup up page
  //     useEffect(() =>{
  //    // const auth = localStorage.getItem('user')
  //     if(auth){
  //         alert ("user created successfully")
  //     }
  //     // if(auth){
  //     // // navigate('/')
  //     // }
  //    })

  const collectData = async () => {
    console.log(name, email, password);
    if (!name || !email || !password) {
      setError(true);
      return;
    }

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // we are storing local storage for long time to know about user information signup details
    result = await result.json();
    console.log(result);
    if (result) {
      setError(() => result);
      setEmailerror(true);
    }
    if (result.message === "user created successfully") {
      navigate("/login");
      alert("user created successfully");
    }
    console.log(error);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        ref={inputRef}
        className={emailerror && error.name || !name && error ? "input-type" : "border-default"}
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      {error && !name && (
        <label className="name"> user name is required </label>
      )}
      {emailerror && name && <label className="name"> {error.name} </label>}

      <input
        type="text"
        className={emailerror && error.email || !email && error  ? "input-type" : "border-default"}
        placeholder={"Enter Email address"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      {error && !email && <label className="name"> email is required </label>}
      {emailerror && email && <label className="name"> {error.email} </label>}

      <input
        type="password"
        placeholder="Enter password"
        className={!password && error ? "input-type" : "border-default" }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      {error && !password && (
        <label className="name"> password is required </label>
      )}
      <br/>
      <button type="button" onClick={collectData} className="appButton">
        Signup
      </button>
      <br/>
      {emailerror && password && (
        <label
          className={
            emailerror && error.message ? "input-label" : "border-default"
          }
        >
          {error.message}
        </label>
      )}
    </div>
  );
};

export default Signup;
