'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SustainabilitySection = () => {
  return (
    <section className="py-16 md:py-24 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h6 className="text-[#af8107] font-medium mb-2">SÜRDÜRÜLEBİLİRLİK</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Çevre Dostu Üretim ve Sorumlu Kaynak Kullanımı
            </h2>
            <div className="w-20 h-1 bg-[#af8107] mb-6"></div>
            
            <p className="text-gray-600 text-lg mb-6">
              DRN Moda Tekstil olarak, sürdürülebilirlik ilkelerini işimizin merkezine alıyoruz. 
              Üretim süreçlerimizde su ve enerji tüketimini azaltmak, kimyasal kullanımını 
              sınırlandırmak ve atık yönetimini etkin bir şekilde gerçekleştirmek için çalışıyoruz.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#af8107]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Geri Dönüştürülmüş Materyaller</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#af8107]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Su Tasarrufu Teknolojileri</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#af8107]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">Karbon Ayak İzi Azaltma</span>
              </div>
            </div>
            
            <Link href="/surdurulebilirlik">
              <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors inline-flex items-center">
                Sürdürülebilirlik Yaklaşımımız
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </Link>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 relative h-[400px]">
            <Image 
              src="/images/sustainability.jpg"
              alt="Sürdürülebilir Tekstil Üretimi"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#af8107]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[#af8107] font-bold">%30</span>
                  <span className="text-sm text-gray-600">Daha Az Su Kullanımı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection; 