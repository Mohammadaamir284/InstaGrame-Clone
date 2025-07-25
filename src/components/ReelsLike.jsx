import React from 'react'
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const ReelsLike = () => {
  return (
    <div className='mb-25 md:mx-6 flex flex-col gap-6 '>
        <div className='md:w-11 w-15 md:h-11 h-15 flex flex-col justify-center items-center '><HeartIcon /> <div className='text-[12px]'>Likes</div></div>
        <div className='md:w-11 w-15 md:h-11 h-15 flex flex-col justify-center items-center '><ChatBubbleOvalLeftIcon /> <div className='text-[12px]'>194</div></div>
        <div className='md:w-6 w-8 md:h-6 h-8 ml-3'><ShareIcon /> </div>
        <div className='md:w-6 w-8 md:h-6 h-8 ml-3 '><BookmarkIcon /> </div>
    </div>
  )
}
export default ReelsLike