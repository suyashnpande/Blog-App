import React, { useState , useRef } from 'react'
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import { useFetchBlogByIdQuery, usePostBlogMutation, useUpdateBlogMutation } from '../../../redux/features/blogs/blogsapi';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {

    const {id} = useParams()
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");

    const [updatedBlog] = useUpdateBlogMutation();

    const {data: blog={}, error, isLoading, refetch}= useFetchBlogByIdQuery(id);

    const {user} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(blog.post){
            const editor = new EditorJS({
                holder: 'editorjs',
                onReady: ()=>{
                    editorRef.current = editor;
                },
                autofocus: true,
                tools: {
                    header:{
                        class: Header,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: {
                          defaultStyle: 'unordered'
                        }
                      },
                },
                data: blog.post.content
    
            })
    
            return ()=>{
                editor.destroy();
                editorRef.current= null;
            }
        }
    }, [])

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const content = await editorRef.current.save();
            // console.log(content);
            const updatedPost ={
                title : title|| blog.post.title, 
                coverImg: coverImg || blog.post.coverImg,
                content ,
                category,
                description: metaDescription|| blog.post.description,
                author: user?._id,
                rating: rating || blog.post.rating
            }
            // console.log(updatedPost);
            const response = await postBlog({id, ...updatedPost}).unwrap();
            // console.log(response);
            alert("Blog is updated successfully!");
            refetch()
            navigate('/blogs')

        }
        catch(error){
            console.log("Failed to submit post", error);
            setMessage("Failed to submit post , please try again");
        }
    }


  return (
    <div className='bg-white md:p-8 p-2'>
        <h2  className='text-2xl font-semibold'>Update or Edit A NewBlog Post </h2>
        <form onSubmit={handleSubmit}
        className='space-y-5 pt-8'>
            <div className='space-y-4'>
                <label className='font-semibold text-xl'>Blog Title</label>
                <input type="text" 
                defaultValue={blog?.post?.title}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='Ex: Marina del rey Marriott..' required />
            </div>

            {/* Blog details */}
            <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
                {/* left side */}
                <div className='md:w-2/3 w-full'>
                    <p className='font-semibold text-xl mb-5'>Content Section</p>
                    <p className='text-xs italic'>Write your post below here...</p>
                    {/* using editor js */}
                    <div id="editorjs"></div>
                </div>

                {/* Right side */}
                <div className='md:w-1/3 w-full border p-5 space-y-5'>
                <p className='text-xl font-semibold'>Choose Blog Format</p>

                {/* images */}
                <div className='space-y-4'>
                    <label className='font-semibold '>Blog Cover</label>
                    <input type="text" 
                    defaultValue={blog?.post?.coverImg}
                    value={coverImg}
                    onChange={(e)=> setCoverImg(e.target.value)}
                    className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                    placeholder="https://unsplash.com/image/cover-photo-of-blog.png..." required />
                </div>

                {/* Category */}
                <div className='space-y-4'>
                    <label className='font-semibold '>Category</label>
                    <input type="text" 
                    defaultValue={blog?.post?.category}
                    onChange={(e)=> setCategory(e.target.value)}
                    className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                    placeholder="RoofTop/Travel/Nature" required />
                </div>

                {/* Meta Description */}
                <div className='space-y-4'>
                    <label className='font-semibold '>Meta Description</label>
                    <textarea type="text" cols={4} rows={4}
                    defaultValue={blog?.post?.description}
                    onChange={(e)=> setMetaDescription(e.target.value)}
                    className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                    placeholder="Write your blog meta description" required />
                </div>

                {/* Rating */}
                <div className='space-y-4'>
                    <label className='font-semibold '>Rating</label>
                    <input type="number" 
                    defaultValue={blog?.post?.rating}
                    onChange={(e)=> setRating(e.target.value)}
                    className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                     required />
                </div>

                {/*Author  */}
                <div className='space-y-4'>
                    <label className='font-semibold '>Author</label>
                    <input type="text" 
                    value={UserActivation.username}
                    onChange={(e)=> setRating(e.target.value)}
                    className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                    placeholder={'{user.username} (not edited) '}
                     required 
                     disabled/>
                </div>
                </div> 
            </div>
            
            {
                message && <p className='text-red-500'>{message}</p>
            }
            <button type='submit'
            disabled={isLoading}
            className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'
            >Update Blog </button>
        </form>
      
    </div>
  )
}

export default UpdatePost
