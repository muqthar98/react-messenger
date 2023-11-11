import React, { useState } from "react";
import "../css/Signup.css";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../constants/constants";
import { useUserContext } from "../userContext";

const Login = () => {
  // const[fullName,setFullName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[confirmPassword,setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const auth = getAuth(app);

  const { mutate, error } = useUserContext();

  return (
    <div className="form-container">
      <div>
        {/* <input placeholder='Full Name' type='name' value={fullName} onChange={(e) => setFullName(e.target.value)}/> */}
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        {/* <input placeholder='Confirm Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> */}
        <button
          onClick={() =>
            mutate({ email, password }, { onSuccess: () => navigate("/home") })
          }
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
