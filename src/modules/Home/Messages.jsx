import React, { useState } from 'react'
import HomeSIdeBar from '../../components/HomeSIdeBar'
import Input from '../../components/Input'
const Messages = () => {
    const [inputValue, setInputValue] = useState("");
    return (<>
        <div className='flex items-center justify-center bg-black text-white w-screen h-screen'>
            <HomeSIdeBar />
            <div className='border-l border-white w-[80%] h-screen  flex'>
                <div className="border border-neutral-700 rounded-xl w-[18vw] my-3 mx-4">
                    <div className='p-4'>
                        <div className=' text-2xl'>moha_mmad_aamir</div>
                        <div className='mt-3 text-xl'>Messages</div>
                    </div>
                    <main className='flex flex-col gap-4 p-5 my- h-[80vh] overflow-y-scroll scrollbar-hide'>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>

                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/insta.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>

                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/titan.jpg" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>

                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>

                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>

                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <section className='border  border-neutral-700 w-full h-full'>
                    <header className='border-b  border-neutral-700 px-3 py-3'>
                        <div className='flex items-center justify-between '>
                            <div className='flex items-center gap-5'>
                                <img className='w-10 h-10 rounded-full object-cover' src="/amir.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px]'>moha_mmad_aamir</span>
                                    <span className='text-[14px] text-neutral-500 font-semibold'>Mohammad Aamir</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className='h-[80vh] overflow-y-scroll scrollbar-hide p-4'>
                        <div className='justify-self-end bg-blue-400 wrap-break-word max-w-[25vw] min-w-[5vw] px-4 py-1 rounded-l-2xl rounded-br-2xl'>jhvqdjv kya hal kya hal kya hal kya hal kya hal kya hal kya hal kya hal</div>
                        <div className='justify-self-start rounded-r-2xl rounded-b-2xl bg-gray-500 wrap-break-word max-w-[25vw] min-w-[5vw] px-4 py-1 '>jhvqdjv</div>
                    </main>
                    <footer className='border-t  border-neutral-700 px-3 py-3'>
                        <div className='border rounded-full px-3 py-1 flex '>
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='Messages'
                                className="!bg-transparent !dark:bg-transparent outline-none border-none !p-1 w-[52vw]" />
                            {inputValue.trim() !== "" && (
                                <div className='w-fit'>Send</div>
                            )}

                        </div>
                    </footer>
                </section>
            </div>
        </div>
    </>)
}
export default Messages