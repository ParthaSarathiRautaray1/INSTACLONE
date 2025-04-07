// import { setSuggestedUsers } from "@/redux/authSlice";

// import axios from "axios";
// import {useEffect} from "react";
// import { useDispatch } from "react-redux";

// const useGetSuggestedUsers = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         const fetchSuggestedUsers = async () => {
//             try {
//                 const res = await axios.get('https://instaclone-jg5h.onrender.com/api/v1/user/suggested' , {withCredentials: true});
//                 if(res.data.success){
                    
//                     dispatch(setSuggestedUsers(res.data.users))
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSuggestedUsers();

//     },[]);
// }

// export default useGetSuggestedUsers;


import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API_BASE_URL from "@/config/api";

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/v1/user/suggested`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setSuggestedUsers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    }, []);
};
export default useGetSuggestedUsers;