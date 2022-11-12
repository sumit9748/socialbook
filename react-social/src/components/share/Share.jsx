import "./share.css";
import PermMedia from "@mui/icons-material/PermMedia";
import Label from "@mui/icons-material/Label";
import Room from "@mui/icons-material/Room";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChildModal } from "../modal/modalcomponent";
import { axiosInstance } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../pages/Firebase";

export default function Share() {
  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value + "",
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name + Date.now();
      data.append("name", fileName);
      data.append("file", file);

      const imgRef = ref(storage, `images/${file.name + Date.now()}`);

      uploadBytes(imgRef, file).then(() => {
        getDownloadURL(imgRef).then((url) => {
          newPost.img = String(url);
          axiosInstance.post("/posts", newPost).then(() => {
            window.location.reload();
          });
        });
        // console.log(newPost);
      });
    } else {
      axiosInstance.post("/posts", newPost).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && <ChildModal file={file} setFile={setFile} />}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
