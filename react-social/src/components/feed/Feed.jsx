import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

export default function Feed({ username, text, socket }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    fetchPosts();
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


  function deletePost() {
    fetchPosts();
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.filter((val) => {
          if (text === undefined) {
            return val;
          } else if (val.desc.toLowerCase().includes(text.toLowerCase())) {
            return val;
          }
          return null;
        }
        ).map((p) => (
          <Post key={p._id} post={p} deletePost={deletePost} socket={socket} />
        ))}
      </div>
    </div>
  );
}