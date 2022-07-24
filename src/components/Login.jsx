import React, { useState } from "react";
import { db, auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Login = ({ screenWidth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    toastId: 1,
  };

  const loginToApp = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password to login.", toastOptions);
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const register = () => {
    if (!username) {
      toast.error("Please enter username.", toastOptions);
      return;
    }
    if (!email) {
      toast.error("Please enter your email.", toastOptions);
      return;
    }
    if (!password) {
      toast.error("Please enter your password.", toastOptions);
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: username,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: username,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
      <form>
        <input
          placeholder="Full name (required if registering)"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Profile pic URL (optional)"
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Login;
