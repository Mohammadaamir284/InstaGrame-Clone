import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon, ArrowLeftIcon} from '@heroicons/react/24/outline';
import { } from '@heroicons/react/24/outline';
import HomeSIdeBar from "./HomeSIdeBar";
export default function Gallery({ setImageClicked, owner }) {
    const [PostImage, setPostImage] = useState([])
    const [userDetail, setuserDetail] = useState({})
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const port = import.meta.env.VITE_API_BASE_URL
    const imagePosts = PostImage.filter(item => item.mediaType === "image");
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setImageClicked(true);
    };

    const goPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? imagePosts.length - 1 : prev - 1
        );
    };

    const goNext = () => {
        setCurrentIndex((prev) =>
            prev === imagePosts.length - 1 ? 0 : prev + 1
        );
    };

    const exitViewer = () => {
        setCurrentIndex(null);
        setImageClicked(false);
    };
    useEffect(() => {
        const getPost = async () => {
            const token = localStorage.getItem('user:token')
            const response = await fetch(`${port}/api/post/${owner}`, {
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
            setPostImage(data.posts);
            setuserDetail(data.userDetail);
        };
        getPost();
    }, [port, owner]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile(); // initial check
        window.addEventListener('resize', checkIsMobile); // update on resize
        return () => window.removeEventListener('resize', checkIsMobile);
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
                setPostImage(prev =>
                    prev.map(post =>
                        post._id === _id
                            ? { ...post, likes: [...post.likes, data.user._id] }
                            : post
                    )
                );
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
                setPostImage(prev =>
                    prev.map(post =>
                        post._id === _id
                            ? { ...post, likes: post.likes.filter(uid => uid !== data.user._id) }
                            : post
                    )
                );
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (<>


        <main className={`${isMobile ? '' : 'mt-5'} relative flex flex-col items-center `} >
            {!isMobile && currentIndex !== null && (
                // Grid view

                // Single image viewer with left/right controls
                <div className=" flex items-center justify-center w-full">
                    {/* Left Button */}
                    <button
                        onClick={goPrevious}
                        className="absolute left-2 bg-white text-black p-2 rounded-full z-50"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>

                    {/* Main Image */}
                    <div className={`${isMobile ? 'flex flex-col' : 'flex'}  shadow-lg z-50`}>
                        <img
                            src={imagePosts[currentIndex]?.image}
                            alt="Main"
                            className={`${isMobile ? 'object-contain' : 'w-[600px] h-[650px] object-cover rounded-l-xl'}  bg-gray-600  `}
                        />
                        <div className={`${isMobile ? 'object-contain ' : 'w-[400px] h-[650px] rounded-r-xl bg-gray-900'}    `}></div>
                    </div>

                    {/* Right Button */}
                    <button
                        onClick={goNext}
                        className="absolute right-2 bg-white text-black p-2 rounded-full z-50"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* Close Button */}

                </div>
            )}

            {isMobile && currentIndex !== null && (
                <div

                    className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm overflow-y-auto"
                    onClick={exitViewer}>
                    <div
                        className="min-h-screen flex flex-col items-center justify-start "
                        onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <div className=" w-full h-[6vh] mb-4 bg-black  sticky top-0 z-50 flex items-center px-2 border-b">
                            <ArrowLeftIcon onClick={exitViewer} className="w-6 h-6" />
                            <div className="text-center w-full font-semibold"> Post</div>
                        </div>

                        {/* SCROLLABLE ALL IMAGES */}
                        {imagePosts.map((item, index) => {
                            const currentUser = JSON.parse(localStorage.getItem('userdata'))
                            const isAlreadyLikes = item.likes.length > 0 && item.likes.includes(currentUser?._id)
                            return (
                                <div key={index} className="w-full mb-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-3">
                                        <div className="flex items-center space-x-2 cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-gray-400">
                                                <img
                                                    className="object-cover w-8 h-8 rounded-full"
                                                    src={userDetail.pic}
                                                    alt=""
                                                />
                                            </div>
                                            <span className="text-sm font-semibold">{userDetail.username}</span>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={`image-${index}`}
                                        className="w-full object-contain border-y"
                                    />

                                    {/* Footer - Likes & Icons */}
                                    <div className="h-[10vh] p-4">
                                        <div className="flex justify-between py-2 text-xl">
                                            <div className="flex items-center gap-2.5">
                                                <motion.span
                                                    key={isAlreadyLikes}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1.4 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                                                    onClick={() =>
                                                        isAlreadyLikes
                                                            ? handleUnLikes(item?._id)
                                                            : handleLikes(item?._id)
                                                    }
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
                                                <span className="w-7">
                                                    <ChatBubbleOvalLeftIcon className="cursor-pointer" />
                                                </span>
                                            </div>
                                            <span className="w-7">
                                                <BookmarkIcon className="cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}
            {currentIndex === null && (
                <div className={` ${isMobile ? '' : 'w-[70vw]'} flex flex-wrap items-center gap-1`}>
                    {imagePosts.map((item, index) => (
                        <div key={index} onClick={() => handleImageClick(index)}>
                            <img
                                className={`${isMobile ? 'w-[126px] h-[170px]' : 'w-[296px] h-[350px]'} object-cover cursor-pointer`}
                                src={item.image}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            )}
            {imagePosts[currentIndex] &&
                <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-30" onClick={exitViewer}></div>
            }
        </main>
        {/* :

            <div>No Post</div>

        } */}


    </>);
}
