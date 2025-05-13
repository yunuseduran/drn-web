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

export default function NewsSection() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        console.log('Haberler getiriliyor...');
        const haberlerData = await getHaberler();
        console.log('Haberler alındı, toplam:', haberlerData.length);
        
        // API yanıtını konsola logla
        haberlerData.forEach((haber: Haber) => {
          console.log(`Haber ${haber.id}: ${haber.attributes.title}`);
        });
        
        // Sadece en son 3 haberi gösteriyoruz
        setHaberler(haberlerData.slice(0, 3));
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

  // Güvenli görsel url fonksiyonu
  const getImageUrl = (haber: Haber) => {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    if (
      haber.attributes.image &&
      haber.attributes.image.data &&
      haber.attributes.image.data.attributes &&
      haber.attributes.image.data.attributes.url
    ) {
      const url = haber.attributes.image.data.attributes.url;
      return url.startsWith('http') ? url : `${API_URL}${url}`;
    }
    return null;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Son Gelişmeler
            </h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-4"></div>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#af8107]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Son Gelişmeler
            </h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-4"></div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#af8107] text-white rounded-md hover:bg-[#8f6c06] transition-colors"
            >
              Yeniden Dene
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Son Gelişmeler
            </h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Henüz haber bulunmamaktadır. Lütfen daha sonra tekrar ziyaret edin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Son Gelişmeler
          </h2>
          <div className="h-1 w-24 bg-[#af8107] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            DRN Moda Tekstil'deki en son gelişmeleri ve sektörel haberleri takip edin.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {haberler.map((haber) => {
            const imageUrl = getImageUrl(haber);
            return (
              <motion.div
                key={haber.id}
                variants={fadeIn}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-52">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
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
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {haber.attributes.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {haber.attributes.description || 
                     (haber.attributes.content ? haber.attributes.content.substring(0, 120) + '...' : 'İçerik mevcut değil')}
                  </p>
                  
                  <Link 
                    href={`/haberler/${haber.attributes.slug}`}
                    className="inline-flex items-center text-[#af8107] font-medium hover:underline"
                  >
                    Devamını Oku <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <Link 
            href="/haberler"
            className="px-8 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors inline-flex items-center"
          >
            Tüm Haberleri Görüntüle <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 