import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

export default function Profile() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user: currentUser } = useContext(AuthContext);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);


  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture ? user.coverPicture : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
                }
                alt=""
              />{(user._id === currentUser._id) ? (
                <Link to={`/updateProfile/` + user._id}>
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
                    }
                    alt=""
                  />
                </Link>
              ) : (
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
                  }
                  alt=""
                />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
