'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function UretimTesislerimiz() {
  const [activeFacility, setActiveFacility] = useState(null);
  
  const facilities = [
    {
      id: 'istanbul',
      name: 'İstanbul',
      plateCode: 34,
      description: 'İstanbul üretim tesisimiz modern teknoloji ile donatılmıştır. Merkez fabrikamız olarak hizmet vermektedir.',
      position: { top: '30%', left: '20%' }
    },
    {
      id: 'tokat',
      name: 'Tokat Erbaa',
      plateCode: 60,
      description: 'Tokat Erbaa üretim tesisimiz yüksek kapasiteli üretim imkanları sunmaktadır. Anadolu\'daki ana üretim merkezimizdir.',
      position: { top: '45%', left: '60%' }
    }
  ];

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-2">Üretim Tesislerimiz</h1>
      
      <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
      
      <p className="text-center max-w-3xl mx-auto mb-12">
        DRN Moda Tekstil olarak, Türkiye'nin iki farklı şehrinde modern üretim tesislerimizle hizmet
        vermekteyiz.
      </p>
      
      <div className="relative max-w-4xl mx-auto mb-12">
        <div className="turkey-map-container relative">
          <Image 
            src="/images/turkey-map-interactive.svg" 
            alt="DRN Moda Tekstil Türkiye Lokasyonları" 
            width={1000}
            height={500}
            className="w-full h-auto"
            priority
          />
          
          {/* Facility markers */}
          <div className="absolute inset-0">
            {facilities.map(facility => (
              <div 
                key={facility.id}
                className="absolute facility-marker"
                style={{ 
                  top: facility.position.top, 
                  left: facility.position.left 
                }}
                onMouseEnter={() => setActiveFacility(facility.id)}
              >
                <div className="marker-pulse">
                  <span className="absolute -top-8 -left-10 whitespace-nowrap font-semibold w-20 text-center">
                    {facility.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Facility Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          {activeFacility ? (
            <>
              <h3 className="text-2xl font-bold text-primary mb-2">
                {facilities.find(f => f.id === activeFacility).name} Üretim Tesisi
              </h3>
              <p className="text-gray-700">
                {facilities.find(f => f.id === activeFacility).description}
              </p>
            </>
          ) : (
            <p className="text-gray-700 italic">Harita üzerinde bir tesisi seçin</p>
          )}
        </div>
      </div>
      
      {/* Facilities Grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {facilities.map((facility) => (
          <div 
            key={facility.id}
            className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            onMouseEnter={() => setActiveFacility(facility.id)}
            onMouseLeave={() => setActiveFacility(null)}
          >
            <h3 className="text-xl font-bold mb-2">{facility.name} Üretim Tesisi</h3>
            <p className="text-gray-700 mb-4">{facility.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Plaka Kodu: {facility.plateCode}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .turkey-map-container {
          position: relative;
        }
        
        .facility-marker {
          cursor: pointer;
          z-index: 10;
        }
        
        .marker-pulse {
          width: 16px;
          height: 16px;
          background-color: #C8A028;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 0 rgba(200, 160, 40, 0.4);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(200, 160, 40, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(200, 160, 40, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(200, 160, 40, 0);
          }
        }
      `}</style>
    </main>
  );
} 