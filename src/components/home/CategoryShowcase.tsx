'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    title: 'Fitness & Spor',
    description: 'Yüksek performanslı fitness ve spor giyim koleksiyonu',
    image: '/images/fitness.jpg',
    link: '/ne-yapiyoruz/fitness-spor'
  },
  {
    id: 2,
    title: 'Günlük Giyim',
    description: 'Rahat ve şık günlük giyim ürünleri',
    image: '/images/gunluk-giyim.jpg',
    link: '/ne-yapiyoruz/gunluk-giyim'
  },
  {
    id: 3,
    title: 'Takım Sporları',
    description: 'Profesyonel takımlar için özel tasarım formalar',
    image: '/images/sports.jpg',
    link: '/ne-yapiyoruz/takim-sporlari'
  },
  {
    id: 4,
    title: 'Basic Koleksiyon',
    description: 'Yüksek kaliteli temel giyim parçaları',
    image: '/images/basic.jpg',
    link: '/ne-yapiyoruz/basic-koleksiyon'
  }
];

const CategoryShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-[#af8107] font-medium mb-2">KATEGORİLERİMİZ</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tekstil Üretiminde Uzmanlaştığımız Alanlar
          </h2>
          <div className="w-20 h-1 bg-[#af8107] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Geniş ürün yelpazemiz ve farklı kategorilerdeki uzmanlığımızla, 
            müşterilerimizin ihtiyaçlarına özel çözümler sunuyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group relative rounded-lg overflow-hidden shadow-lg h-[400px] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={500}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-300 group-hover:bottom-4">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="mb-4 opacity-90">{category.description}</p>
                <Link href={category.link}>
                  <button className="px-4 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded transition-colors inline-flex items-center text-sm">
                    Daha Fazla
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase; 