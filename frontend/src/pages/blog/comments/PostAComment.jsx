import React, { useState } from 'react'
import { Await, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { usePostCommentMutation } from '../../../redux/features/comment/commentApi';
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsapi';

const PostAComment = () => {
    const {id} = useParams();
    const [comment, setComment]= useState('')
    const {user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    // console.log(user)
    const [postComment]= usePostCommentMutation();
    const {} = useFetchBlogByIdQuery(id, {skip: !id})

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(!user){
        alert('Please login comment on this post');
        navigate('/login');
        return;
      }
      const newComment ={
        comment: comment,
        user: user?._id,
        postId: id
      }
      // console.log(newComment)
      try{
        // await removed
        const response = postComment(newComment).unwrap();
        console.log(response);
        alert("Comment posted successfully!")
        setComment('');
        refetch()
      }
      catch(error)
      {
        alert("an error occured while posting comment")
      }
    }

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-medium mb-8'>Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea name="text" 
        value={comment}
        onChange={(e)=> setComment(e.target.value)}  
        cols="30"
        rows="10"
        placeholder = 'Share your opinion this post...'
        className='w-full bg-bgPrimary focus:outline-none p-5' />

        <button type="submit" className='w-full bg-primary hover:bg-indigo-500 text-white
        font-medium py-3 rounded-md'>Submit</button>
      </form> 
    </div>
  )
}

export default PostAComment
