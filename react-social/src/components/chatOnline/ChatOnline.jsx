import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axiosInstance.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(onlineFriends);

  const handleClick = async (user) => {
    try {
      const res = await axiosInstance.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      console.log(res.data);
      if (res.data === null) {
        await axiosInstance.post("/conversations/",
          {
            senderId: currentId,
            receiverId: user._id
          })
        setCurrentChat(res.data);
      } else {
        setCurrentChat(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}