import sharp from "sharp"
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { populate } from "dotenv";
import { response } from "express";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const addNewPost = async (req, res) =>{
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image) return res.status(400).json({message:'Image required'});

        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width:800 ,height:800 , fit:'inside'})
        .toFormat('jpeg' , {quality:80})
        .toBuffer();


        // image convert to buffer uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`

        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorId
        })

        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({path: 'author' , select:'-password'})

        return res.status(201).json({
            message:'New post added',
            post,
            success:true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating post",
            success: false,
            error: error.message
        });
        
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1})
        .populate({path:'author' , select:'username profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username profilePicture'
            }

        })
        return res.status(200).json({                  
        posts,                            
        success: true,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getUserPost = async (req,res) => {
    try {
        const authorId = req.id;
        const posts = await Post.findOne({author:authorId}).sort({createdAt: -1}).populate({
            path:'author',
            select:'username , profilePicture'
        }).populate({
            path:'comments',
            sort:{createdAt: -1},
            populate:{
                path:'author',
                select:'username, profilePicture'
            }
        })
        return res.status(200).json({                  
            posts,                            
            success: true,
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const likePost = async (req, res) => {
    try {
        const likekrnewalaUserkiId = req.id
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"Post not found" , success: false})
        

        await post.updateOne({$addToSet:{likes:likekrnewalaUserkiId}})
        await post.save();

        // implimenting socket io for real time notifications
        const user = await User.findById(likekrnewalaUserkiId).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likekrnewalaUserkiId){
            // emit a notificaton
            const notification = {
                type:'like',
                userId:likekrnewalaUserkiId,
                userDetails:user,
                postId,
                message:'Your post was Liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }

        return res.status(200).json({
            message:'Post liked',
            success: true
        })
    } catch (error) {
        console.log(error);    
    }
}


export const dislikePost = async (req, res) => {
    try {
        const likekrnewalaUserkiId = req.id
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:"Post not found" , success: false})
        

        await post.updateOne({$pull:{likes:likekrnewalaUserkiId}})
        await post.save();

        // implimenting socket io for real time notifications

        const user = await User.findById(likekrnewalaUserkiId).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likekrnewalaUserkiId){
            // emit a notificaton
            const notification = {
                type:'dislike',
                userId:likekrnewalaUserkiId,
                userDetails:user,
                postId,
                message:'Your post was Disliked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }


        return res.status(200).json({
            message:'Post liked',
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const addComment = async (req,res) => {
    try {
        const postId = req.params.id;
        const commentkrnewalaUserKiId = req.id;

        const {text} = req.body;
        const post = await Post.findById(postId);
        if(!text) return res.status(400).json({
            message:'Comment is required',
            success: false
        })

        const comment = await Comment.create({
            text,
            author:commentkrnewalaUserKiId,
            post:postId
        })

        await comment.populate({
            path:'author',
            select:'username profilePicture'
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment added',
            comment,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCommentsOfPost = async (req , res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({post:postId}).populate('author' , 'username  profilePicture');

        if(!comments) return res.status(404).json({
            message:'No comments for this post',
            success: false
        })
        return res.status(200).json({
            success:true,
            comments
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message:'Post not found',
            success: false
        })

        //chek if the logged in user is the owener of the post

        if(post.author.toString() !== authorId) return res.status(403).json({
            message:'Unauthorized',
        })

        //delete the post 

        await Post.findByIdAndDelete(postId)

        //remove the past id from the user's post


        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId)


        await user.save();

        // delete associated comments

        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            message:'Post delete',
            success: true
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const bookmarkPost = async (req, res) => {
    try {
      const postId = req.params.id;
      const authorId = req.id;

      const post = await Post.findById(postId);
      if(!post) return res.status(404).json({
        message:'Post not found',
        success: false
      })

      const user = await User.findById(authorId);

      if(user.bookmarks.includes(post._id)){
        // already bookmarked so remove from bookmark
        await user.updateOne({$pull:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({
            type:'unsaved',
            message:'Post removed from bookmark',
            success: true
        })

      } else{
        //bookemark 
        await user.updateOne({$addToSet:{bookmarks:post._id}});
        await user.save();
        return res.status(200).json({
            type:'Saved',
            message:'Post bookmarked',
            success: true
        })
      }

    } catch (error) {
        console.log(error);
    }
}