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

  useEffect(() => {
    setIsSignUpMode(location.pathname === '/register');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 font-sans">
      
      <style>{`
        .smooth-slider {
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .anim-logo {
          opacity: 0;
          animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .logo-spotlight {
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%);
          filter: blur(20px);
        }
      `}</style>

      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-[1000px] min-h-[650px] flex border border-white">

     
        <div className="absolute top-0 left-0 h-full w-full flex">
          <div className={`flex-1 h-full smooth-slider flex flex-col justify-center ${isSignUpMode ? 'opacity-0 pointer-events-none translate-x-[20%]' : 'opacity-100 z-10 translate-x-0'}`}>
            <Login isEmbedded={true} onSwitchMode={() => setIsSignUpMode(true)} />
          </div>
          <div className={`flex-1 h-full smooth-slider flex flex-col justify-center ${isSignUpMode ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-[20%]'}`}>
            <Register isEmbedded={true} onSwitchMode={() => setIsSignUpMode(false)} />
          </div>
        </div>

        
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden smooth-slider z-50 shadow-2xl ${isSignUpMode ? '-translate-x-full rounded-r-[2.5rem]' : 'rounded-l-[2.5rem]'}`}>
          
          <div className={`bg-gradient-to-br from-[#0A2E6B] via-[#0A2E6B] to-pink-600 text-white relative -left-full h-full w-[200%] transform smooth-slider ${isSignUpMode ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* PANEL KIRI */}
            <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-14 text-center transform smooth-slider ${isSignUpMode ? 'translate-x-0 opacity-100' : '-translate-x-[20%] opacity-0'}`}>
              <h1 className="text-4xl font-bold mb-6 font-['Josefin_Sans'] drop-shadow-md">Hari Gini Belum Join?</h1>
              <p className="text-lg font-light mb-10 leading-relaxed opacity-90 drop-shadow-sm">
                Duh, rugi dong! Daftar sekarang biar kamu nggak ketinggalan barang-barang paling hits di kampus.
              </p>
            </div>

            
            <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-14 text-center transform smooth-slider ${isSignUpMode ? 'translate-x-[20%] opacity-0' : 'translate-x-0 opacity-100'}`}>
              
              {!isSignUpMode && (
                <div className="mb-14 relative flex flex-col items-center justify-center w-full select-none">
                    
                    
                    <div className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] logo-spotlight rounded-full z-0 opacity-100"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        
                        <img 
                          src={everythingImg} 
                          alt="Gives everything" 
                          className="h-8 w-auto mb-[-6px] mt-1 ml-20 anim-logo drop-shadow-sm"
                          style={{animationDelay: '0.2s'}}
                        />
                        
                        <div className="flex items-end justify-center">
                            
                            {/* 2. Logo U */}
                            <img 
                              src={uImg} 
                              alt="U" 
                              className="h-20 w-auto object-contain anim-logo relative z-20 drop-shadow-xl"
                              style={{animationDelay: '0.5s'}}
                            />
                            
                            <img 
                              src={needImg} 
                              alt="need" 
                              className="h-[52px] w-auto mb-[9px] -ml-[10px] anim-logo relative z-10 drop-shadow-md" 
                              style={{animationDelay: '0.9s'}}
                            />
                        </div>
                    </div>
                </div>
              )}

              <h1 className="text-4xl font-bold mb-6 font-['Josefin_Sans'] drop-shadow-md">Welcome Back!</h1>
              <p className="text-lg font-light mb-10 leading-relaxed opacity-90 drop-shadow-sm">
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