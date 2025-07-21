import React, { useState, useRef, useEffect } from 'react';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { HeartIcon, PlusCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Post from '../modules/Create/Post';

const HomeSIdeBar = () => {
    const [show, setShow] = useState(false);
    const popupRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('userdata'))
    
    
    // ✅ Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the popup
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<>
        <div className='w-[15%] h-screen border-r '>
            <div className='py-8 '><img className='w-[120px]' src="/instatext.svg" alt="" /></div>
            <ul className='flex flex-col  space-y-5'>
                <Link to={'/'}><li className='flex items-center gap-3'><HomeIcon className="h-8 w-8 " /> <span className='font-semibold'>Home</span></li></Link>
                <Link to={'/search'}><li className='flex items-center gap-3'><MagnifyingGlassIcon className="h-8 w-8 " /> <span className='font-semibold'>Search</span></li></Link>
                <Link to={'/reels'}><li className='flex items-center gap-3'><img className="h-8 w-8 " src="/reel.svg" alt="" /> <span className='font-semibold'>Reels</span></li></Link>
                <Link to={'/message'}><li className='flex items-center gap-3'><img className="h-8 w-8 " src="/message.svg" alt="" /><span className='font-semibold'>Message</span></li></Link>
                <li onClick={() => setShow((prev) => !prev)} className='flex items-center gap-3 cursor-pointer'><PlusCircleIcon className="h-8 w-8 " /> <span className='font-semibold'>Create</span></li>
                <Link to={`/profile/${currentUser.username}`}><li className='flex items-center gap-3'><img className='w-8 h-8  rounded-full object-cover bg-gray-600' src="/amir.png" alt="" /><span className='font-semibold'>Profile</span></li></Link>
            </ul>
            <span className='flex items-end h-60  cursor-pointer'><Bars3Icon className='w-8 h-8 mr-3' /> <span className='pb-1'>More</span></span>
        </div>
        {show && (
            <div
                ref={popupRef}
               
            >
               <Post  onClose={() => setShow(false)}/>
            </div>
        )}
    </>
    )
}

export default HomeSIdeBar