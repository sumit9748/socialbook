import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useState } from "react";
import "./home.css";
import Status from "../../components/status/Status";

export default function Home({ socket }) {
  const [text, setText] = useState("");
  return (
    <>
      <Topbar text={text} setText={setText} socket={socket} />
      <div className="homeContainer">
        <Leftbar />
        <Status />
        <Feed text={text} socket={socket} />
        <Rightbar socket={socket} />
      </div>
    </>
  );
}
