// import { setUserProfile } from "@/redux/authSlice";
// import store from "@/redux/store";

// import axios from "axios";
// import {useEffect} from "react";
// import { useDispatch } from "react-redux";

// const useGetUserProfile = (userId) => {
//     const dispatch = useDispatch();
//     // const [userProfile , setUserProfile] = useEffect(null);
 
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const res = await axios.get(`https://instaclone-jg5h.onrender.com/api/v1/user/${userId}/profile` , {withCredentials: true});
//                 if(res.data.success){
                    
//                     dispatch(setUserProfile(res.data.user))
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchUserProfile();

//     },[userId]);
// }

// export default useGetUserProfile;


import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API_BASE_URL from "@/config/api";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    // const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/v1/user/${userId}/profile`, { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId]);
};
export default useGetUserProfile;