import Topbar from "../../components/topbar/Topbar"
import Leftbar from "../../components/leftbar/Leftbar"
import Rightbar from "../../components/rightbar/Rightbar"
import Feed from "../../components/feed/Feed"
import { useState } from "react"
import "./home.css"


export default function Home({ socket }) {


    const [text, setText] = useState("")
    return (
        <>
            <Topbar text={text} setText={setText} socket={socket} />
            <div className="homeContainer">
                <Leftbar />
                <Feed text={text} socket={socket} />
                <Rightbar socket={socket} />
            </div>
        </>
    )
}
