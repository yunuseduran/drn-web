'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Location = {
  id: number;
  name: string;
  city: string;
  country: string;
  type: string;
  image: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: 'Genel Merkez',
    city: 'İstanbul',
    country: 'Türkiye',
    type: 'Genel Merkez ve Showroom',
    image: '/images/locations/istanbul-hq.jpg',
  },
  {
    id: 2,
    name: 'Tokat Erbaa, Tesisi',
    city: 'Tokat',
    country: 'Türkiye',
    type: 'Üretim Tesisi',
    image: '/images/locations/bursa-factory.jpg',
  },
  {
    id: 3,
    name: 'İstanbul, Tesisi',
    city: 'İstanbul',
    country: 'Türkiye',
    type: 'Kesimhane',
    image: '/images/locations/izmir-factory.jpg',
  }
];

const LocationsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-[#af8107] font-medium mb-2">NEREDE YAPIYORUZ</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Global Ayak İzimiz
          </h2>
          <div className="w-20 h-1 bg-[#af8107] mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Türkiye'deki modern tesislerimizde, dünya standartlarında 
            üretim yaparak küresel müşterilerimize hizmet veriyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div 
              key={location.id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-60">
                <Image
                  src={location.image}
                  alt={location.name}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <span className="inline-block px-3 py-1 bg-[#af8107] text-white text-xs font-medium rounded-full mb-2">
                    {location.type}
                  </span>
                  <h3 className="text-xl font-bold text-white">{location.name}</h3>
                  <p className="text-white/90">{location.city}, {location.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/nerede-yapiyoruz">
            <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-md transition-colors inline-flex items-center">
              Tüm Lokasyonlarımız
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection; 