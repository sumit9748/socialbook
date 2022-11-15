import React, { useState } from "react";

import "./status.css";
import { axiosInstance } from "../../config";
import { storage } from "../../pages/Firebase";
import AddIcon from "@mui/icons-material/Add";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Status = ({ create, user, fetchStatus, status }) => {
  const [file, setFile] = useState(null);

  const addStatus = async () => {
    const newPost = {
      userId: user._id,
      profilePic: user.profilePicture,
      userstatus: user.username,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name + Date.now();
      data.append("name", fileName);
      data.append("file", file);

      const imgRef = ref(storage, `images/${file.name + Date.now()}`);

      uploadBytes(imgRef, file).then(() => {
        getDownloadURL(imgRef).then((url) => {
          newPost.statusPic = String(url);
          axiosInstance.post("/status/", newPost).then(() => {
            fetchStatus();
          });
        });
        // console.log(newPost);
      });
    }
  };
  return (
    <div className="statusComponent">
      <img src={status?.profilePic} alt="" className="statusProfile" />
      <div className="back">
        <img src={status?.statusPic} alt="" />
        <label htmlFor="file">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {create && (
            <>
              <AddIcon className="statusAddIcon" />

              <button onClick={addStatus} className="statusAdder">
                Share
              </button>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default Status;
