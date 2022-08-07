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
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                  user.coverPicture ? PF + user.coverPicture : PF + "search.png"
                }
                alt=""
              />{(user._id === currentUser._id) ? (
                <Link to={`/updateProfile/` + user._id}>
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "noprofile.pg"
                    }
                    alt=""
                  />
                </Link>
              ) : (
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "noprofile.pg"
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
