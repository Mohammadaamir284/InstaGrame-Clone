import React, { lazy, Suspense } from 'react';

const Input = lazy(() => import('../../components/Input'));
const Button = lazy(() => import('../../components/Button'));
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = ({ islogin = false }) => {
  const [logPost, setlogPost] = useState({
    ...(!islogin && { username: '' }),
    email: '',
    password: ''
  })

  const port = import.meta.env.VITE_API_BASE_URL;

  const handelLogPost = async (e) => {
    e.preventDefault()


    const res = await fetch(`${port}/api/${islogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logPost)
    })
    const req = await res.json()
   
    if (req.token) {
      localStorage.setItem('user:token', req.token)
      localStorage.setItem('userdata', JSON.stringify(req.user))
      navigate('/')
    } else (
      console.log('alert', req.message)
    )
  }

  const navigate = useNavigate()
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading form...</div>}>
      <div className="flex justify-center items-center w-[100vw]">
        <div className={`${!islogin ? 'order-2' : 'order-1'} border-r-2  border-[#3f5c6a] w-[55vw] h-[100vh] bg-black p-8 flex flex-col gap-5`}>
          <div className="w-[70px]"><img className="text-white" src="/instagram.svg" alt="InstaGram Logo" /></div>
          <div className='flex flex-col space-y-3.5'>
            <div className='text-white text-center text-4xl'>See everyday moments from your</div>
            <div className=" text-center text-4xl  bg-gradient-to-r from-orange-500 via-red-500 to-violet-800 bg-clip-text text-transparent">close friends.</div>
          </div>
          <div className=' flex justify-center items-center'><img className='w-120 h-96' src="/insta.png" alt="" /></div>
        </div>

        <div className={` border-l-2  border-[#3f5c6a] w-[45vw] h-[100vh] flex flex-col justify-center items-center space-y-20 bg-[#152127] ${!islogin ? 'order-1' : 'order-2'} `}>
          <div >
            <form onSubmit={(e) => { handelLogPost(e) }} className=' flex flex-col justify-center items-center space-y-3'>
              {!islogin &&
                <Input
                  label='Get Started on InstaGram'
                  placeholder='Username' type='text'
                  className='w-[400px]' value={logPost.username}
                  onChange={(e) => setlogPost({ ...logPost, username: e.target.value })}
                />
              }
              <Input
                label={islogin ? 'Log Into InstaGram' : ''}
                placeholder={islogin ? 'Mobile number, Username or Email' : 'Mobile number, or Email'} type='text'
                className='w-[400px]'
                value={logPost.email}
                onChange={(e) => setlogPost({ ...logPost, email: e.target.value })}
              />
              <Input
                placeholder='Password'
                type='text' className='w-[400px]'
                value={logPost.password}
                onChange={(e) => setlogPost({ ...logPost, password: e.target.value })}
              />
              <div><Button name={islogin ? 'Log In' : 'Sign Up'} type='submit' className='w-[400px] text-white' /></div>
            </form>
          </div>

          <div className='flex flex-col items-center gap-4'>
            {islogin ?
              <div onClick={() => { navigate('/user/sign_up') }}><Button name='Create new Account' className='dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-0
              text-[#4599ff] border w-[400px] cursor-pointer'/>
              </div>
              :
              <div onClick={() => { navigate('/user/login') }}><Button name='I already have an account' className='dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-0
              text-[#4599ff] border w-[400px] cursor-pointer'/>
              </div>
            }
            <img className='w-20' src="/meta.svg" alt="Meta Logo" />
          </div>


        </div>

      </div>
    </Suspense>
  )
}

export default Form