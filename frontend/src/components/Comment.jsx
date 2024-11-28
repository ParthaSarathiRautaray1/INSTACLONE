// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Link } from 'react-router-dom'
// function Comment({comment}) {
//   return (
//     <div className='flex items-start gap-3 mb-4'>
//       <Link>
//         <Avatar className='w-8 h-8'>
//           <AvatarImage src={comment?.author?.profilePicture} />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//       </Link>
//       <div className='flex-1'>
//         <div className='flex flex-wrap items-baseline gap-2'>
//           <Link className='font-semibold text-sm'>{comment?.author?.username}</Link>
//           <p className='text-sm break-words'>{comment?.text}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Comment

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-bold text-sm'>{comment?.author.username} <span className='font-normal pl-1'>{comment?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment
