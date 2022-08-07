// import "./tagFriend.css"
// import { TagUser } from '../../components/tagUser/TagUser'
// import Topbar from '../../components/topbar/Topbar'
// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../context/AuthContext"
// import axios from "axios"


// export const TagFriend = () => {
//     const { user } = useContext(AuthContext)
//     const followers = user.followers;
//     // const [allFriends, setAllFriends] = useState(null)
//     const f = {
//         city: "bankra",
//         coverPicture: "2.jpg",
//         createdAt: "2021-11-12T14:18:10.017Z",
//         desc: "Hey Its princess Soumita",
//         email: "soumita123@gmail.com",
//         followers: [],
//         followings: ['618e77ca72b72d71a866ec83'],
//         from: "howrah",
//         profilePicture: "164087979260816408794910061640246098988soumita.jpg",
//         relationship: 2,
//         username: "soumita",
//         __v: 0,
//         _id: "618e77a272b72d71a866ec81"
//     }

//     const Friends = []

//     useEffect(() => {
//         const getUser = async () => {
//             for (let i = 0; i < followers.length; i++) {
//                 let friend = await axios.get(`/users?userId=${followers[i]}`)
//                 //console.log(friend.data)
//                 Friends.push(friend.data);
//                 // for (let i = 0; i < friend.data.length; i++) {
//                 //     const element = friend.data[i];
//                 //     // setAllFriends([...allFriends, element]);
//                 //     // console.log(allFriends)
//                 //     Friends.push(element)
//                 // }
//             }

//         }; getUser();
//         // console.log(Friends)

//     }, [user])



//     return (
//         <div className='tagFriend'>
//             <Topbar />
//             {setTimeout(() => {
//                 {
//                     { console.log(Friends.length) }
//                     // Friends.map((m) => (

//                     //     <TagUser friend={f} />
//                     // ))
//                     for (let i = 0; i < Friends.length; i++) {
//                         const element = Friends[i];
//                         <TagUser friend={f} />
//                         console.log(element)
//                     }
//                 }
//             }, 3000)
//             }
//             {setTimeout(() => {
//                 <TagUser friend={Friends[0]} />

//             }, 2000)}
//             <span className="tagedUser">Sumit Mondal</span>
//             {/* {console.log(Friends[0])} */}



//         </div>
//     )
// }
