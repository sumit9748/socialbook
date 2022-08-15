
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import "./conversations.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users?userId=" + friendId);
        setUser(res.data);
        //console.log(res)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user.profilePicture
            : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}