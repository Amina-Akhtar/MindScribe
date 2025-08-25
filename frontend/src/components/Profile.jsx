import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Background from './Background';
import Post from './Post';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdPostAdd } from 'react-icons/md';
import { FiUnlock, FiLock } from "react-icons/fi";
import { TbFileExport } from "react-icons/tb";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf'
import CryptoJS from "crypto-js";
import axios from 'axios';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const username = useSelector((state) => state.user.username) || 'User';

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts', { withCredentials: true })
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to load posts:', err));
      
    setPosts(posts)
      ;
  },[]);


  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (index) => {
    setEditPost(index);
    setIsModalOpen(true);
  };

  const handleImageDelete = async (url) => {
    const publicId = url.split('/').pop()?.split('.').shift();
    if (!publicId) {
      console.log("Image deletion from cloudinary failed")
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = CryptoJS.SHA1(`public_id=${publicId}&timestamp=${timestamp}qMgRPwygTMklPanpnoUf9bE95Lg`).toString(CryptoJS.enc.Hex);
    await axios.post(`https://api.cloudinary.com/v1_1/dzwamfbfp/image/destroy`,
      {
        public_id: publicId,
        signature,
        api_key: '346819876489715',
        timestamp
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
      }
    );
    console.log("Image deleted from cloudinary")
  };

  const handleDelete = async (index) => {
    const postId = posts[index]._id;
    const imageUrl = posts[index].image;
    // Delete image from Cloudinary
    handleImageDelete(imageUrl);
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`,{ withCredentials: true });
      const updated = posts.filter((_, i) => i !== index);
      setPosts(updated);
      toast.success('Post deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to delete post. Please try again.';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleExport = async (index) => {
    const post = posts[index];
    if (post) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      const imageUrl =post.image;
      // Convert image to base64
      const imgData = await fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob)
        }));
      // Load image to get natural dimensions
  const img = new Image();
  img.src = imgData;

  img.onload = () => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const maxWidth = pageWidth - 40; // 20mm margin on each side
    const scale = maxWidth / img.width;
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    pdf.setFontSize(16);
    pdf.text(`${username} Post`, 20, 20);
    pdf.setFontSize(12);
    pdf.text(`${post.text}`, 20, 30);
    pdf.addImage(imgData, 'PNG', 20, 50, 170, 140);
    pdf.save(`${username} Post.pdf`);
    console.log("Post exported as PDF!");}
    };
  }
  return (
    <div className="relative z-0 h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Background />
      </div>

      <div className="flex h-full relative z-10">
        <Sidebar />

        <main className="ml-20 w-full h-full overflow-y-auto px-6 py-8 sm:px-12">
          <div className="max-w-md mx-auto mb-6">
            <div className="flex flex-col items-center px-4 py-1">
              <h1 className="text-4xl font-bold text-[#5d4a7a]">Welcome {username}</h1>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#b3a0d9] to-transparent mb-6 opacity-60" />

          <div className="flex justify-center mb-5">
            <motion.button
              onClick={openModal}
              className="flex items-center space-x-2 px-8 py-3 bg-[#b3a0d9] text-black rounded-full font-medium hover:bg-[#9c89c0] transition shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdPostAdd size={20} />
              <span>What’s New</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-20">
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="relative bg-[#f8f4fc] border border-gray-300 rounded-xl p-6 text-black w-full sm:max-w-xl mx-auto shadow-lg flex flex-col"
              >
                <div className="flex justify-between items-center px-1 py-1 text-black font-medium">

                  <button
                    onClick={() => handleExport(index)}
                    className="flex items-center space-x-1 text-sm px-6 py-3 bg-[#b3a0d9] text-black rounded-full hover:bg-[#9c89c0]"
                  >
                    <TbFileExport size={18} />
                    <span>Export</span>
                  </button>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="hover:text-green-500 transition"
                      title="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="hover:text-red-500 transition"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="pt-5 mb-4 text-black font-medium">{post.text}</p>

                <div className="h-64 w-full overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.3)] mb-4">
                  <img
                    src={post.image}
                    alt="Post Image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex justify-start space-x-6 text-black mt-2">
                  <button

                    className="flex items-center space-x-1 hover:text-green-400"
                  >
                    <FiThumbsUp /> <span>{post.likes.length}</span>
                  </button>
                  <button

                    className="flex items-center space-x-1 hover:text-red-400"
                  >
                    <FiThumbsDown /> <span>{post.dislikes.length}</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex items-center space-x-1 hover:text-[#b3a0d9]"
                    >
                      {post.isPublic ? <FiUnlock /> : <FiLock />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {isModalOpen && (
            <Post
              onClose={() => {
                setIsModalOpen(false);
                setEditPost(null);
              }}
              onSave={({ text, imagePreview, isPublic }) => {

                const updated = [...posts];

                if (editPost !== null) {
                  const postId = posts[editPost]._id;
                  axios.put(`http://localhost:5000/api/posts/${postId}`, {
                    text,
                    image: imagePreview,
                    isPublic
                  }, { withCredentials: true })
                    .then(res => {
                      const updated = [...posts];
                      updated[editPost] = res.data;
                      setPosts(updated);
                    });
                }
                else {
                  axios.post('http://localhost:5000/api/posts', {
                    text,
                    image: imagePreview,
                    isPublic
                  }, { withCredentials: true })
                    .then(res => setPosts([res.data, ...posts]));
                }
                setIsModalOpen(false);
                setEditPost(null);
              }}
              previousPost={editPost !== null ? posts[editPost] : null}
            />

          )}

        </main>
      </div>
    </div>
  );
}
export default Profile;
