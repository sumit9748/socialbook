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
  const [frndReq, setFrndReq] = useState({});
  const [open, setOpen] = useState({
    notification: false,
    frndRequest: false,
  });
  const history = useHistory();


  useEffect(() => {
    socket?.current?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    socket?.current?.on("getFriendrequest", (data) => {
      setFrndReq((prev) => [...prev, data]);
    })
  }, [socket]);


  const displayNotification = ({ senderName, type, message }) => {
    let action;

    if (type == 1) {
      action = "liked";
    } else if (type == 2) {
      action = "loved";
    } else {
      action = `${message}`;
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = ({ helper }) => {
    if (helper === "not") {
      setNotifications([]);
      setOpen({ notification: false });
    } else {
      setFrndReq([]);
      setOpen({ frndRequest: false });
    }

  };

  const registerSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login")
    window.location.reload();
  };


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
          <Link to="/searchUser" style={{ linkStyle: "none", textDecoration: "none", color: "white" }}>
            <span className="topbarLink">TimeLine</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <Link to="/searchUser"><div className="topbarIconItem">
            <Person onClick={() => setOpen({ frndRequest: true })} />
            {frndReq.length > 0 && (<span className="topbarIconBadge">{frndReq.length}</span>)}
            {open.frndRequest && (
              <div className="notifications">
                {frndReq.map((n) => (
                  <p>{`${n} sent you friend request`}</p>
                ))}
                <button className="nButton" onClick={handleRead("frnd")}>
                  Mark as read
                </button>
              </div>
            )}
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
            <Notification onClick={() => setOpen({ notification: true })} />
            {notifications.length > 0 && (<span className="topbarIconBadge">{notifications.length}</span>)}
            {open.notification && (
              <div className="notifications">
                {notifications.map((n) => displayNotification(n))}
                <button className="nButton" onClick={handleRead("not")}>
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
                ? user.profilePicture
                : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
