import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Cancel from "@mui/icons-material/Cancel";
import { axiosInstance } from "../../config";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Post({ post, deletePost, socket }) {
  //console.log(post)
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async (type) => {
    if (type === "1") {
      try {
        axiosInstance.put("/posts/" + post._id + "/like", {
          userId: currentUser._id,
        });
      } catch (err) {}
      setisLiked(!isLiked);
      setLike(isLiked ? like - 1 : like + 1);
    }

    socket?.current?.emit("sendNotification", {
      senderName: currentUser.username,
      receiverId: post.userId,
      type: type,
    });
  };

  function handleDelete() {
    try {
      axiosInstance.put(`/posts/update/${post._id}`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    deletePost();
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`Profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <React.Fragment>
              <Modal
                hideBackdrop
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 400 }}>
                  <h2 id="child-modal-title">
                    Do you want to delete this post?
                  </h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button variant="outlined" onClick={() => handleDelete()}>
                      Yes
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                      No
                    </Button>
                  </div>
                  <Cancel
                    style={{ position: "absolute", top: "0%", right: "0%" }}
                    onClick={handleClose}
                  />
                </Box>
              </Modal>
            </React.Fragment>

            <MoreVertIcon onClick={handleOpen} className="moreVert" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.img ? post?.img : ""} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={"https://pngimg.com/uploads/like/small/like_PNG63.png"}
              onClick={() => likeHandler("1")}
              alt=""
            />
            <img
              className="heartIcon"
              src={
                "https://png.pngtree.com/png-vector/20220411/ourmid/pngtree-glossy-heart-best-vector-ai-and-png-png-image_4538478.png"
              }
              onClick={() => likeHandler("2")}
              alt=""
            />
            <span className="likeCounter">{like} people liked it</span>
          </div>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">
            <AccordianComments
              post={post}
              socket={socket}
              currentUser={currentUser}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export const AccordianComments = ({ post, socket, currentUser }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [comment, setComment] = useState("");

  const sendComment = async () => {
    socket?.current?.emit("sendNotification", {
      senderName: currentUser.username,
      receiverId: post.userId,
      type: 3,
      message: comment,
    });
    try {
      await axiosInstance.post("/comment", {
        postId: post._id,
        text: comment,
        commenter: currentUser.username,
        commenterPic: currentUser.profilePicture,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      sx={{ backgroundColor: " black", color: "white" }}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0, height: "15%" }}>
          Comments
        </Typography>
        <Typography sx={{ color: "text.secondary" }}></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="comment">
          <div className="commentleft">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p>13th Oct</p>
          </div>
          <div className="commentright">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate, eos vitae. Cupiditate, ab? Cum, soluta dolores
              perferendis accusamus voluptatum saepe?
            </p>
          </div>
        </div>
        <input
          type="text"
          style={{ display: "flex", width: "90%" }}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={sendComment()}>Send</button>
      </AccordionDetails>
    </Accordion>
  );
};
