import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`https://instaclone-jg5h.onrender.com/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

    return (
        <div className='flex ml-[16%] h-screen'>
            <section className='w-full md:w-1/4 my-8'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>
            {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>
                        <Messages selectedUser={selectedUser} />
                        <div className='flex items-center p-4 border-t border-t-gray-300'>
                            <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
                            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}

export default ChatPage

// export default ChatPage
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { setSelectedUser } from '@/redux/authSlice';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { MessageCircleCode, ArrowLeft } from 'lucide-react';
// import Messages from './Messages';
// import axios from 'axios';
// import { setMessages } from '@/redux/chatSlice';

// import API_BASE_URL from '@/config/api';

// const ChatPage = () => {
//     const [textMessage, setTextMessage] = useState("");
//     const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
//     const { onlineUsers, messages } = useSelector(store => store.chat);
//     const dispatch = useDispatch();
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const sendMessageHandler = async (receiverId) => {
//         try {
//             const res = await axios.post(`${API_BASE_URL}/api/v1/message/send/${receiverId}`, { textMessage }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setMessages([...messages, res.data.newMessage]));
//                 setTextMessage("");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         return () => {
//             dispatch(setSelectedUser(null));
//         }
//     },[]);

//     return (
//         <div className={`flex ${isMobile ? 'flex-col' : ''} ml-0 md:ml-[16%] h-screen`}>
//             {/* User list section */}
//             <section className={`${isMobile && selectedUser ? 'hidden' : 'block'} w-full md:w-1/4 my-8`}>
//                 <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
//                 <hr className='mb-4 border-gray-300' />
//                 <div className='overflow-y-auto h-[80vh] md:h-[80vh]'>
//                     {
//                         suggestedUsers.map((suggestedUser) => {
//                             const isOnline = onlineUsers.includes(suggestedUser?._id);
//                             return (
//                                 <div 
//                                     onClick={() => dispatch(setSelectedUser(suggestedUser))} 
//                                     className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'
//                                     key={suggestedUser?._id}
//                                 >
//                                     <Avatar className='w-14 h-14'>
//                                         <AvatarImage src={suggestedUser?.profilePicture} />
//                                         <AvatarFallback>CN</AvatarFallback>
//                                     </Avatar>
//                                     <div className='flex flex-col'>
//                                         <span className='font-medium'>{suggestedUser?.username}</span>
//                                         <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>
//                                             {isOnline ? 'online' : 'offline'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </section>

//             {/* Chat section */}
//             {
//                 selectedUser ? (
//                     <section className={`${isMobile && selectedUser ? 'block' : 'hidden'} md:block flex-1 border-l border-l-gray-300 flex flex-col h-full`}>
//                         <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
//                             {isMobile && (
//                                 <ArrowLeft 
//                                     className="cursor-pointer" 
//                                     onClick={() => dispatch(setSelectedUser(null))} 
//                                 />
//                             )}
//                             <Avatar>
//                                 <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>
//                             <div className='flex flex-col'>
//                                 <span>{selectedUser?.username}</span>
//                             </div>
//                         </div>
                        
//                         {/* Adjusted the Messages component to have less height on mobile */}
//                         <div className={`flex-1 ${isMobile ? 'mb-16' : ''}`}>
//                             <Messages selectedUser={selectedUser} />
//                         </div>
                        
//                         {/* Added fixed positioning for mobile to keep input above navigation */}
//                         <div className={`flex items-center p-4 border-t border-t-gray-300 ${isMobile ? 'fixed bottom-16 left-0 right-0 bg-white z-10' : ''}`}>
//                             <Input 
//                                 value={textMessage} 
//                                 onChange={(e) => setTextMessage(e.target.value)} 
//                                 type="text" 
//                                 className='flex-1 mr-2 focus-visible:ring-transparent' 
//                                 placeholder="Messages..." 
//                             />
//                             <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
//                         </div>
//                     </section>
//                 ) : (
//                     <div className={`${isMobile ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center mx-auto`}>
//                         <MessageCircleCode className='w-32 h-32 my-4' />
//                         <h1 className='font-medium'>Your messages</h1>
//                         <span>Send a message to start a chat.</span>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default ChatPage
