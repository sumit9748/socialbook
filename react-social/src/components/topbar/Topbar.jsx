import "./topbar.css";
import Person from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Notification from "@mui/icons-material/Notifications";
import Power from "@mui/icons-material/PowerSettingsNewOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import { Link, useHistory } from "react-router-dom";


export default function Topbar({ text, setText, socket }) {

  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();


  useEffect(() => {
    socket?.current?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);


  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "loved";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login")
    window.location.reload();
  };


  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbar-container">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialBook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="search for posts" value={text} className="searchInput" onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ linkStyle: "none", textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Home</span>
          </Link>
          <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
          <Link to="/searchUser"><div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link style={{ linkStyle: "none", textDecoration: "none", color: "white" }} to={`/messenger/${user._id}`}>
              <Chat className="chatIcon" />
            </Link>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Notification onClick={() => setOpen(!open)} />
            {notifications.length > 0 && (<span className="topbarIconBadge">{notifications.length}</span>)}
            {open && (
              <div className="notifications">
                {notifications.map((n) => displayNotification(n))}
                <button className="nButton" onClick={handleRead}>
                  Mark as read
                </button>
              </div>
            )}
          </div>

        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Power onClick={registerSubmit} />
          </div>
        </div>
        <Link to={`/profile/${user._id}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "search.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
