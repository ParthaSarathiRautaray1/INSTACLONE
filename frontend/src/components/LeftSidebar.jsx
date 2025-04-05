


// import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice'
// import CreatePost from './CreatePost'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Button } from './ui/button'
// import { clearNotifications } from '@/redux/rtnSlice'

// const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const { user } = useSelector(store => store.auth);
//     const { likeNotification } = useSelector(store => store.realTimeNotification);
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setAuthUser(null));
//                 dispatch(setSelectedPost(null));
//                 dispatch(setPosts([]));
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     const sidebarHandler = (textType) => {
//         if (textType === 'Logout') {
//             logoutHandler();
//         } else if (textType === "Create") {
//             setOpen(true);
//         } else if (textType === "Profile") {
//             navigate(`/profile/${user?._id}`);
//         } else if (textType === "Home") {
//             navigate("/");
//         } else if (textType === 'Messages') {
//             navigate("/chat");
//         }
//     }

//     const sidebarItems = [
//         { icon: <Home />, text: "Home" },
//         { icon: <Search />, text: "Search" },
//         { icon: <TrendingUp />, text: "Explore" },
//         { icon: <MessageCircle />, text: "Messages" },
//         { icon: <Heart />, text: "Notifications" },
//         { icon: <PlusSquare />, text: "Create" },
//         {
//             icon: (
//                 <Avatar className='w-6 h-6'>
//                     <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//         { icon: <LogOut />, text: "Logout" },
//     ]


//     const handleNotificationOpen = () => {
//                 setTimeout(() => {
//                     dispatch(clearNotifications());
//                 }, 3000);
//             }
//     return (
//         <>
//             {/* Desktop Sidebar */}
//             <div className={`fixed top-0 z-10 left-0 px-4 border-r border-gray-300 h-screen md:block ${isMobile ? 'hidden' : ''} md:w-[16%]`}>
//                 <div className='flex flex-col'>
//                     <h1 className="py-8 pl-7">
//                         <img 
//                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
//                             alt="Instagram"
//                             className="w-10 h-10"
//                         />
//                     </h1>
//                     <div>
//                         {
//                             sidebarItems.map((item, index) => {
//                                 return (
//                                     <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
//                                         {item.icon}
//                                         <span>{item.text}</span>
//                                         {
//                                             item.text === "Notifications" && likeNotification.length > 0 && (
//                                                 <Popover>
//                                                     <PopoverTrigger asChild onClick={handleNotificationOpen}>
//                                                         <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent>
//                                                         <div>
//                                                             {
//                                                                 likeNotification.length === 0 ? (<p>No new notification</p>) : (
//                                                                     likeNotification.map((notification) => {
//                                                                         return (
//                                                                             <div key={notification.userId} className='flex items-center gap-2 my-2'>
//                                                                                 <Avatar>
//                                                                                     <AvatarImage src={notification.userDetails?.profilePicture} />
//                                                                                     <AvatarFallback>CN</AvatarFallback>
//                                                                                 </Avatar>
//                                                                                 <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
//                                                                             </div>
//                                                                         )
//                                                                     })
//                                                                 )
//                                                             }
//                                                         </div>
//                                                     </PopoverContent>
//                                                 </Popover>
//                                             )
//                                         }
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Bottom Navigation */}
//             {isMobile && (
//                 <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-3 z-20">
//                     {sidebarItems.slice(0, 5).map((item, index) => (
//                         <div key={index} onClick={() => sidebarHandler(item.text)} className="flex flex-col items-center">
//                             {item.icon}
//                             {item.text === "Notifications" && likeNotification.length > 0 && (
//                                 <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
//                                     {likeNotification.length}
//                                 </span>
//                             )}
//                         </div>
//                     ))}
//                     <div onClick={() => sidebarHandler("Profile")} className="flex flex-col items-center">
//                         <Avatar className='w-6 h-6'>
//                             <AvatarImage src={user?.profilePicture} alt="@shadcn" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                     </div>
//                 </div>
//             )}

//             <CreatePost open={open} setOpen={setOpen} />
//         </>
//     )
// }

// export default LeftSidebar


import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { clearNotifications } from '@/redux/rtnSlice'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        } else if (textType === 'Search') {
            // Handle search functionality
        } else if (textType === 'Explore') {
            // Handle explore functionality
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]

    const handleNotificationOpen = () => {
        setTimeout(() => {
            dispatch(clearNotifications());
        }, 3000);
    }
    
    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`fixed top-0 z-10 left-0 px-4 border-r border-gray-300 h-screen md:block ${isMobile ? 'hidden' : ''} md:w-[16%]`}>
                <div className='flex flex-col'>
                    <h1 className="py-8 pl-7">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
                            alt="Instagram"
                            className="w-10 h-10"
                        />
                    </h1>
                    <div>
                        {
                            sidebarItems.map((item, index) => {
                                return (
                                    <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                        {item.icon}
                                        <span>{item.text}</span>
                                        {
                                            item.text === "Notifications" && likeNotification.length > 0 && (
                                                <Popover>
                                                    <PopoverTrigger asChild onClick={handleNotificationOpen}>
                                                        <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likeNotification.length}</Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <div>
                                                            {
                                                                likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                    likeNotification.map((notification) => {
                                                                        return (
                                                                            <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                                                <Avatar>
                                                                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                                </Avatar>
                                                                                <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-3 z-20">
                    <div onClick={() => sidebarHandler("Home")} className="flex flex-col items-center">
                        <Home size={24} />
                    </div>
                    <div onClick={() => sidebarHandler("Search")} className="flex flex-col items-center">
                        <Search size={24} />
                    </div>
                    <div onClick={() => sidebarHandler("Create")} className="flex flex-col items-center">
                        <PlusSquare size={24} />
                    </div>
                    <div onClick={() => sidebarHandler("Messages")} className="flex flex-col items-center">
                        <MessageCircle size={24} />
                    </div>
                    <div onClick={() => sidebarHandler("Profile")} className="flex flex-col items-center">
                        <Avatar className='w-6 h-6'>
                            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            )}

            <CreatePost open={open} setOpen={setOpen} />
        </>
    )
}

export default LeftSidebar
