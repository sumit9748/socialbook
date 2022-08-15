import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Cancel from '@mui/icons-material/Cancel'
import { axiosInstance } from "../../config";


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setisLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])



    const likeHandler = async (type) => {
        if (type === 1) {
            try {
                axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id })
            } catch (err) {

            }
            setisLiked(!isLiked);
            setLike(isLiked ? like - 1 : like + 1);
        }

        socket?.current?.emit("sendNotification", {
            senderName: currentUser.username,
            receiverId: post.userId,
            type: type ? type : 1,
        })
    };



    function handleDelete() {
        try {
            axiosInstance.put(`/posts/update/${post._id}`, { userId: currentUser._id })
        } catch (err) {
            console.log(err)
        }
        deletePost();
    }
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`Profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? user.profilePicture : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"} alt="" />
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
                                    <h2 id="child-modal-title">Do you want to delete this post?</h2>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <Button variant="outlined" onClick={() => handleDelete()}>Yes</Button>
                                        <Button variant="outlined" onClick={handleClose}>No</Button>

                                    </div>
                                    <Cancel style={{ position: "absolute", top: "0%", right: "0%" }} onClick={handleClose} />
                                </Box>
                            </Modal>
                        </React.Fragment>

                        < MoreVertIcon onClick={handleOpen} className="moreVert" />

                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img className="postImg" src={post?.img ? post?.img : ""} alt="" />

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={() => likeHandler("1")} alt="" />
                        <img className="heartIcon" src={`${PF}heart.png`} onClick={() => likeHandler("2")} alt="" />
                        <span className="likeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText" onClick={() => likeHandler("3")}>{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
