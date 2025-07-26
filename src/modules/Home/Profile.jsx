import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import HomeSIdeBar from '../../components/HomeSIdeBar'


const Gallery = lazy(() => import('../../components/Gallery'));
const VideoGallery = lazy(() => import('../../components/VideoGallery'));

const Profile = () => {
  const port = import.meta.env.VITE_API_BASE_URL 
  const navigate = useNavigate()
  const [visible, setVisible] = useState('A');
  const [visible1, setVisible1] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [FollowCount, setFollowCount] = useState({ adminfollow: [], userfollowed: [] });
  const [PostImage, setPostImage] = useState([])
  const [imageClicked, setImageClicked] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'saved') {
      setVisible('C');
    }
  }, [location]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userdata"));
    setIsUser(storedUser?.username === username);
    console.log('username');
  }, [username]); // ✅ correct

  useEffect(() => {
    const getPost = async () => {
      const token = localStorage.getItem('user:token')
      console.log('posts');
      const response = await fetch(`${port}/api/post/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',   // ✅ सही
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`Server error ${response.status}`);
      }
      const data = await response.json();
      setUserData(data.userDetail);
      setPostImage(data.posts);
      setIsFollow(data?.isFollow)
    };
    getPost();
  }, [port, username]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('user:token')
      const response = await fetch(`${port}/api/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: userData?.user })
      })
      const data = await response.json();
      setIsFollow(data?.isFollow)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async () => {
    console.log('error')
    try {
      const token = localStorage.getItem('user:token')
      const response = await fetch(`${port}/api/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: userData?.user })
      })
      const data = await response.json();
      setIsFollow(data?.isFollow)
    } catch (error) {
      console.log(error)
    }
  }

  // This effect only runs once when userData is loaded
  useEffect(() => {
    const followcount = async () => {
      if (!userData?.user) return;
      console.log('followcount');
      const token = localStorage.getItem('user:token')
      const followDetail = await fetch(`${port}/api/following/${userData.user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      const followreq = await followDetail.json();
      setFollowCount(followreq);
    };
    followcount();
  }, [userData]); // ✅ Safe now
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile(); // initial check
    window.addEventListener('resize', checkIsMobile); // update on resize
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);



  return (
    <div className="flex items-center justify-center bg-black text-white w-screen h-screen relative">
      <div className={`flex items-center justify-center w-full h-full ${visible1 ? 'blur-xs pointer-events-none select-none' : ''}`}>
        <HomeSIdeBar />
        <div className={` ${isMobile ? 'w-full h-[90vh]':'w-[80%] pl-7 py-7 h-screen'}   overflow-y-scroll scrollbar-hide  `}>
          <div className='flex justify-center items-center md:gap-20 gap-5 w-full py-5'>

            <div><img className={`rounded-full ${isMobile ? 'w-20 h-20':'w-35 h-35'}  object-cover bg-white`} src={userData?.pic} alt="" /></div>
            <div className='flex flex-col md:space-y-6 space-y-2'>
              <div className='flex items-center gap-3'>
                <div className='text-[24px] font-semibold'>{username}</div>
                {!isUser &&
                  <div onClick={isFollow ? handleUnfollow : handleFollow} className={` px-5 py-1 cursor-pointer rounded-xl text-xl ${isFollow ? "bg-neutral-600" : "bg-blue-600"}`}>  {isFollow ? "Unfollow" : "Follow"} </div>
                }
              </div>
              <div className='flex items-center gap-5'>
                <span className='flex gap-2 items-center'> {PostImage.length}<p className='opacity-45'>posts</p></span>

                <span onClick={() => setVisible1('A')} className='flex gap-2 items-center cursor-pointer'>
                  {Array.isArray(FollowCount.userfollowed) ? FollowCount.userfollowed.length : 0}
                  <p className='opacity-45'>followers</p>
                </span>
                <span onClick={() => setVisible1('B')} className='flex gap-2 items-center cursor-pointer'>
                  {Array.isArray(FollowCount.adminfollow) ? FollowCount.adminfollow.length : 0}

                  <p className='opacity-45'>following</p>
                </span>

              </div>
              <div className='flex flex-col'>
                <span className='bg-[#363636] w-fit rounded-full px-1.5'>@{userData?.username}</span>
              </div>
            </div>
          </div>
          <main className='border-t border-neutral-700 md:mt-10 flex flex-col items-center'>
            <section className='flex justify-center gap-25  mb-2  font-light'>
              <p className={`cursor-pointer pt-2 ${visible === 'A' ? 'text-white border-t-2' : 'opacity-60'} `} onClick={() => setVisible('A')}>Posts</p>
              <p className={`cursor-pointer pt-2 ${visible === 'B' ? 'text-white border-t-2' : 'opacity-60'} `} onClick={() => setVisible('B')}>Reels</p>
              {isUser &&
                <p className={`cursor-pointer pt-2 ${visible === 'C' ? 'text-white border-t-2' : 'opacity-60'} `} onClick={() => setVisible('C')}>Saved</p>
              }
            </section>
            {visible === 'A' && <main className={`${imageClicked ? ' absolute top-0 left-0 w-full h-full' : ' mb-7'} `} >
              <Suspense fallback={<div className="text-white text-center p-10">Loading form...</div>}>
                <Gallery owner={username} setImageClicked={setImageClicked} />
              </Suspense>
            </main>}

            {visible === 'B' && <main className={`${imageClicked ? ' absolute top-0 left-0 w-full h-full' : ' mb-7'} `}>
              <Suspense fallback={<div className="text-white text-center p-10">Loading form...</div>}>
                <VideoGallery owner={username} setImageClicked={setImageClicked} />
              </Suspense>
            </main>}
            {visible === 'C' && <main className=' w-[70vw]  flex flex-wrap items-center pl-1.5 gap-1 mb-7'>
              <div><img className="w-[210px] h-[210px] object-cover" src="/post.jpeg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/titan.jpg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/amir.png" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/post.jpeg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/titan.jpg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/amir.png" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/post.jpeg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/titan.jpg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/amir.png" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/post.jpeg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/titan.jpg" alt="" /></div>
              <div><img className="w-[210px] h-[210px] object-cover" src="/amir.png" alt="" /></div>
            </main>}
          </main>

        </div>

      </div>
      {visible1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            onClick={() => setVisible1(null)}
          ></div>
          <div className="relative z-10 bg-[#262626] py-2 rounded-xl shadow-lg text-black w-[30vw] h-[60vh]">
            <div className="flex flex-col text-white">
              <div className="font-semibold border-b w-full text-center border-neutral-600 pb-2">
                {visible1 === 'A' ? 'Followers' : 'Following'}
              </div>

              {/* ✅ Move data selection outside JSX */}
              {(() => {
                const data = visible1 === 'A' ? FollowCount.userfollowed : FollowCount.adminfollow;
                console.log('const data = visible1 ===  FollowCount.userfollowed : FollowCount.adminfollo');
                return (
                  <main className="flex flex-col gap-4 p-3 h-[53vh] overflow-y-scroll scrollbar-hide">
                    {data?.length === 0 ? (
                      <p className="text-center text-neutral-400">
                        No {visible1 === 'A' ? 'followers' : 'following'} yet.
                      </p>
                    ) : (
                      data?.map((item, index) => {
                        const user = visible1 === 'A' ? item.adminFollow : item.userFollowed;
                        return (
                          <div key={index}
                            onClick={() => {
                              navigate(`/profile/${user?.username}`),
                                setVisible1(null)
                            }}
                            className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-5">
                              <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user?.pic}
                                alt=""
                              />
                              <div className="flex flex-col">
                                <span className="text-[14px]">{user?.username}</span>
                                <span className="text-[14px] text-neutral-500 font-semibold">
                                  {user?.email}
                                </span>
                              </div>
                            </div>
                            {visible1 === 'A' ? (
                              <div className="text-white bg-[#474747] cursor-pointer p-1 rounded-xl">
                                Unfollow
                              </div>
                            ) : (
                              <div className="text-white bg-[#007ccd] cursor-pointer p-1 rounded-xl">
                                Following
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </main>
                );
              })()}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Profile