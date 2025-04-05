// import React from 'react'
// import Posts from './Posts'

// function Feed() {
//   return (
//     <div className='flex-1 my-8 flex flex-col items-center pl-[20%]'>
//       <Posts />
//     </div>
//   )
// }

// export default Feed

import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-8 flex flex-col items-center md:pl-[20%] px-4 md:px-0'>
        <Posts/>
    </div>
  )
}

export default Feed