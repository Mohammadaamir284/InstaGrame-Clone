import React, { lazy, Suspense } from 'react';

const Form = lazy(() => import('./Form'));
const Auths = () => {
  const islogin = window.location.pathname.includes('/user/login')
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading form...</div>}>
      <Form islogin={islogin} />
    </Suspense>
  )
}

export default Auths