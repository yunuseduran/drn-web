'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaNewspaper } from 'react-icons/fa';
import { getHaberler } from '@/lib/api/strapi';
import { Haber } from '@/types/news';

// Animasyon varyantları
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HaberlerPage() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        console.log('Tüm haberleri getirme işlemi başlatılıyor...');
        const haberlerData = await getHaberler();
        console.log(`${haberlerData.length} haber başarıyla alındı.`);
        
        // Her haberin veri yapısını kontrol et
        haberlerData.forEach((haber: Haber) => {
          console.log(`Haber ${haber.id}: ${haber.attributes.title}, Slug: ${haber.attributes.slug}`);
        });
        
        setHaberler(haberlerData as Haber[]);
        setError(null);
      } catch (error) {
        console.error('Error fetching haberler:', error);
        setError('Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      } finally {
        setLoading(false);
      }
    };

    fetchHaberler();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Güvenli şekilde görsel URL'si alma
  const getStrapiImageUrl = (haber: Haber) => {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    
    try {
      // Image var mı ve data içeriyor mu?
      if (haber.attributes.image?.data?.attributes?.url) {
        const imageUrl = haber.attributes.image.data.attributes.url;
        return imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`;
      }
    } catch (err) {
      console.error('Görsel URL oluşturulamadı:', err);
    }
    
    return '/images/placeholder.jpg'; // Varsayılan görsel
  };

  // Image var mı kontrol et
  const hasValidImage = (haber: Haber) => {
    return !!haber.attributes.image?.data;
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#333] to-[#af8107]"></div>
          <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Haberler & Duyurular</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                DRN Moda Tekstil'deki en son gelişmeleri ve sektörel haberleri takip edin.
              </p>
            </motion.div>
          </div>
        </section>
      
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af8107]"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#333] to-[#af8107]"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Haberler & Duyurular</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              DRN Moda Tekstil'deki en son gelişmeleri ve sektörel haberleri takip edin.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-500 text-lg font-medium mb-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-[#af8107] text-white rounded-md hover:bg-[#8f6c06] transition-colors"
                >
                  Yeniden Dene
                </button>
              </motion.div>
            </div>
          ) : haberler.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {haberler.map((haber) => (
                <motion.div
                  key={haber.id}
                  variants={fadeIn}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-52">
                    {/* Her haber kartı için ikon */}
                    {hasValidImage(haber) ? (
                      <Image
                        src={getStrapiImageUrl(haber)}
                        alt={haber.attributes.title}
                        fill
                        sizes="100vw"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-gray-200 h-full flex items-center justify-center">
                        <FaNewspaper className="text-gray-400 text-5xl" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <FaCalendarAlt className="mr-2" />
                      <span>
                        {haber.attributes.date 
                          ? formatDate(haber.attributes.date) 
                          : formatDate(haber.attributes.publishedAt)}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {haber.attributes.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {haber.attributes.description || 
                       (haber.attributes.content ? haber.attributes.content.substring(0, 150) + '...' : 'İçerik mevcut değil')}
                    </p>
                    
                    <Link 
                      href={`/haberler/${haber.attributes.slug}`}
                      className="inline-flex items-center text-[#af8107] font-medium hover:underline"
                    >
                      Devamını Oku <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-gray-600 text-lg">Henüz haber bulunmamaktadır.</p>
                <p className="text-gray-500 mt-2">Lütfen daha sonra tekrar ziyaret edin.</p>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 