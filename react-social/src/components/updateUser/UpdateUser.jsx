import "./updateUser.css";
import AddImage from "@mui/icons-material/AddAPhoto";
import Cancel from "@mui/icons-material/Cancel";
import { useContext, useState } from "react";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../pages/Firebase";
//import { useFormControl } from "../../../../../expense-manager/client/node_modules/@mui/material";

export const UpdateUser = ({}) => {
  // console.log(user.username);user
  const { user } = useContext(AuthContext);
  const username = useRef();
  const city = useRef();
  const desc = useRef();
  const password = useRef();
  const relation = useRef();
  const { dispatch } = useContext(AuthContext);

  const [imageAsFile, setImageAsFile] = useState("");

  let relationship;

  if (user.relationship === 1) {
    relationship = "single";
  } else if (user.relationship === 2) {
    relationship = "married";
  } else {
    relationship = "others";
  }

  const [file, setFile] = useState(null);

  console.log(imageAsFile);

  const submitHandler = async (e) => {
    e.preventDefault();
    let updatedUser = {
      username: username.current.value ? username.current.value : user.username,
      city: city.current.value ? city.current.value : user.city,
      desc: desc.current.value ? desc.current.value : user.desc,
      relation: relation.current.value
        ? relation.current.value
        : user.relationship,
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const FileName = file.name + Date.now();
      data.append("name", FileName);
      data.append("file", file);

      const image = file;
      console.log(file);
      setImageAsFile((imageAsFile) => image);
      const imgRef = ref(storage, `images/${file.name + Date.now()}`);

      uploadBytes(imgRef, file).then(() => {
        getDownloadURL(imgRef).then((url) => {
          updatedUser.profilePicture = String(url);
          axiosInstance.put("/users/" + user._id, updatedUser).then(() => {
            axiosInstance.get(`/users?userId=${user._id}`).then((res) => {
              dispatch({ type: "UPDATE_USER", payload: res.data });
            });
          });
        });
      });
    } else {
      axiosInstance.put("/users/" + user._id, updatedUser).then(() => {
        axiosInstance.get(`/users?userId=${user._id}`).then((res) => {
          dispatch({ type: "UPDATE_USER", payload: res.data });
        });
      });
    }

    // window.location.reload();
  };

  return (
    <div className="updateUser">
      <div className="updateUserWrapper">
        <div className="updateUserTop">
          <div className="updateUserTopLeft">
            <h1 className="userDetailsText">User Details</h1>
            <div className="updateUserItem">
              <label className="updateUserKey">Username:-</label>
              <span className="updateUserValue">{user.username}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">From:-</label>
              <span className="updateUserValue">{user.city}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">Desc:-</label>
              <span className="updateUserValue">{user.desc}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">RelationShip Stats:-</label>
              <span className="updateUserValue">{user.relationship}</span>
            </div>
          </div>
          <div className="updateUserTopRight">
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
              }
              alt=""
              className="imgContainer"
            />
          </div>
        </div>
        <hr className="updateHr" />
        <form className="updateUserBottom" onSubmit={submitHandler}>
          <div className="updateUserBottomLeft">
            <input
              type="text"
              placeholder="change username.."
              className="inputChange"
              ref={username}
            />
            <input
              type="text"
              placeholder="change desc.."
              className="inputChange"
              ref={desc}
            />
            <input
              type="text"
              placeholder="change Address.."
              className="inputChange"
              ref={city}
            />
            <input
              type="password"
              placeholder="change Password.."
              className="inputChange"
              ref={password}
            />
            <div className="radioContainer" id="relation" ref={relation}>
              <label className="input Label">
                <input
                  type="radio"
                  id="1"
                  name="inputRadio"
                  value="1"
                  className="inputRadio"
                />
                Single
              </label>
              <label className="input Label">
                <input
                  type="radio"
                  id="2"
                  value="2"
                  name="inputRadio"
                  className="inputRadio"
                />
                Married
              </label>
              <label className="input Label">
                <input
                  type="radio"
                  id="3"
                  value="3"
                  name="inputRadio"
                  className="inputRadio"
                />
                Complex
              </label>
            </div>
            <button className="updateButton" type="submit">
              Update
            </button>
          </div>

          <label htmlFor="file" className="updateUserBottomRight">
            {file && (
              <div className="fileImgContainer">
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFile(null)}
                />
              </div>
            )}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <AddImage className="registerIconAdd" />
          </label>
        </form>
      </div>
    </div>
  );
};
