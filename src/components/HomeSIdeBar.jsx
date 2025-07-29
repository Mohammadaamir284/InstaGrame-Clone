import React, { useState, useRef, useEffect } from 'react';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { PlusCircleIcon, Bars3Icon, BookmarkIcon, PowerIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import Post from '../modules/Create/Post';
import { useNavigate } from 'react-router-dom';
const HomeSIdeBar = () => {
    const [show, setShow] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const hideTopNavOnRoutes = ["/reels"]; // ya ["home2 route"]
    const shouldHideTopNav = hideTopNavOnRoutes.includes(location.pathname);
    const currentUser = JSON.parse(localStorage.getItem('userdata'))
    console.log(currentUser.username, 'currentUser');
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the popup
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShow(false);
                setShowMore(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlesave = () => {
        navigate(`/profile/${currentUser.username}?tab=saved`);
    };

    const handleLogout = () => {
        localStorage.removeItem('user:token')
        localStorage.removeItem('userdata')
        navigate('/user/login')
    }
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile(); // initial check
        window.addEventListener('resize', checkIsMobile); // update on resize
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return (<>
        {!isMobile && (
            <section className='w-[15%] h-screen border-r '>
                <div className='py-8 '><img className='w-[120px]' src="/instatext.svg" alt="" /></div>
                <ul className='flex flex-col  space-y-5'>
                    <Link to={'/'}><li className='flex items-center gap-3'><HomeIcon className="h-8 w-8 " /> <span className='font-semibold'>Home</span></li></Link>
                    <Link to={'/search'}><li className='flex items-center gap-3'><MagnifyingGlassIcon className="h-8 w-8 " /> <span className='font-semibold'>Search</span></li></Link>
                    <Link to={'/reels'}><li className='flex items-center gap-3'><img className="h-8 w-8 " src="/reel.svg" alt="" /> <span className='font-semibold'>Reels</span></li></Link>
                    <Link to={'/message'}><li className='flex items-center gap-3'><img className="h-8 w-8 "
                        src="/message.svg" alt="" /><span className='font-semibold'>Message</span></li></Link>

                    <li onClick={() => setShow((prev) => !prev)} className='flex items-center gap-3 cursor-pointer'><PlusCircleIcon className="h-8 w-8 " /> <span className='font-semibold'>Create</span></li>

                    <Link to={`/profile/${currentUser.username}`}><li className='flex items-center gap-3 '><img className='w-8 h-8  rounded-full object-cover bg-gray-600' src="/amir.png" alt="" /><span className='font-semibold'>Profile</span></li></Link>
                    {showMore && (
                        <main ref={popupRef} onClose={() => setShowMore(false)} className='mt-7 px-4'>
                            <div className='flex flex-col justify-center px-6 h-40 space-y-6 rounded-2xl bg-neutral-700'>
                                <div className='font-semibold cursor-pointer flex items-center gap-2  hover:text-blue-600' onClick={handlesave}> <BookmarkIcon className='w-8 h-8' /> <span>Saved</span></div>

                                <div className='font-semibold cursor-pointer flex items-center gap-2 hover:text-red-600' onClick={handleLogout}> <PowerIcon className='w-8 h-8' />LogOut</div>
                            </div>
                        </main>
                    )}
                </ul>
                {!showMore && (
                    <span className='flex items-end  h-60  cursor-pointer '><Bars3Icon className='w-8 h-8 mr-3' onClick={() => setShowMore((prev) => !prev)} /> <span onClick={() => setShowMore((prev) => !prev)} className='pb-1'>More</span></span>
                )}

                {show && (
                    <div ref={popupRef}><Post onClose={() => setShow(false)} /></div>
                )}
            </section>)}

        {isMobile && (<>
            {!shouldHideTopNav && (
                <section className='w-full h-[7vh] bg-black border-b fixed z-50 top-0 left-0 right-0 flex items-center px-2'>
                  
                    <div className='flex justify-center items-center w-full'>
                        <img onClick={() => navigate('/')} className='w-40' src="/instatext.svg" alt="" />
                    </div>

                </section>
            )}
            <section className='w-full h-[7vh] bg-black border-t fixed z-50 bottom-0 left-0 right-0'>

                <div className='flex items-center justify-around py-2'>
                    <li onClick={() => navigate('/')} className='flex items-center gap-3'><HomeIcon className="h-8 w-8 " /> </li>
                    <Link to={'/reels'}><li className='flex items-center gap-3'><img className="h-8 w-8 " src="/reel.svg" alt="" /></li></Link>

                    <li onClick={() => setShow((prev) => !prev)} className='flex items-center gap-3 cursor-pointer'><PlusCircleIcon className="h-8 w-8 " /> </li>

                    <Link to={'/message'}><li className='flex items-center gap-3'><img className="h-8 w-8 " src="/message.svg" alt="" /></li></Link>
                    <Link to={`/profile/${currentUser.username}`}><li className='flex items-center gap-3 '><img className='w-8 h-8  rounded-full object-cover bg-gray-600' src="/amir.png" alt="" /></li></Link>
                </div>
                {show && (
                    <div ref={popupRef}><Post onClose={() => setShow(false)} /></div>
                )}
            </section>
        </>)}
    </>
    )
}

export default HomeSIdeBar

//   <Link to={'/search'}><li className='flex items-center gap-3'><MagnifyingGlassIcon className="h-8 w-8 " /></li></Link>