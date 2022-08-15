import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

export default function Message({ message, own, friend }) {
  const [friendst, setFriendst] = useState([])
  const { user } = useContext(AuthContext)


  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${friend && friend}`)
      setFriendst(res.data)
    }; getUser();
  }, [])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? user.profilePicture : friendst.profilePicture}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}