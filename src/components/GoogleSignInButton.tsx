import React from 'react';
import googleLogo from '../assets/googleLogo.png';

interface GoogleInterface {
    googleMessage: string;
}

const GoogleSignInButton: React.FC<GoogleInterface> = ({ googleMessage }) => {
    return (
        <div className="rounded-full w-[230px] h-[46px] bg-white dark:bg-black border-3 border-blue dark:border-gray flex items-center cursor-pointer">
            <div className='flex pl-4 items-center justify-center'>
                <img src={googleLogo} className='h-[26px]' alt="Google logo" />
            </div>
            <div className='pl-4 font-semibold'>
                {/* Displaying the dynamic message */}
                <p>{googleMessage} with Google</p>
            </div>
        </div>
    );
};

export default GoogleSignInButton;
