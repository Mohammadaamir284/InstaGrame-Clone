import React, { useState, useEffect } from "react";
import HomeSIdeBar from '../../components/HomeSIdeBar'
import Reel from '../../components/Reel';
const Home2 = () => {
  const port = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState([])
  const imagePosts = data.filter(item => item.mediaType === "video");
  const token = localStorage.getItem('user:token')
  useEffect(() => {
    const getPost = async () => {
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
      const shuffledPosts = datas.posts.sort(() => Math.random() - 0.5);
      setData(shuffledPosts);
    };
    getPost();
  }, []);


  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };


  return (
    <div className='flex items-center justify-center bg-black text-white w-screen h-screen'>
      <HomeSIdeBar />
      <div className='border-l border-white w-[80%] h-screen flex  justify-center overflow-y-scroll scrollbar-hide snap-y snap-mandatory '>

        <div className="h-screen  flex flex-col items-center gap-y-13">
          {imagePosts.map((item, index) => (
            <Reel key={index} src={item.image} user={item?.user} isMuted={isMuted} onToggleMute={toggleMute} />
          ))}
        </div>


      </div>
    </div>
  )
}

export default Home2