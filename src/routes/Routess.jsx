import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy imports
const Home = lazy(() => import('../modules/Home/Home'));
const Home1 = lazy(() => import('../modules/Home/Home1'));
const Home2 = lazy(() => import('../modules/Home/Home2'));
const Auths = lazy(() => import('../modules/Authrorization'));
const Messages = lazy(() => import('../modules/Home/Messages'));
const Profile = lazy(() => import('../modules/Home/Profile'));
// const Post = lazy(() => import('../modules/Create/Post'));


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

  return (
    <Suspense fallback={<div className="p-5 text-center">Loading...</div>}>
      <Routes>
        {link.map(({ id, path, component }) => (
          <Route key={id} path={path} element={<PrivateRoute>{component}</PrivateRoute>} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Routess;
