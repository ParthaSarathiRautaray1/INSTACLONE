import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
function Comment({comment}) {
  return (
    <div className='flex items-start gap-3 mb-4'>
      <Link>
        <Avatar className='w-8 h-8'>
          <AvatarImage src={comment?.author?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className='flex-1'>
        <div className='flex flex-wrap items-baseline gap-2'>
          <Link className='font-semibold text-sm'>{comment?.author?.username}</Link>
          <p className='text-sm break-words'>{comment?.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
