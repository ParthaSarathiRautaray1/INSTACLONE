// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'

// function Posts() {
//   const {posts} = useSelector(store => store.post);

//   const postsArray = Array.isArray(posts) ? posts : [posts];
  

  


//   return (
//     <div>
//       {
//        postsArray.map((post) => <Post key={post._id} post={post} />)
//       }
//     </div>
//   )
// }

// export default Posts


import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {posts} = useSelector(store=>store.post);
  return (
    <div>
        {
            posts.map((post) => <Post key={post?._id} post={post}/>)
        }
    </div>
  )
}

export default Posts