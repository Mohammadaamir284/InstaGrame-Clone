import React, { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button'
import { ClipLoader } from 'react-spinners';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';



const Post = ({ onClose }) => {
    const port = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
    const modalRef = useRef();
    const inputRef = useRef(null);
    const [image, setimage] = useState('')
    const [mediaType, setMediaType] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);
    const handleFocus = () => {
        inputRef.current.click();// 👈 directly access DOM element
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (file.type.startsWith("video")) {
            // If video — check duration first
            const video = document.createElement("video");
            video.preload = "metadata";

            video.onloadedmetadata = async () => {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;

                if (duration > 150) {
                    alert("❌ Video must be 1.5 minutes or less (150 seconds).");
                    return; // STOP upload
                }

                // ✅ Valid video — upload
                await uploadToCloudinary(file);
            };

            video.src = URL.createObjectURL(file);
        } else {
            // ✅ It's an image — directly upload
            await uploadToCloudinary(file);
        }
    };

    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'myCloudImage');
        data.append('cloud_name', 'dprrpmdoh');

        setLoading(true);

        const res = await fetch(`https://api.cloudinary.com/v1_1/dprrpmdoh/upload`, {
            method: 'POST',
            body: data
        });

        const result = await res.json();
        const publicId = result.public_id;
        const resourceType = file.type.startsWith("video") ? "video" : "image";

        const optimizedUrl = `https://res.cloudinary.com/dprrpmdoh/${resourceType}/upload/f_auto,q_auto/${publicId}`;

        setimage(optimizedUrl);
        setMediaType(resourceType);
        setLoading(false);
    };


    const removeimage = () => {
        setimage('')
    }
    //   const token = JSON.parse(localStorage.getItem('token'));
      const token = localStorage.getItem('user:token')
 
    const saveimage = async () => {
        try {
            const res = await fetch(`${port}/api/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    image,
                    mediaType,
                })
            })

            setimage('');
            onClose();


        } catch (err) {
            console.log('Error while posting:', err);
        }
    };
    return (<>

        <div className="fixed inset-0 z-50 flex items-center justify-center   backdrop-blur-xs">
            <div ref={modalRef} className="relative z-10 bg-[#262626] rounded-xl shadow-lg  text-black md:w-[40vw] w-[80vw] md:h-[80vh] h-[40vh]">
                <div className='flex flex-col  text-white'>
                    <div className={`flex items-center border-b w-full px-2 rounded-t-xl border-neutral-600 ${image ? 'justify-between bg-black' : 'justify-center'}`}>
                        {!image && <div className='font-semibold  text-center p-2 '>Create</div>}
                        {image && (<>
                            <div className='h-6 w-6 text-white cursor-pointer' onClick={removeimage}><ArrowLeftIcon /></div>
                            <div className='font-semibold  text-center p-2 '>Post</div>
                            <div className='text-blue-500 cursor-pointer' onClick={saveimage} >Next</div>
                        </>)}
                    </div>

                    <main className='flex justify-center items-center  md:h-[40vw] h-[35vh] w-full'>

                        {!image && !loading && (<>
                            <Button
                                name='Select Post or Reel'
                                type='button'
                                onClick={handleFocus} />
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                onChange={handleUpload}
                            />
                        </>)}

                        {loading && (
                            <div className="flex justify-center items-center h-40">

                                <ClipLoader color="#3B82F6" size={50} />
                                <p className="ml-2 text-white">Uploading...</p>

                            </div>
                        )}
                        {!loading && image && (
                            mediaType === 'image' ? (
                                <img src={image} className='md:h-[40vw] h-[35vh] w-full object-cover rounded-b-xl' alt="" />
                            ) : (
                                <video src={image} className='md:h-[40vw] h-[35vh] w-full object-cover rounded-b-xl' />
                            )
                        )}

                    </main>
                </div>
            </div>
        </div>


    </>)
}

export default Post