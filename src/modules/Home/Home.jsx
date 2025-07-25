import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const HomeSIdeBar = lazy(() => import('../../components/HomeSIdeBar'));
const SingleActiveVideo = lazy(() => import('../../components/SingleActiveVideo'));
import { HeartIcon, EllipsisHorizontalIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline';


const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate()
  const port = import.meta.env.VITE_API_BASE_URL
  const [data, setData] = useState([])
  useEffect(() => {
    const getPost = async () => {
      console.log('allposts');
      const token = localStorage.getItem('user:token')
      const response = await fetch(`${port}/api/allpost`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',   // ✅ सही
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }
      const datas = await response.json();
      setData(datas);
    };
    getPost();
  }, []);

  const handleLikes = async (_id) => {
    try {
      const token = localStorage.getItem('user:token')
      const response = await fetch(`${port}/api/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: _id })
      })
      const result = await response.json();

      if (result?.isLikes) {
        // ✅ Update likes in UI immediately
        setData(prev => ({
          ...prev,
          posts: prev.posts.map(post =>
            post._id === _id
              ? { ...post, likes: [...post.likes, data.user._id] }
              : post
          )
        }));
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleUnLikes = async (_id) => {
    try {
      const token = localStorage.getItem('user:token')
      const response = await fetch(`${port}/api/unlikes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: _id })
      })
      const result = await response.json();
      if (result?.isLikes === false) {
        // ✅ Update likes in UI immediately
        setData(prev => ({
          ...prev,
          posts: prev.posts.map(post =>
            post._id === _id
              ? { ...post, likes: post.likes.filter(uid => uid !== data.user._id) }
              : post
          )
        }));
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile(); // initial check
    window.addEventListener('resize', checkIsMobile); // update on resize
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (<>
    <div className={`${isMobile ? '' : 'flex items-center justify-center w-screen h-screen'} bg-black text-white `}>
     
        <HomeSIdeBar />

      <div className={`  flex ${isMobile ? 'w-full mt-[5vh] h-[93vh]' : 'border-l border-white w-[80%] h-screen'}`}>
        <div className={`${isMobile ? 'w-full ' : 'w-[60%]'} p-4 overflow-y-scroll scrollbar-hide`}>
          <div className='flex flex-col items-center p-4'>
            {data?.posts?.map((item, index) => {
              const Loginuser = data?.user?._id
              const isAlreadyLikes = item.likes.length > 0 && item.likes.includes(Loginuser)
              return (
                <div key={index} className="w-full max-w-md mx-auto  rounded-md bg-black text-white font-sans mb-4">
                  <div onClick={() => navigate(`/profile/${item?.user?.username}`)} className="flex items-center justify-between  py-3">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-gray-400"><img className='object-cover w-8 h-8 rounded-full' src={item?.user?.pic} alt="" /></div>
                      <span className="text-sm font-semibold">{item?.user?.username}</span>
                      <span className="text-xs opacity-40">67w</span>
                    </div>
                    <span className='w-5'><EllipsisHorizontalIcon className='cursor-pointer' /></span>
                  </div>
                  <div className="w-full border px-1 rounded-sm border-neutral-700">
                    {item?.mediaType === 'image' ?
                      <img
                        className="w-full h-[400px] object-contain bg-black"
                        src={item?.image}
                        alt="post"
                      />
                      :
                      <Suspense fallback={<div className="text-white text-center p-10">Loading form...</div>}>
                        <SingleActiveVideo
                          src={item?.image}
                        />
                      </Suspense>
                    }
                  </div>
                  <div className="flex justify-between  py-2 text-xl">
                    <div className='w-30 flex items-center justify-center gap-2.5'>
                      <motion.span
                        key={isAlreadyLikes} // forces re-render to animate on like/unlike
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                        onClick={() => isAlreadyLikes ? handleUnLikes(item?._id) : handleLikes(item?._id)}
                        className="w-7 cursor-pointer"
                      >
                        <HeartIcon
                          fill={isAlreadyLikes ? 'red' : 'none'}
                          color={isAlreadyLikes ? 'red' : 'white'}
                          className="w-6 h-6"
                        />
                      </motion.span>

                      <span className="text-sm opacity-60">
                        {item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}
                      </span>

                      <span className='w-7'><ChatBubbleOvalLeftIcon className='cursor-pointer' /></span>
                    </div>
                    <span className='w-7'><BookmarkIcon className='cursor-pointer' /></span>
                  </div>
                  <div className="px-4 pb-2 text-sm">
                    <span className="font-semibold">aamir</span> Loved this place! 🔥🔥
                  </div>
                  <div className="  py-2  border-neutral-700">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full bg-transparent border-b border-neutral-700 pb-3 outline-none text-sm placeholder-gray-400"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {!isMobile && (
          <div className=' h-screen w-[35%] p-4'>
            <div className='flex items-center justify-between py-7'>
              <div className='flex items-center gap-5'>
                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                <div className='flex flex-col'>
                  <span className='text-[14px]'>moha_mmad_aamir</span>
                  <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                </div>
              </div>
              <div className='text-[#007ccd] cursor-pointer'>Switch</div>
            </div>

            <div>
              <div className='flex items-center justify-between py-7'>
                <span className=' text-neutral-500 font-semibold'>Suggested for You</span>
                <span className='text-[#007ccd] cursor-pointer'>See all</span>
              </div>

              <main className='flex flex-col gap-4 '>
                <div className='flex items-center justify-between '>
                  <div className='flex items-center gap-5'>
                    <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                    <div className='flex flex-col'>
                      <span className='text-[14px]'>moha_mmad_aamir</span>
                      <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                    </div>
                  </div>
                  <div className='text-[#007ccd] cursor-pointer'>Follow</div>
                </div>


              </main>
            </div>
          </div>
        )}
      </div>
    </div >
  </>)
}

export default Home