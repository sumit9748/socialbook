import React, { useContext, useState } from 'react'
import "./tagUser.css"
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from "../topbar/Topbar"
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../config';
const TagUser = () => {

    const [search, setSearch] = useState("");
    const [allusers, setAllusers] = useState([])
    const { user: currentUser } = useContext(AuthContext);


    useEffect(() => {
        const getAll = async () => {
            const res = await axiosInstance.get("/users/all");
            setAllusers(res.data.filter((r) => r._id !== currentUser._id));
        }; getAll();
    }, [search])

    const handleChange = (e) => {
        e.preventDefault();
        const res = allusers.filter((user) => user.username === search);
        setAllusers(res);
    }


    return (
        <>
            <Topbar />
            <div classNameName='tagUser'>
                <h1>Search Users</h1>
                <form className='searchUserBody' onSubmit={handleChange}>
                    <input className='searchuser' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" >search</button>
                </form>
                <div >
                    {allusers?.map((all) => (
                        <Link to={`/profile/${all._id}`} style={{ linkStyle: "none", textDecoration: "none" }}>  <div className='tagUserEdit'>
                            <Avatar alt={all.username} src={all.profilePicture ? all.profilePicture : "https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"} />
                            <a className="linksTag">{all.username}</a>

                        </div>
                        </Link>

                    ))}
                </div>

            </div >
        </>
    )
}

export default TagUser;