'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image 
              src="/images/fabrika.jpg"
              alt="DRN Moda Tekstil Fabrikası"
              width={800}
              height={600}
              className="object-cover h-full w-full rounded-lg shadow-lg"
            />
          </div>
          
          {/* Content Column */}
          <div className="space-y-6">
            <div>
              <h6 className="text-[#af8107] font-medium mb-2">HAKKIMIZDA</h6>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Global Tekstil Sektöründe 25 Yıllık Tecrübe
              </h2>
              <div className="w-20 h-1 bg-[#af8107] mb-6"></div>
            </div>
            
            <p className="text-gray-600 text-lg mb-4">
              DRN Moda Tekstil olarak, 1998&apos;den bu yana dünya çapında müşterilerimize
              yüksek kaliteli tekstil ürünleri sunarak sektöre öncülük ediyoruz. Günümüzün hızla değişen
              moda dünyasında, yenilikçi tasarımlarımız ve çevre dostu üretim süreçlerimizle fark yaratıyoruz.
            </p>
            
            <p className="text-gray-600 text-lg">
              Türkiye&apos;deki modern tesislerimizde, dünya standartlarında üretim yaparak Avrupa, Amerika ve
              Orta Doğu&apos;daki önde gelen markalara hizmet veriyoruz.
            </p>
            
            <div className="pt-4">
              <Link href="/hakkimizda">
                <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors inline-flex items-center">
                  Daha Fazla Bilgi
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 