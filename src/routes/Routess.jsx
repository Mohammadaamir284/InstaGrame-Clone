import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
// Lazy imports
const Home = lazy(() => import('../modules/Home/Home'));
const Home1 = lazy(() => import('../modules/Home/Home1'));
const Home2 = lazy(() => import('../modules/Home/Home2'));
const Auths = lazy(() => import('../modules/Authrorization'));
const Messages = lazy(() => import('../modules/Home/Messages'));
const Profile = lazy(() => import('../modules/Home/Profile'));

const PrivateRoute = ({ children }) => {
  const isUserlogin = window.localStorage.getItem('user:token') !== null
  const isFormPage = window.location.pathname.includes('user')

  if (isUserlogin && !isFormPage) {
    return children
  } else if (!isUserlogin && isFormPage) {
    return children
  } else {
    const nativUrl = isUserlogin ? '/' : '/user/login'
    return <Navigate to={nativUrl} replace />
  }
}

const Routess = () => {
  const navigate = useNavigate();
  const link = [
    { id: 1, path: '/', component: <Home /> },
    { id: 2, path: '/search', component: <Home1 /> },
    { id: 3, path: '/reels', component: <Home2 /> },
    { id: 4, path: '/user/login', component: <Auths /> },
    { id: 5, path: '/user/sign_up', component: <Auths /> },
    { id: 6, path: '/message', component: <Messages /> },
    { id: 7, path: '/profile/:username', component: <Profile /> },
    // { id: 8, path: '/create-post', component: <Post/> },
  ];

  useEffect(() => {
    const token = localStorage.getItem('user:token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('user:token');
          localStorage.removeItem('userdata');
          navigate('/user/login');
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('user:token');
        localStorage.removeItem('userdata');
        navigate('/user/login');
      }
    }
  }, [navigate]);

  return (
    <Suspense fallback={<div className="flex flex-col justify-center items-center space-y-2 bg-black h-[100vh]">
      <div className="w-[70px]"><img className="text-white" src="/instagram.svg" alt="InstaGram Logo" /></div>
      <div className='flex justify-center items-center'>
        <ClipLoader color="#3B82F6" size={50} />
        <p className="ml-2 text-white">loading...</p>
      </div>
    </div>}>
      <Routes>
        {link.map(({ id, path, component }) => (
          <Route key={id} path={path} element={<PrivateRoute>{component}</PrivateRoute>} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Routess;
