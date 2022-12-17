import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import Status from "../../components/status/Status";

export default function Feed({ username, socket }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchStatus();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = username
        ? await axiosInstance.get("/posts/profile/" + username)
        : await axiosInstance.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    } catch (err) {}
  };

  const fetchStatus = async () => {
    try {
      const res = await axiosInstance.get(`/status/all/${user._id}`);
      setStatus(res.data);
    } catch (err) {}
  };

  function deletePost() {
    fetchPosts();
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username && (
          <div className="statusProvider">
            <Status create={true} user={user} fetchStatus={fetchStatus} />
            {status?.map((s) => (
              <Status create={false} user={user} status={s} />
            ))}
          </div>
        )}

        {(!username || username === user.username) && <Share />}
        {posts?.map((p) => (
          <Post key={p._id} post={p} deletePost={deletePost} socket={socket} />
        ))}
      </div>
    </div>
  );
}
