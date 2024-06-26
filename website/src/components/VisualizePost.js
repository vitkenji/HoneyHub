import React, { useState, useEffect } from 'react';
import leftArrow from "../assets/leftArrow.png";
import { Link } from "react-router-dom";
import noProfilePicture from "../assets/profile.png";
import comment from '../assets/comment.png';
import share from '../assets/share.png';
import upArrow from '../assets/upArrow.png';
import { BASE_URL } from "../backend_url";
import {useParams} from "react-router-dom"

const VisualizePost = (props) => {
    const [post, setPost] = useState(null);
    const [upVotes, setUpVotes] = useState(0);
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [originalState, setOriginal] = useState(true);
    const {id} = useParams()
    const [profilePicture, setProfilePicture] = useState(noProfilePicture)

    const incrementVotes = () => {
        if (originalState) {
            setUpVotes(upVotes + 1);
            setUpVoted(true);
            setDownVoted(false);
            setOriginal(false);
        }
        else{
            if(downVoted){
                setUpVotes(upVotes + 1);
                setUpVoted(false);
                setOriginal(true);
            }
        }
    };

    const decreaseVotes = () => {
        if (originalState) {
            setUpVotes(upVotes - 1);
            setUpVoted(false);
            setDownVoted(true);
            setOriginal(false);
        }
        else{
            if(upVoted){
                setUpVotes(upVotes - 1);
                setUpVoted(false);
                setOriginal(true);
            }
        }
    };

    useEffect(() => {
        setPost({
            post: {
                title: "Titulo",
                body:"body"
            },
            user: {
                name: "Thomas"
            },
            community: {
                name: "Arch Linux"
            },
        })
        fetchPostData();
    }, []);


    const fetchPostData = async () => {
        try {
            console.log("id", id)
            const response = await fetch(BASE_URL + '/post/' + id); // Example endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            const postData = await response.json();
            console.log(postData)
            setPost(postData);
            setProfilePicture(`${BASE_URL}/profile-picture/${postData.user.id}`)
            setUpVotes(0);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };


    if (!post) {
        return <div className='text-white my-4'>Loading...</div>; // Placeholder while loading data
    }


    return (
      <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4">
        <div className="mt-8 h-16 flex items-center">
          <Link to="/"><img src={leftArrow} className="max-h-8"></img></Link>
          <Link to={"/profile/" + post.user.id}><img src={profilePicture} className="rounded-full max-h-16 ml-8"></img></Link>     
          <Link to={"/profile/" + post.user.id}><div className="text-white font-bold text-xl ml-4">{post.user.username}</div></Link>          
        </div>
        <div className=' text-2xl font-bold text-white h-10 mb-1 mt-8'>
          {post.post.title}
        </div>
        <div className='text-white h-10 mb-1 mt-8'>
          {post.post.body}
        </div>
        <div className='flex justify-between mt-6 mb-4'>
          <div className='bg-black3 flex items-center px-3 py-2 rounded-xl'>
              <img src={upArrow} className='w-5 rotate-180 mr-2'onClick={incrementVotes}></img>
              <div className='mr-2 text-white'>{upVotes}</div>
              <img src={upArrow} className='w-5 cursor-pointer'onClick={decreaseVotes}></img>
          </div>
          <div className='flex justify-end'>
            <div className='w-12 bg-black3 flex items-center justify-around px-2 py-2 rounded-xl mr-4'>
              <img src={comment} className='w-6 mx-1'></img>
            </div>   
          </div>
        </div>
      </div>
    );
};

export default VisualizePost;
