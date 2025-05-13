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
  const videoAttemptedRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [showVideo, setShowVideo] = useState(true);

  // Sayfa yüklendiğinde otomatik oynatma için
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Kullanıcı etkileşimi için tüm belgedeki etkileşimleri dinle
    const enableAutoplay = () => {
      if (videoRef.current && videoRef.current.paused) {
        // Promise'i sakla
        playPromiseRef.current = videoRef.current.play();
        playPromiseRef.current
          .then(() => {
            console.log('Video başarıyla başlatıldı');
            setVideoLoaded(true);
            playPromiseRef.current = null;
          })
          .catch(err => {
            console.log('Kullanıcı etkileşimi sonrası hala otomatik oynatma engellendi', err);
          });
      }
    };
    
    // Tüm etkileşim türlerini dinle
    document.addEventListener('touchstart', enableAutoplay, { once: true });
    document.addEventListener('click', enableAutoplay, { once: true });
    document.addEventListener('scroll', enableAutoplay, { once: true });
    
    // Her olasılığa karşı kullanıcı etkileşimi olmadan oynatmayı deneyelim
    setTimeout(() => {
      if (videoRef.current && !videoLoaded) {
        enableAutoplay();
      }
    }, 1000);
    
    return () => {
      document.removeEventListener('touchstart', enableAutoplay);
      document.removeEventListener('click', enableAutoplay);
      document.removeEventListener('scroll', enableAutoplay);
    };
  }, [videoLoaded]);

  // İlk yükleme kontrolü için
  useEffect(() => {
    // Tarayıcıda çalıştığından emin olalım
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    // İlk kontrol
    checkMobile();
    
    // Pencere boyutu değişikliğini izle
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Separate effect for video handling to allow proper cleanup
  useEffect(() => {
    // Browser kontrolü
    if (typeof window === 'undefined') return;
    
    let videoElement = videoRef.current;
    let mounted = true;
    
    const handleVisibilityChange = () => {
      if (!videoElement) return;
      
      if (document.visibilityState === 'hidden') {
        // User navigated away - pause video safely
        safePauseVideo(videoElement);
      } else if (document.visibilityState === 'visible' && mounted && !videoError) {
        // User came back - resume video if it was previously playing
        if (videoLoaded) {
          safePlayVideo(videoElement);
        }
      }
    };

    // Safe pause function that respects any pending play promises
    const safePauseVideo = async (video: HTMLVideoElement) => {
      try {
        // Only pause if there's no pending play promise or it's resolved
        if (!playPromiseRef.current) {
          video.pause();
        } else {
          await playPromiseRef.current;
          video.pause();
        }
      } catch (e) {
        console.log('Failed to pause video on visibility change', e);
      }
    };

    // Safe play function
    const safePlayVideo = async (video: HTMLVideoElement) => {
      try {
        if (video.paused) {
          playPromiseRef.current = video.play();
          await playPromiseRef.current;
          setVideoLoaded(true);
          playPromiseRef.current = null;
        }
      } catch (e) {
        console.error('Failed to resume video', e);
      }
    };

    // Listen for visibility change events (user navigating away)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Preload video - Hem mobil hem masaüstünde çalışacak şekilde
    const preloadVideo = async () => {
      if (!videoElement || videoAttemptedRef.current) return;
      
      videoAttemptedRef.current = true;
      
      try {
        // Video yükleme işlemi
        videoElement.load();
        
        // Tüm tarayıcılar için gerekli ayarlar
        videoElement.muted = true;
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        videoElement.setAttribute('autoplay', '');
        
        // Videoyu oynatmaya çalış
        try {
          console.log('Videoyu oynatmaya çalışıyorum...');
          playPromiseRef.current = videoElement.play();
          
          if (playPromiseRef.current) {
            await playPromiseRef.current;
            console.log('Video otomatik oynatmaya başladı');
            if (mounted) {
              setVideoLoaded(true);
              playPromiseRef.current = null;
            }
          } else {
            console.log('Video oynatma başladı');
            if (mounted) setVideoLoaded(true);
          }
        } catch (playErr) {
          console.error("Video otomatik oynatma başarısız:", playErr);
          
          if (mounted) {
            setVideoLoaded(true);
            
            document.addEventListener('touchstart', () => {
              if (videoElement) videoElement.play().catch(() => {});
            }, {once: true});
            
            document.addEventListener('click', () => {
              if (videoElement) videoElement.play().catch(() => {});
            }, {once: true});
          }
        }
      } catch (loadErr) {
        console.error("Video yükleme hatası:", loadErr);
        if (mounted) {
          setVideoError(true);
          setShowVideo(false);
          setErrorMessage(typeof loadErr === 'object' && loadErr !== null ? (loadErr as Error).message : 'Video yüklenirken bir hata oluştu');
        }
      }
    };

    // Her cihazda video yüklemeyi hemen dene
    preloadVideo();
    
    // Temizleme işlemi
    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (videoElement) {
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => {
            try {
              videoElement?.pause();
            } catch (e) {
              console.warn('Video durdurma hatası:', e);
            }
          }).catch(() => {
            // Promise zaten reject edilmiş, durdurmaya gerek yok
          });
        } else {
          try {
            videoElement.pause();
          } catch (e) {
            console.warn('Video durdurma hatası:', e);
          }
        }
      }
      
      videoElement = null;
    };
  }, [isMobile, videoLoaded, videoError]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    console.error("Video error occurred:", target.error);
    setErrorMessage(target.error?.message || 'Video yüklenirken bir hata oluştu');
    setVideoError(true);
    setShowVideo(false); // Hata durumunda video gösterimini kapat
  };

  // Video yüklenme olayını işle
  const handleVideoLoaded = () => {
    console.log('Video data yüklendi');
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  };

  const staticBackgroundStyles = {
    backgroundImage: "url('/images/fabrika.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background or Static Image */}
      {!showVideo || videoError ? (
        // Video gösterilemediğinde statik arka plan göster
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={staticBackgroundStyles}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      ) : (
        // Tüm cihazlarda video göstermeyi dene
        <>
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            preload="auto"
            poster="/images/fabrika.jpg"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/videos/drn-video.mp4" type="video/mp4" />
            <source src="/videos/drn-video-2.webm" type="video/webm" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
          
          {/* Mobil cihazlarda video başlatma yardımcısı - ekranın tamamına gizli buton */}
          {!videoLoaded && (
            <button 
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.play().then(() => {
                    setVideoLoaded(true);
                  }).catch(err => {
                    console.log("Manuel oynatma denemesi başarısız:", err);
                  });
                }
              }}
              className="absolute inset-0 w-full h-full z-20 opacity-0"
              aria-label="Video başlat"
            />
          )}
          
          {/* Video yükleme göstergesi - Video yüklenene kadar göster */}
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
              
              {/* Tüm cihazlar için manuel başlatma butonu */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().then(() => {
                      setVideoLoaded(true);
                    }).catch(err => {
                      console.error("Manuel oynatma butonu hatası:", err);
                    });
                  }
                }}
                className="mt-6 px-4 py-2 bg-[#af8107] text-white rounded-lg"
              >
                Videoyu Başlat
              </button>
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