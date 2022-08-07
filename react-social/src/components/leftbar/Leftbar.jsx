import "./leftbar.css"
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from "../../dummyData";
import Friend from "../friends/Friend"
import { Link } from "react-router-dom";

export default function Leftbar() {

    const goToYoube = (res) => {
        if (res !== "courses") {
            window.open(`https://www.youtube.com/results?search_query=${res}`, "_blank")
        } else {
            window.open(`https://www.youtube.com/c/AdityaVermaTheProgrammingLord/playlists`, "_blank")
        }
    }

    return (
        <div className="leftbar">

            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem" onClick={() => goToYoube("stack")}>
                        <RssFeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Stack</span>
                    </li>
                    <Link to="/messenger">
                        <li className="sidebarListItem" onClick={() => goToYoube("queue")}>
                            <ChatIcon className="sidebarIcon" />
                            <span className="sidebarListItemText">Queue</span>
                        </li>
                    </Link>
                    <li className="sidebarListItem" onClick={() => goToYoube("videos")}>
                        <SlowMotionVideoIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("array")}>
                        <GroupIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Array</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("linkedlist")}>
                        <BookmarkIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">LinkedList</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("binarysearch")}>
                        <HelpOutlineIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">BinarySearch</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("tree")}>
                        <WorkIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Tree</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("heap")}>
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Heap</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => goToYoube("courses")}>
                        <SchoolIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(u => (
                        <Friend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div >
    )
}
