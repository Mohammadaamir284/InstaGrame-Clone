import { useEffect, useState, useRef } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

export default function Gallery({ setImageClicked, owner }) {
    const [posts, setPosts] = useState([]);
     const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    /* ──────────────  GLOBAL video state  ────────────── */
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    /* refs array so we can .play() / .pause() all elements at once */
    const videoRefs = useRef([]);

    /* ──────────────  fetch posts once  ────────────── */
    const token = localStorage.getItem("user:token");
    const port = import.meta.env.VITE_API_BASE_URL
    useEffect(() => {
        const getPost = async () => {
            const res = await fetch(`${port}/api/post/${owner}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setPosts(data.posts.filter((p) => p.mediaType === "video"));
        };
        if (token) getPost();
    }, [owner, token]);

    /* ──────────────  helper functions  ────────────── */
    const openViewer = (idx) => {
        setCurrentIndex(idx);
        setImageClicked(true);
        setIsPlaying(true);                // ensure autoplay on open
    };

    const closeViewer = () => {
        setCurrentIndex(null);
        setImageClicked(false);
    };

    const goPrev = () =>
        setCurrentIndex((p) => (p === 0 ? posts.length - 1 : p - 1));
    const goNext = () =>
        setCurrentIndex((p) => (p === posts.length - 1 ? 0 : p + 1));

    /* ──────────────  GLOBAL mute / play handlers  ────────────── */
    const toggleMute = () => setIsMuted((m) => !m);
    const togglePlay = () => setIsPlaying((p) => !p);

    /* Whenever mute / play state changes ​→ all <video> elements update */
    useEffect(() => {
        videoRefs.current.forEach((v) => {
            if (!v) return;
            v.muted = isMuted;
            if (isPlaying) {
                const playPromise = v.play?.();
                if (playPromise) playPromise.catch(() => { });
            } else {
                v.pause?.();
            }
        });
    }, [isMuted, isPlaying, posts]);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile(); // initial check
        window.addEventListener('resize', checkIsMobile); // update on resize
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    /* ──────────────  RENDER  ────────────── */
    return (
        <main className="relative flex flex-col items-center mt-5">
            {/* ───── Grid view ───── */}
            {currentIndex === null && (
                <div className={`${isMobile ? '':'w-[70vw]'}  flex flex-wrap gap-1`}>
                    {posts.map((post, idx) => (
                        <video
                            key={post._id}
                            src={post.image}
                            muted
                            onClick={() => openViewer(idx)}
                            className={`${isMobile ? 'w-[126px]':'w-[296px] h-[350px]'}  object-cover cursor-pointer`}
                        />
                    ))}
                </div>
            )}
            {/* ───── Single viewer ───── */}
            {!isMobile && currentIndex !== null && (
                <>
                    {/* backdrop */}
                    <div
                        className="absolute inset-0 backdrop-blur-sm z-30"
                        onClick={closeViewer}
                    />

                    <div className="flex items-center justify-center w-full z-40">
                        {/* Prev */}
                        <button
                            onClick={goPrev}
                            className="absolute left-4 bg-white text-black p-2 rounded-full"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>

                        {/* main video + placeholder side panel */}
                        <div className="flex shadow-lg">


                            <video
                                ref={(el) => (videoRefs.current[currentIndex] = el)}
                                src={posts[currentIndex]?.image}
                                className="h-[650px] rounded-l-xl object-contain "
                                muted={isMuted}
                                loop
                                autoPlay
                                playsInline
                            />


                            <div className="w-[400px] h-[650px] rounded-r-xl bg-gray-900" />
                        </div>

                        {/* Next */}
                        <button
                            onClick={goNext}
                            className="absolute right-4 bg-white text-black p-2 rounded-full"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>

                        {/* Close */}
                        <button
                            onClick={closeViewer}
                            className="absolute top-4 right-4 bg-white text-black p-1 rounded-full"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        {/* Play / Pause */}
                        <button
                            onClick={togglePlay}
                            className="absolute bottom-5 left-70  bg-black/60 p-2 rounded-full"
                        >
                            {isPlaying ? (
                                <PauseIcon className="w-6 h-6 text-white" />
                            ) : (
                                <PlayIcon className="w-6 h-6 text-white" />
                            )}
                        </button>

                        {/* Mute / Un‑mute */}
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-5 right-170 bg-black/60 p-2 rounded-full"
                        >
                            {isMuted ? (
                                <SpeakerXMarkIcon className="w-6 h-6 text-white" />
                            ) : (
                                <SpeakerWaveIcon className="w-6 h-6 text-white" />
                            )}
                        </button>

                    </div>
                </>
            )}
        </main>
    );
}
