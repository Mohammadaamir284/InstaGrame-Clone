import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function Gallery({ setImageClicked, owner }) {
    const [PostImage, setPostImage] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null);
    const port = import.meta.env.VITE_API_BASE_URL;
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
    const token = localStorage.getItem('user:token')
    useEffect(() => {
        const getPost = async () => {
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
    };
    if (token) getPost();      
}, [token, port, owner]);

return (<>
    {/* {PostImage ? */}
    <main className="relative flex flex-col items-center mt-5">
        {currentIndex === null ? (
            // Grid view
            <div className="w-[70vw] flex flex-wrap items-center gap-1 ">
                {imagePosts.map((item, index) => (
                    <div key={index} onClick={() => handleImageClick(index)}>
                        <img
                            className="w-[296px] h-[350px] object-cover cursor-pointer"
                            src={item.image}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        ) : (
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
                <div className="  flex  shadow-lg z-50">
                    <img
                        src={imagePosts[currentIndex]?.image}
                        alt="Main"
                        className=" w-[600px] h-[650px] bg-gray-600 rounded-l-xl object-cover"
                    />
                    <div className=" w-[400px] h-[650px]  rounded-r-xl bg-gray-900"></div>
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
        {imagePosts[currentIndex] &&
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm z-30" onClick={exitViewer}></div>

        }
    </main>
    {/* :

            <div>No Post</div>

        } */}


</>);
}
