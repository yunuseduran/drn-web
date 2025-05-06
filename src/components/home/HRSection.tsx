'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HRSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-[#af8107] font-medium mb-2">İNSAN KAYNAKLARI</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ekibimize Katılın
          </h2>
          <div className="w-20 h-1 bg-[#af8107] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            DRN Moda Tekstil olarak, çalışanlarımızın gelişimini destekliyor ve 
            yenilikçi fikirlere değer veriyoruz. Dinamik ekibimizin bir parçası olmak ister misiniz?
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Uygulamalarımız */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-56">
              <Image 
                src="/images/hr-practices.jpg"
                alt="İK Uygulamalarımız"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Uygulamalarımız</h3>
              <p className="text-gray-600 mb-4">
                Çalışanlarımıza sağladığımız sosyal haklar, kariyer gelişimi fırsatları
                ve çalışma koşullarımız hakkında bilgi alın.
              </p>
              <Link href="/insan-kaynaklari/uygulamalarimiz">
                <button className="px-5 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors text-sm">
                  Detaylı Bilgi
                </button>
              </Link>
            </div>
          </div>
          
          {/* Akademi */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-56">
              <Image 
                src="/images/hr-academy.jpg"
                alt="DRN Akademi"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">DRN Akademi</h3>
              <p className="text-gray-600 mb-4">
                Çalışanlarımızın mesleki ve kişisel gelişimini desteklemek için
                sunduğumuz eğitim ve gelişim programlarımız.
              </p>
              <Link href="/insan-kaynaklari/akademi">
                <button className="px-5 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors text-sm">
                  Detaylı Bilgi
                </button>
              </Link>
            </div>
          </div>
          
          {/* Açık Pozisyonlar */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-56">
              <Image 
                src="/images/hr-positions.jpg"
                alt="Açık Pozisyonlar"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Açık Pozisyonlar</h3>
              <p className="text-gray-600 mb-4">
                Ekibimize katılmak için mevcut iş fırsatlarını inceleyin ve
                kariyerinizde bir sonraki adımı bizimle atın.
              </p>
              <Link href="/insan-kaynaklari/acik-pozisyonlar">
                <button className="px-5 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors text-sm">
                  Pozisyonları İncele
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HRSection; 