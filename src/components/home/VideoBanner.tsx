'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VideoBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Try to force load the video
    if (videoRef.current) {
      videoRef.current.load();
      
      // Try playing after a short delay
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => {
            console.error("Video autoplay failed after timeout:", e);
            setErrorMessage(e.message || 'Video autoplay failed');
            setVideoError(true);
          });
        }
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleVideoLoad = () => {
    console.log('Video can play now');
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.error("Video autoplay failed:", e);
        setErrorMessage(e.message || 'Video autoplay failed');
        setVideoError(true);
      });
    }
  };
  
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    console.error("Video error occurred:", target.error);
    setErrorMessage(target.error?.message || 'Unknown video error');
    setVideoError(true);
  };

  const renderVideoBackground = () => {
    if (isMobile || videoError) {
      return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 flex flex-col items-center justify-center">
          <div className="mb-8 w-64">
            <Image 
              src="/images/drn-moda-logo.png" 
              alt="DRN Moda Tekstil Logo"
              width={300}
              height={100}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-[#af8107] text-xl px-6 text-center">
            Tekstil sektöründe kalite ve yenilikçiliğin adresi
          </p>
          {errorMessage && (
            <p className="text-red-400 text-sm mt-2 px-6 text-center">
              {errorMessage}
            </p>
          )}
        </div>
      );
    }
    
    return (
      <>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
          preload="auto"
          controls={false}
        >
          <source src="/videos/drn-video.mp4" type="video/mp4" />
          Tarayıcınız video elementini desteklemiyor.
        </video>
        {!videoLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-white">Video yükleniyor...</div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      {renderVideoBackground()}
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4 z-10">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Tekstil Sektöründe <span className="text-[#af8107]">Global Güç</span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl max-w-3xl mb-10"
        >
          Yenilikçi tasarımlarımız ve kaliteli üretimimizle dünya tekstil sektöründe lider marka olma yolunda ilerliyoruz.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/hakkimizda">
            <button className="px-8 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-full transition-colors">
              Bizi Tanıyın
            </button>
          </Link>
          
          <Link href="/iletisim">
            <button className="px-8 py-3 bg-transparent hover:bg-white hover:text-[#af8107] text-white font-medium border-2 border-white rounded-full transition-colors">
              İletişime Geçin
            </button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white text-sm mb-2">Aşağı Kaydır</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div 
            className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBanner; 