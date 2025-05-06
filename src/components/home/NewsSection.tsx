'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
};

const newsList: NewsItem[] = [
  {
    id: 1,
    title: 'Yeni Sürdürülebilir Üretim Tesisimiz Hizmete Açıldı',
    excerpt: 'İzmir\'de bulunan yeni üretim tesisimiz, sürdürülebilir teknolojileri ile sektöre öncülük edecek.',
    image: '/images/news/new-facility.jpg',
    date: '15 Mayıs 2023',
    slug: 'yeni-surdurulebilir-uretim-tesisimiz'
  },
  {
    id: 2,
    title: 'Global Tekstil Fuarında Yeni Koleksiyonumuzu Tanıttık',
    excerpt: 'Paris\'te düzenlenen Global Tekstil Fuarı\'nda 2023-2024 koleksiyonumuz büyük ilgi gördü.',
    image: '/images/news/fashion-fair.jpg',
    date: '23 Nisan 2023',
    slug: 'global-tekstil-fuarinda-yeni-koleksiyonumuz'
  },
  {
    id: 3,
    title: 'Arge Merkezi Yatırımımız Tamamlandı',
    excerpt: 'Bursa tesisimizde kurulan yeni Ar-Ge merkezimiz ile inovasyon çalışmalarımızı hızlandırıyoruz.',
    image: '/images/news/rnd-center.jpg',
    date: '10 Mart 2023',
    slug: 'arge-merkezi-yatirimlarimiz'
  }
];

const NewsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-[#af8107] font-medium mb-2">HABERLER & DUYURULAR</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Son Gelişmeler
          </h2>
          <div className="w-20 h-1 bg-[#af8107] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            DRN Moda Tekstil'deki en son gelişmeleri ve sektörel haberleri takip edin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <div 
              key={news.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-52">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#af8107] text-white text-xs font-medium rounded-full">
                    {news.date}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <Link 
                  href={`/haberler/${news.slug}`}
                  className="text-[#af8107] font-medium inline-flex items-center hover:text-amber-800 transition-colors"
                >
                  Devamını Oku
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/haberler">
            <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors">
              Tüm Haberleri Görüntüle
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 