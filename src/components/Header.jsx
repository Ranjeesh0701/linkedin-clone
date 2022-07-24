import {
  Search,
  Home,
  SupervisorAccount,
  BusinessCenter,
  Chat,
  Notifications,
} from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";

const Header = ({ screenWidth }) => {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src={process.env.PUBLIC_URL + "linkedin.png"} alt="" />
        <div className="header__search">
          {/* Search Icon */}
          <Search />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        {screenWidth > 768 && (
          <>
            <HeaderOptions Icon={Home} title="Home" />
            <HeaderOptions Icon={SupervisorAccount} title="My Network" />
            <HeaderOptions Icon={BusinessCenter} title="Jobs" />
            <HeaderOptions Icon={Chat} title="Messaging" />
            <HeaderOptions Icon={Notifications} title="Notifications" />
          </>
        )}
        <HeaderOptions avatar={true} title="Me" onClick={logoutOfApp} />
      </div>
    </div>
  );
};

export default Header;
