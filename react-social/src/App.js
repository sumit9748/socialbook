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


function App() {
  const { user } = useContext(AuthContext);
  const socket = useRef();


  useEffect(() => {
    socket.current = io("https://socialbooksumit.herokuapp.com/");
  }, [])



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

//"https://firebasestorage.googleapis.com/v0/b/socialmeo-c671e.appspot.com/o/images%2FIMG_20201230_123423.jpg63de8458-8392-4b87-8046-c66e2979b3b4?alt=media&token=f79eb8d9-61bf-4760-be4c-b754473f5a32"