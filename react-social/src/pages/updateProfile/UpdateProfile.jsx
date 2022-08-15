import "./updateProfile.css";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateUser } from "../../components/updateUser/UpdateUser";
import { axiosInstance } from "../../config";

export const UpdateProfile = ({ listItem }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log(username);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${id}`);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  //console.log(user);

  return (
    <div className="updateProfile">
      <Topbar />
      <UpdateUser userc={user} listItem={listItem} />
    </div>
  );
};
