// import { setMessages } from "@/redux/chatSlice";
// import { setPosts } from "@/redux/postSlice";
// import store from "@/redux/store";
// import axios from "axios";
// import {useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllMessage = () => {
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store=> store.auth)
//     useEffect(() => {
//         const fetchAllMessage = async () => {
//             try {
//                 const res = await axios.get(`https://instaclone-jg5h.onrender.com/api/v1/message/all/${selectedUser?._id}` , {withCredentials: true , headers:{ 'Content-Type':'application/json'}});
//                 if(res.data.success){
//                     dispatch(setMessages(res.data.messages))
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllMessage();

//     },[selectedUser]);
// }

// export default useGetAllMessage;



import { setMessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import API_BASE_URL from "@/config/api";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessage();
    }, [selectedUser]);
};
export default useGetAllMessage;
