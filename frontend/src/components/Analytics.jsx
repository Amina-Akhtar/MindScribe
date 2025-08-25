import React, { use } from 'react';
import Sidebar from './Sidebar';
import Background from './Background';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const monthLabels = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const postsByMonth = posts => {
  const analytics = Array(12).fill(null).map(() => ({
    likes: 0,
    dislikes: 0,
    public: 0,
    private: 0,
  }));
  posts.forEach(post => {
    const month = dayjs(post.createdAt).month();
    analytics[month].likes += post.likes;
    analytics[month].dislikes += post.dislikes;
    if (post.isPublic) {
      analytics[month].public += 1;
    } else {
      analytics[month].private += 1;
    }
  });
  return analytics;
};
function Analytics() {
  const [posts, setPosts] = useState([]);
  const monthlyAnalytics = postsByMonth(posts);
  const publicData = monthlyAnalytics.map(a => a.public);
  const privateData = monthlyAnalytics.map(a => a.private);
  const username = useSelector((state) => state.user.username) || 'User';

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts', { withCredentials: true })
      .then(res => {
        const newPosts = res.data.map(post => ({
          ...post,
          likes: post.likes.length,
          dislikes: post.dislikes.length,
        }));
        setPosts(newPosts);
      })
      .catch(err => console.error('Failed to load posts', err));
  }, []);


  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Public Posts',
        data: publicData,
        backgroundColor: 'rgba(215, 189, 226, 0.4)',
        borderColor: '#b39ddb',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Private Posts',
        data: privateData,
        backgroundColor: 'rgba(255, 209, 178, 0.4)',
        borderColor: '#ffab91',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#f3eaff',
        titleColor: '#5d4a7a',
        bodyColor: '#5d4a7a',
        borderColor: '#b3a0d9',
        borderWidth: 1,
        padding: 10,

      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
          color: 'black',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(215, 189, 226, 0.2)',
        },
      },
    },
  };

  return (
    <div className="relative z-0 h-screen overflow-hidden">
      <div className="ml-15 absolute top-0 left-0 w-full h-full z-0">
        <Background />
      </div>

      <div className="flex h-full relative z-10">
        <Sidebar />
        <main className="ml-20 w-full h-full overflow-y-auto px-6 py-8 sm:px-12">
          <div className="max-w-md mx-auto mb-6">
            <div className="flex flex-col items-center px-4 py-1">
              <h1 className="text-4xl font-bold text-[#5d4a7a]">Analytics</h1>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#b3a0d9] to-transparent mb-8 opacity-60" />

          <div className="flex justify-center items-center w-full">
            <motion.div
              className="w-full max-w-4xl h-[390px] bg-[#f8f4fc] p-10 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <Line data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
            </motion.div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Analytics;
