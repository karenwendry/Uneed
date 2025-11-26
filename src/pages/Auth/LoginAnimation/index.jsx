
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Login from '../login';
import Register from '../register';

import everythingImg from '../../../assets/images/everything.png';
import uImg from '../../../assets/images/u.png';
import needImg from '../../../assets/images/need.png';

const LoginAnimation = () => {
  const location = useLocation();
  const [isSignUpMode, setIsSignUpMode] = useState(location.pathname === '/register');

  const [showEverything, setShowEverything] = useState(false);
  const [showU, setShowU] = useState(false);
  const [showNeed, setShowNeed] = useState(false);

  useEffect(() => {
    setIsSignUpMode(location.pathname === '/register');
  }, [location.pathname]);

  // LOGIN animation
  useEffect(() => {
    if (!isSignUpMode) {
      setShowEverything(false);
      setShowU(false);
      setShowNeed(false);

      setTimeout(() => setShowEverything(true), 400);
      setTimeout(() => setShowU(true), 700);
      setTimeout(() => setShowNeed(true), 1000);
    }
  }, [isSignUpMode]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 font-sans">

      <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-[1000px] min-h-[650px] flex border border-white">

        {/* SLIDER FORM */}
        <div className="absolute top-0 left-0 h-full w-full flex">
          
          {/* LOGIN FORM */}
          <div className={`flex-1 h-full transition-all duration-[800ms] ease-smooth-slider flex flex-col justify-center 
          ${isSignUpMode ? 'opacity-0 pointer-events-none translate-x-[20%]' : 'opacity-100 z-10 translate-x-0'}`}>
            <Login 
              isEmbedded={true} 
              onSwitchMode={() => setIsSignUpMode(true)} 
            />
          </div>

          {/* REGISTER FORM */}
          <div className={`flex-1 h-full transition-all duration-[800ms] ease-smooth-slider flex flex-col justify-center 
          ${isSignUpMode ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-[20%]'}`}>
            <Register 
              isEmbedded={true} 
              onSwitchMode={() => setIsSignUpMode(false)} 
            />
          </div>

        </div>

        {/* GRADIENT PANEL */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-[800ms] ease-smooth-slider z-50 shadow-2xl 
        ${isSignUpMode ? '-translate-x-full rounded-r-[2.5rem]' : 'rounded-l-[2.5rem]'}`}>

          <div className={`bg-gradient-to-br from-[#0A2E6B] via-[#0A2E6B] to-pink-600 text-white relative -left-full h-full w-[200%] transform 
          transition-all duration-[800ms] ease-smooth-slider ${isSignUpMode ? 'translate-x-1/2' : 'translate-x-0'}`}>

            {/* =========================================== */}
            {/* LEFT PANEL — REGISTER SIDE (CLEAN VERSION) */}
            {/* =========================================== */}
            <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-14 text-center
            transition-all duration-[800ms] ease-smooth-slider
            ${isSignUpMode ? 'translate-x-0 opacity-100' : '-translate-x-[20%] opacity-0'}`}>

              {/* SPOTLIGHT DI BELAKANG TEKS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="
                  w-[300px]
                  h-[300px]
                  rounded-full
                  blur-3xl
                  opacity-80
                  absolute
                  [background:radial-gradient(circle,white_0%,rgba(255,255,255,0.4)_40%,transparent_80%)]
                "></div>
              </div>

              {/* TEXT REGISTER */}
              <h1 className="text-4xl font-bold mb-6 mt-10 font-josefin drop-shadow-md z-10">
                Hari Gini Belum Join?
              </h1>

              <p className="text-lg font-light mb-6 leading-relaxed opacity-95 drop-shadow-sm z-10">
                Duh, rugi dong! Daftar sekarang biar kamu nggak ketinggalan barang-barang 
                paling hits di kampus.
              </p>
            </div>

            {/* =========================================== */}
            {/* RIGHT PANEL — LOGIN SIDE */}
            {/* =========================================== */}
            <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-14 text-center 
            transition-all duration-[800ms] ease-smooth-slider 
            ${isSignUpMode ? 'translate-x-[20%] opacity-0' : 'translate-x-0 opacity-100'}`}>

              {/* LOGO ANIMATION LOGIN */}
              {!isSignUpMode && (
                <div className="mb-14 flex flex-col items-center relative">

                  {/* Spotlight */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="
                        w-[260px] h-[260px] rounded-full opacity-90 blur-2xl absolute
                        [background:radial-gradient(circle,white_0%,rgba(255,255,255,0.55)_40%,transparent_75%)]
                      "
                    ></div>
                  </div>

                  {/* everything */}
                  <img
                    src={everythingImg}
                    className={`h-8 w-auto mb-[-6px] mt-1 ml-20 
                      drop-shadow-sm transition-all duration-800 
                      ${showEverything ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  />

                  <div className="flex items-end justify-center">
                    <img
                      src={uImg}
                      className={`h-20 w-auto drop-shadow-xl transition-all duration-800 
                        ${showU ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    />
                    <img
                      src={needImg}
                      className={`h-[52px] w-auto mb-[9px] -ml-[10px] drop-shadow-md transition-all duration-800 
                        ${showNeed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    />
                  </div>
                </div>
              )}

              <h1 className="text-3xl font-bold mb-3 font-josefin drop-shadow-md">Welcome Back!</h1>
              <p className="text-sm font-medium opacity-90 drop-shadow-sm">
                Senang melihatmu lagi! Siap mencari kebutuhan kuliahmu hari ini?
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAnimation;