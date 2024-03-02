import React from 'react';
import SignUp from '../components/AuthComponents/SignUp';
import AuthBg from '../components/AuthComponents/AuthBg';

const SignUpPage = () => {
  return (
    <div className='flex flex-row overflow-y-hidden'>
        <div className='w-[50%]'>
          <SignUp/>
        </div>
        <AuthBg/>
    </div>
  )
}

export default SignUpPage;