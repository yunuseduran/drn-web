'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    
    // Preload video
    const preloadVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.load();
          // Prefetch video metadata
          await videoRef.current.play();
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          // Wait a brief moment and then start playing
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  console.log('Video playback started successfully');
                  setVideoLoaded(true);
                })
                .catch(e => {
                  console.error("Video autoplay failed:", e);
                  setErrorMessage(e.message || 'Video otomatik oynatma başarısız oldu');
                  setVideoError(true);
                });
            }
          }, 300);
        } catch (err) {
          console.error("Video loading error:", err);
          setVideoError(true);
          setErrorMessage(typeof err === 'object' && err !== null ? (err as Error).message : 'Video yüklenirken bir hata oluştu');
        }
      }
    };

    preloadVideo();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Stop video on unmount
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    console.error("Video error occurred:", target.error);
    setErrorMessage(target.error?.message || 'Video yüklenirken bir hata oluştu');
    setVideoError(true);
  };

  const staticBackgroundStyles = {
    backgroundImage: "url('/images/fabrika.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background or Static Image */}
      {isMobile || videoError ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={staticBackgroundStyles}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={handleVideoError}
            preload="auto"
          >
            <source src="/videos/drn-video.mp4" type="video/mp4" />
          </video>
          
          {/* Video loading overlay */}
          {!videoLoaded && (
            <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-10">
              <div className="w-32 h-32 relative mb-4">
                <Image 
                  src="/images/drn-moda-logo.png" 
                  alt="DRN Moda Tekstil Logo"
                  width={180} 
                  height={180}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-16 h-16 border-t-4 border-[#af8107] border-solid rounded-full animate-spin"></div>
              <p className="text-white mt-4 text-xl">Video yükleniyor...</p>
            </div>
          )}
        </>
      )}
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Tekstil Sektöründe <br /><span className="text-[#af8107]">Global Güç</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              Yenilikçi tasarımlarımız ve kaliteli üretimimizle dünya tekstil sektöründe 
              lider marka olma yolunda ilerliyoruz.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/hakkimizda">
              <button className="px-8 py-4 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-full transition-colors text-lg shadow-lg hover:shadow-xl">
                Bizi Tanıyın
              </button>
            </Link>
            
            <Link href="/iletisim">
              <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium border-2 border-white rounded-full transition-colors text-lg shadow-lg hover:shadow-xl">
                İletişime Geçin
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white text-sm mb-3 uppercase tracking-widest">Keşfedin</span>
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
      
      {/* Error Message (if video fails) */}
      {videoError && errorMessage && (
        <div className="absolute bottom-4 right-4 bg-red-600/80 text-white text-sm p-2 rounded z-50">
          <p className="font-bold">Video Hatası:</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default VideoBanner; 