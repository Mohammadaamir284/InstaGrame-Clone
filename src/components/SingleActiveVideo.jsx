// AutoPlayVideo.jsx
import { useEffect, useRef, useState } from "react";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlayIcon,
  PauseIcon
} from "@heroicons/react/24/solid";

export default function AutoPlayVideo({ src, className = "" }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  /* ────────── 1. Auto Play / Pause when 80 % visible ────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.8] }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /* ────────── 2. Global mute sync ────────── */
  useEffect(() => {
    const handler = (e) => {
      const muted = e.detail.muted;
      if (videoRef.current) {
        videoRef.current.muted = muted;
        setIsMuted(muted);
      }
    };
    window.addEventListener("video-mute-toggle", handler);
    return () => window.removeEventListener("video-mute-toggle", handler);
  }, []);

  /* ────────── 3. Local toggle functions ────────── */
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;

    // broadcast to everyone
    window.dispatchEvent(
      new CustomEvent("video-mute-toggle", { detail: { muted: next } })
    );
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative w-full h-[500px] bg-black ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain select-none"
        muted               // default muted so mobile autoplay works
        playsInline
        loop
        preload="metadata"
      />

      {/* ⏯ Play / Pause */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 left-4 rounded-full bg-black/60 p-2 text-white backdrop-blur-md"
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </button>

      {/* 🔇 / 🔊 Mute */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 rounded-full bg-black/60 p-2 text-white backdrop-blur-md"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-6 h-6" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
