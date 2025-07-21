import React, { useRef, useEffect, lazy, Suspense  } from "react";


const ReelsLike = lazy(() => import('./ReelsLike'));

const Reel = ({ src, user, isMuted, onToggleMute }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  // Auto play/pause when in view
 
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.9 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  // Sync global mute with video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  return (<>
    <div className="flex items-end">
      <div
        ref={containerRef}
        className="relative h-screen w-full snap-start flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          className="h-[95vh] my-[2.5vh] w-full object-cover rounded-xl"
          loop
          playsInline
        // No click here, autoplay handled above
        />
        {/* Mute Toggle Button */}
        <button
          onClick={onToggleMute}
          className="absolute top-10 right-1 text-white bg-black bg-opacity-50 px-2 py-2 rounded-full text-sm">
          {isMuted ? "🔇" : "🔊"}
        </button>
        <div className="absolute bottom-30 left-6 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-400"><img className='object-cover w-8 h-8 rounded-full' src={user?.pic} alt="" /></div> {/* Profile Pic Placeholder */}
            <span className="text-md font-semibold">{user?.username}</span>
            <span className="text-md border px-3 py-1 rounded-md cursor-pointer">Follow</span>
          </div>
        </div>
      </div>
    
        <ReelsLike />
   
    </div>
  </>);
};
export default Reel;
