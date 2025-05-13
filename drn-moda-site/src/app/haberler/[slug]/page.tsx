'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowLeft, FaShare, FaNewspaper } from 'react-icons/fa';
import { getHaberBySlug } from '@/lib/api/strapi';
import { Haber } from '@/types/news';

// Animasyon varyantları
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HaberDetayPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [haber, setHaber] = useState<Haber | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHaber = async () => {
      if (!slug) {
        setError('Geçersiz haber URL\'si.');
        setLoading(false);
        return;
      }

      try {
        console.log('Haber detayı getiriliyor, slug:', slug);
        const haberData = await getHaberBySlug(slug as string);
        
        if (!haberData) {
          setError('Haber bulunamadı.');
        } else {
          console.log('Haber detayı yüklendi, ID:', haberData.id, 'Title:', haberData.attributes.title);
          console.log('Haber içeriği:', haberData.attributes.content);
          setHaber(haberData);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching haber:', error);
        setError('Haber yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      } finally {
        setLoading(false);
      }
    };

    fetchHaber();
  }, [slug]);

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af8107]"></div>
      </div>
    );
  }

  if (error || !haber) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {error || 'Haber Bulunamadı'}
        </h1>
        <p className="text-gray-600 mb-6">
          {!error && 'Aradığınız haber bulunamadı veya kaldırılmış olabilir.'}
        </p>
        <Link href="/haberler" className="px-6 py-2 bg-[#af8107] text-white rounded-lg hover:bg-[#8f6c06] transition-colors">
          Haberlere Dön
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#333] to-[#af8107]" />
        {/* Haber görseli */}
        {hasValidImage(haber) && (
          <Image
            src={getStrapiImageUrl(haber)}
            alt={haber.attributes.title}
            fill
            className="object-cover w-full h-full opacity-40"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaNewspaper className="text-white opacity-10 text-9xl" />
        </div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {haber.attributes.title}
            </h1>
            <div className="flex items-center justify-center text-white/90 text-lg">
              <FaCalendarAlt className="mr-2" />
              <span>
                {haber.attributes.date 
                  ? formatDate(haber.attributes.date) 
                  : formatDate(haber.attributes.publishedAt)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Article Content Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-6 md:p-10"
          >
            {/* Description if available */}
            {haber.attributes.description && (
              <div className="mb-8 text-xl text-gray-700 font-medium italic border-l-4 border-[#af8107] pl-4 py-2">
                {haber.attributes.description}
              </div>
            )}
            
            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-8 text-gray-800">
              {haber.attributes.content ? (
                <div dangerouslySetInnerHTML={{ __html: haber.attributes.content.replace(/\n/g, '<br />') }} />
              ) : (
                <p className="text-gray-500 italic">Bu haber için içerik bulunmamaktadır.</p>
              )}
            </div>
            
            {/* Share and Navigation */}
            <div className="border-t pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
              <button 
                onClick={() => router.back()}
                className="flex items-center text-[#af8107] font-medium mb-4 md:mb-0"
              >
                <FaArrowLeft className="mr-2" /> Haberlere Dön
              </button>
              
              <div className="flex items-center">
                <span className="text-gray-600 mr-3">Paylaş:</span>
                <div className="flex space-x-2">
                  {/* Facebook */}
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
                    aria-label="Facebook'ta Paylaş"
                  >
                    <FaShare className="text-xs" />
                  </button>
                  {/* Twitter */}
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(haber.attributes.title)}`, '_blank')}
                    className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center"
                    aria-label="Twitter'da Paylaş"
                  >
                    <FaShare className="text-xs" />
                  </button>
                  {/* Instagram Hikaye (yönlendirme) */}
                  <button
                    onClick={() => window.open('https://www.instagram.com/', '_blank')}
                    className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center"
                    aria-label="Instagram Hikaye"
                  >
                    <FaShare className="text-xs" />
                  </button>
                  {/* Link Kopyala */}
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center"
                    aria-label="Linki Kopyala"
                  >
                    <FaShare className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Related News Section (İleride eklenebilir) */}
    </main>
  );
} 