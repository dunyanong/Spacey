import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Hamburger } from './Hamburger';
import Image from 'next/image';

const audioFiles = ['/music/intro.wav', '/music/Dreamers.wav', '/music/WakaWaka.wav', '/music/Ozuna.wav','/music/OnTopOfTheWorld.wav', '/music/HayyaHayya.wav', '/music/Ramenez.wav', '/music/TheNights.wav', '/music/WeAreOneOleOla.wav', '/music/LaLaLa.wav','/music/WavingFlag.wav'];

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="fixed bg-white py-0 md:py-2 px-0 md:px-5 lg:px-5 w-full mx-auto z-50 border-b-2 border-gray-200 font-semibold">
    <div className="hidden items-center md:visible md:flex md:justify-between px-10 py-2">
    <div className="hover:cursor">
      <Link href="/" legacyBehavior>
          <a className="text-black font-mono transition-colors duration-200 hover:text-slate-500">Spacey</a>
      </Link>
    </div>

    <div className="flex gap-4 justify-center items-center">
            {user && (
            <div className="text-sm">
              <Link href="/studyschedule" legacyBehavior>
                  <a className='text-black transition-colors duration-200 hover:text-slate-500'>Schedule</a>
              </Link>
            </div>
            )}
            {!user && (
              <Link href="/auth/Login" legacyBehavior>
                <a className="text-black text-sm transition-colors duration-200 hover:text-slate-500">Join Now</a>
              </Link>              
            )}
            {user && (
              <div className="flex items-center gap-6">
                <Link href="/dashboard">
                  <img className="w-8 h-8 rounded-full cursor-pointer" src={user.photoURL}/>
                </Link>
              </div>
            )}

        </div> 

    </div>

    <div className="flex justify-between md:mt-3 md:hidden w-full max-w-3xl mx-auto px-5 md:px-10 py-5 items-center hover:cursor">
        <ul className="flex items-center">
            <Link legacyBehavior href="/">
              <a className="text-black font-mono transition-colors duration-200 hover:text-slate-500">Spacey</a>    
            </Link>
        </ul>             
        <Hamburger />
    </div>
    </nav>
  );  
};

export default Navbar;