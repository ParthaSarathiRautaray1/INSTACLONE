
// import { useEffect } from 'react'
// import ChatPage from './components/ChatPage'
// import EditProfile from './components/EditProfile'
// import Home from './components/Home'
// import Login from './components/Login'
// import MainLayout from './components/MainLayout'
// import Profile from './components/Profile'
// import ProtectedRoutes from './components/ProtectedRoutes'
// import Signup from './components/Signup'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { io } from "socket.io-client"
// import { useDispatch, useSelector } from 'react-redux'
// import store from './redux/store'
// import { setSocket } from './redux/socketSlice'
// import { setOnlineUsers } from './redux/chatSlice'
// import { setLikeNotification } from './redux/rtnSlice'
// const browserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
//     children: [
//       {
//         path: '/',
//         element: <ProtectedRoutes><Home /></ProtectedRoutes>
//       },
//       {
//         path: '/profile/:id',
//         element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
//       },
//       {
//         path: '/account/edit',
//         element: <ProtectedRoutes> <EditProfile /></ProtectedRoutes>
//       },
//       {
//         path: '/chat',
//         element: <ProtectedRoutes> <ChatPage /></ProtectedRoutes>
//       },
//     ]
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },

//   {
//     path: '/signup',
//     element: <Signup />
//   },
// ])

// function App() {
//   const { user } = useSelector(store => store.auth)
//   const {socket} = useSelector(store => store.socketio)
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (user && user._id) {
//       const socketio = io('https://instaclone-jg5h.onrender.com', {
//         query: {
//           userId: user?._id
//         },
//         transports: ['websocket']
//       })
//       dispatch(setSocket(socketio))

//       socketio.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers))
//       })

//       socketio.on('notification', (notification) => {
//         dispatch(setLikeNotification(notification));
//       })




//       return () => {
//         socketio.close();
//         dispatch(setSocket(null))
//       }
//     } else if(socket) {
//       socket?.close();
//       dispatch(setSocket(null))
//     }
//   }, [user, dispatch])

//   return (
//     <>
//       <RouterProvider router={browserRouter} />
//     </>
//   )
// }

// export default App



import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'
import API_BASE_URL from './config/api'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Convert http:// to ws:// or https:// to wss://
      const wsUrl = API_BASE_URL.replace(/^http/, 'ws');
      console.log("Connecting to WebSocket at:", wsUrl);
      
      const socketio = io(wsUrl, {
        query: {
          userId: user?._id
        },
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });
      dispatch(setSocket(socketio));

      socketio.on('connect', () => {
        console.log("Socket connected successfully");
      });
  
      socketio.on('connect_error', (error) => {
        console.error("Socket connection error:", error);
      });
      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App