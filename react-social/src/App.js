import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { UpdateProfile } from "./pages/updateProfile/UpdateProfile";
import TagUser from "./components/tagUser/TagUser";
import { io } from "socket.io-client";
import { storage } from "./pages/Firebase"
import { ref, listAll } from 'firebase/storage'
import { v4 } from "uuid"


function App() {
  const { user } = useContext(AuthContext);
  const socket = useRef();

  const ImgListRef = ref(storage, "images/");
  useEffect(() => {
    socket.current = io("https://socialbooksumit.herokuapp.com/");
    listItem();
  }, [])

  const [imageList, setImageList] = useState([]);

  const listItem = () => {
    ImgListRef.listAll()
      .then(res => {
        res.items.forEach((item) => {
          setImageList(arr => [...arr, item.name]);
        })
      })
      .catch(err => {
        alert(err.message);
      })
  }


  console.log(imageList)

  useEffect(() => {
    socket?.current.emit("addUser", user?._id);
  }, [socket, user])


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home socket={socket} /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger socket={socket} />}
        </Route>
        <Route path="/profile/:userId">
          <Profile />
        </Route>
        <Route path="/updateProfile/:userId">
          <UpdateProfile />
        </Route>
        <Route path="/searchUser">
          <TagUser />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
