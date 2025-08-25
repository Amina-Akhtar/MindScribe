import React, { use, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Background from './Background';
import { FiSearch, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { useSelector,useDispatch } from 'react-redux';
import { updatePost } from '../store/postSlice';
import { motion } from 'framer-motion';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const username = useSelector((state) => state.user.username) || 'User';

  useEffect(() => {
  const fetchPublicPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/public', { withCredentials: true });
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to load public posts:', err);
    }
  };
  fetchPublicPosts();
}, []);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

const handleLike = async (index) => {
  const postId = posts[index]._id;
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/${postId}/like`, {username}, {
      withCredentials: true
    });
    const updated = [...posts];
    updated[index] = res.data;
    setPosts(updated);
    dispatch(updatePost(res.data));
  } catch (err) {
    console.error('Failed to like post', err);
  }
};

const handleDislike = async (index) => {
  const postId = posts[index]._id;
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/${postId}/dislike`, {username}, {
      withCredentials: true
    });
    const updated = [...posts];
    updated[index] = res.data;
    setPosts(updated);
    dispatch(updatePost(res.data));
  } catch (err) {
    console.error('Failed to dislike post', err);
  }
};


  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="relative z-0 h-screen overflow-hidden">
      <div className="ml-15 absolute top-0 left-0 w-full h-full z-0">
        <Background />
      </div>

      <div className="flex h-full relative z-10">
        <Sidebar />


        <main className="ml-20 w-full h-full overflow-y-auto px-6 py-8 sm:px-12">
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center bg-[#b3a0d9] text-black rounded-full shadow-xl px-4 py-3">
              <FiSearch className="text-black mr-3" />
              <input
                type="text"
                placeholder="Search posts"
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent w-full outline-none text-black placeholder-black"
              />
            </div>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#b3a0d9] to-transparent mb-10 opacity-60" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-20">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="bg-[#f8f4fc] border border-gray-300 rounded-xl p-6 text-black w-full sm:max-w-xl mx-auto shadow-lg cursor-pointer flex flex-col"
              >
                <p className="mb-4 text-black font-medium">{post.text}</p>

                <div className="h-64 w-full overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.3)]">
                  <img
                    src={post.image}
                    alt="Post Image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex justify-start space-x-6 text-black mt-3">
                  <button
                    onClick={() => handleLike(index)}
                    className="flex items-center space-x-1 hover:text-green-400"
                  >
                    <FiThumbsUp /> <span>{post.likes.length}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(index)}
                    className="flex items-center space-x-1 hover:text-red-400"
                  >
                    <FiThumbsDown /> <span>{post.dislikes.length}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;