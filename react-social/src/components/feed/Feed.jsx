import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import Status from "../../components/status/Status";

export default function Feed({ username, text, socket }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchStatus();
  }, [username, user._id]);

  const fetchPosts = async () => {
    const res = username
      ? await axiosInstance.get("/posts/profile/" + username)
      : await axiosInstance.get("/posts/timeline/" + user._id);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchStatus = async () => {
    const res = await axiosInstance.get("/status/allStatus");
    const filterEDdata = res.data.filter((r) =>
      user.followings.includes(r.userId)
    );
    setStatus(filterEDdata);
  };

  console.log(status);

  function deletePost() {
    fetchPosts();
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="statusProvider">
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
          <Status />
        </div>
        {(!username || username === user.username) && <Share />}
        {posts
          .filter((val) => {
            if (text === undefined) {
              return val;
            } else if (val.desc.toLowerCase().includes(text.toLowerCase())) {
              return val;
            }
            return null;
          })
          .map((p) => (
            <Post
              key={p._id}
              post={p}
              deletePost={deletePost}
              socket={socket}
            />
          ))}
      </div>
    </div>
  );
}
