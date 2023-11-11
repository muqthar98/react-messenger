import React, { useState } from "react";
import "../css/Signup.css";
import { app } from "../../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth(app);

  const submitButton = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // console.log("user1111111111111" + JSON.stringify(user))
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

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
        {/* <input placeholder='Confirm Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> */}
        <button onClick={submitButton}>SignUp</button>
      </div>
    </div>
  );
};

export default Signup;
