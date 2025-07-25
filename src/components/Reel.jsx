import React, { useRef, useEffect, lazy, Suspense, useState } from "react";


const ReelsLike = lazy(() => import('./ReelsLike'));

const Reel = ({ src, user, isMuted, onToggleMute }) => {
  const [isMobile, setIsMobile] = useState(false);
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
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile(); // initial check
    window.addEventListener('resize', checkIsMobile); // update on resize
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (<>
    <div className="flex items-end">
      <div
        ref={containerRef}
        className="relative h-screen w-full snap-start flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src={src}
          className="md:h-[95vh] h-full my-[2.5vh] w-full object-cover md:rounded-xl"
          loop
          playsInline
        />

        {/* Mute Button */}
        <button
          onClick={onToggleMute}
          className="absolute top-10 right-1 text-white bg-black bg-opacity-50 px-2 py-2 rounded-full text-sm"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* User Info */}
        <div className="absolute bottom-30 left-6 text-white">
          <div className="flex items-center space-x-2">
            <img className="w-8 h-8 rounded-full object-cover" src={user?.pic} alt="" />
            <span className="font-semibold">{user?.username}</span>
            <span className="text-md border px-3 py-1 rounded-md cursor-pointer">Follow</span>
          </div>
        </div>

        {/* ✅ ReelsLike Component with proper position */}
        <div className="absolute right-4 bottom-20 z-10">
          <ReelsLike />
        </div>
      </div>
    </div>

  </>);
};
export default Reel;
