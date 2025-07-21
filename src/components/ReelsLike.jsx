import React from 'react'
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const ReelsLike = () => {
  return (
    <div className='mb-25 mx-6 flex flex-col gap-6 '>
        <div className='w-11 h-11 flex flex-col justify-center items-center '><HeartIcon /> <div className='text-[12px]'>Likes</div></div>
        <div className='w-11 h-11 flex flex-col justify-center items-center '><ChatBubbleOvalLeftIcon /> <div className='text-[12px]'>194</div></div>
        <div className='w-6 h-6 ml-3'><ShareIcon /> </div>
        <div className='w-6 h-6 ml-3 '><BookmarkIcon /> </div>
    </div>
  )
}
export default ReelsLike