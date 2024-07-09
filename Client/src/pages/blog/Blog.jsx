import { Spinner } from 'flowbite-react';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const posts = [
  {
    id: 1,
    title: 'How I Increased My Conversion Rate by 50%',
    href: '#',
    description:
      "I've been working on my website for months, and finally found some techniques that really made a difference. In this post, I share the strategies that helped me boost my conversion rate.",
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Lessons Learned from My First Marketing Campaign',
    href: '#',
    description:
      "Launching my first marketing campaign was both exciting and challenging. Here are the lessons I learned and what I'll do differently next time.",
    date: 'Apr 5, 2024',
    datetime: '2024-04-05',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Sarah Lee',
      role: 'Marketing Manager',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1502691876148-a84978e59af8?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Why Authenticity Matters in Marketing',
    href: '#',
    description:
      "In today's market, authenticity is key to connecting with your audience. Here's why being genuine can make all the difference in your marketing efforts.",
    date: 'May 22, 2024',
    datetime: '2024-05-22',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'David Brown',
      role: 'Content Strategist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'My Journey to Becoming a Marketing Expert',
    href: '#',
    description:
      "Everyone starts somewhere. In this post, I recount my journey from a novice to a marketing expert, sharing the highs and lows along the way.",
    date: 'Jun 10, 2024',
    datetime: '2024-06-10',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Emily Clark',
      role: 'Marketing Consultant',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
  },
];

const Blog = () => {
  const { loading } = useContext(AuthContext);
  const [selectedPost, setSelectedPost] = useState(null);
  const { ref, inView } = useInView({ threshold: 0 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    } else {
      controls.start({
        opacity: 0,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="bg-white py-24 sm:py-32 shadow-lg rounded-lg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl lg:mx-0 text-center"
            initial={{ opacity: 0 }}
            animate={controls}
            ref={ref}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </motion.div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between p-6 bg-white shadow-md rounded-lg transition transform hover:scale-105" onClick={() => openModal(post)}>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50 shadow-md" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4">{selectedPost.title}</h3>
            <p className="text-gray-700 mb-4">{selectedPost.description}</p>
            <div className="flex items-center gap-x-4">
              <img src={selectedPost.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50 shadow-md" />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">{selectedPost.author.name}</p>
                <p className="text-gray-600">{selectedPost.author.role}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
