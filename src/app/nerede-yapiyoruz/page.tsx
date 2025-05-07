'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaIndustry, FaMapMarkerAlt, FaGlobeEurope, FaUsers, FaWarehouse, FaCheckCircle } from 'react-icons/fa';

// Animasyon varyantları
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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

export default function NeredeYapiyoruzPage() {
  const [activeTab, setActiveTab] = useState('istanbul');

  const locations = {
    istanbul: {
      name: "İstanbul Merkez Üretim Tesisi",
      address: "Organize Sanayi Bölgesi, 34555 Tekstil Caddesi No: 123, İstanbul, Türkiye",
      description: "İstanbul'daki merkez tesisimiz 15.000 m² kapalı alana sahip olup, modern makine parkuru ve 500'ü aşkın çalışanı ile ana üretim merkezimizdir. Tasarım, AR-GE ve idari ofislerimiz de bu tesiste yer almaktadır.",
      capacity: "Aylık 200.000 parça",
      staff: "500+",
      specialties: ["Hazır Giyim", "Örme Ürünler", "Dokuma Ürünler", "Premium Tekstil"],
      images: [
        "/images/fabrika-istanbul-1.jpg",
        "/images/fabrika-istanbul-2.jpg",
        "/images/fabrika-istanbul-3.jpg"
      ]
    },
    izmir: {
      name: "İzmir Üretim Tesisi",
      address: "Ege Serbest Bölgesi, 35000 İhracat Caddesi No: 45, İzmir, Türkiye",
      description: "İzmir'deki tesisimiz özellikle ihracat odaklı üretim için tasarlanmış olup, 8.000 m² alanda faaliyet göstermektedir. Avrupa ve Ortadoğu pazarlarına yönelik üretim hatlarımız burada yer almaktadır.",
      capacity: "Aylık 120.000 parça",
      staff: "300+",
      specialties: ["İhracat Odaklı Üretim", "Ev Tekstili", "Özel Koleksiyonlar", "Organik Tekstil"],
      images: [
        "/images/fabrika-izmir-1.jpg",
        "/images/fabrika-izmir-2.jpg",
        "/images/fabrika-izmir-3.jpg"
      ]
    },
    bursa: {
      name: "Bursa Özel Tekstil Tesisi",
      address: "Tekstil Organize Sanayi Bölgesi, 16000 İpek Sokak No: 78, Bursa, Türkiye",
      description: "Bursa'daki üretim tesisimiz, özellikle yüksek kaliteli ipek ve özel kumaşlardan üretilen premium tekstil ürünlerine odaklanmıştır. 5.000 m² alanda, geleneksel tekstil yöntemleri ile modern teknoloji bir arada kullanılmaktadır.",
      capacity: "Aylık 50.000 parça",
      staff: "200+",
      specialties: ["İpek Ürünler", "Premium Tekstil", "Özel Doku Ürünler", "El İşçiliği"],
      images: [
        "/images/fabrika-bursa-1.jpg",
        "/images/fabrika-bursa-2.jpg",
        "/images/fabrika-bursa-3.jpg"
      ]
    }
  };

  const stats = [
    { icon: <FaIndustry />, value: "3", label: "Üretim Tesisi" },
    { icon: <FaMapMarkerAlt />, value: "20+", label: "İhracat Ülkesi" },
    { icon: <FaGlobeEurope />, value: "4", label: "Distribütör" },
    { icon: <FaUsers />, value: "1000+", label: "Çalışan" },
    { icon: <FaWarehouse />, value: "28.000 m²", label: "Toplam Üretim Alanı" },
    { icon: <FaCheckCircle />, value: "5+", label: "Uluslararası Sertifika" }
  ];

  const activeLocation = locations[activeTab as keyof typeof locations];

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/fabrika-dis.jpg" 
            alt="DRN Moda Tekstil Üretim Tesisleri" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Nerede Yapıyoruz?</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Türkiye'deki modern üretim tesislerimiz ve global tedarik ağımız hakkında bilgi edinin.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center text-center"
              >
                <div className="text-[#af8107] text-4xl mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Üretim Tesislerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              DRN Moda Tekstil olarak, Türkiye'nin üç farklı şehrinde modern üretim tesislerimizle hizmet vermekteyiz.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[500px] w-full relative">
              <Image 
                src="/images/turkiye-haritasi.jpg"
                alt="DRN Moda Tekstil Türkiye Lokasyonları"
                fill
                className="object-cover"
              />
              
              {/* Map Pins */}
              <div className="absolute top-[35%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div 
                  className={`h-6 w-6 rounded-full ${activeTab === 'istanbul' ? 'bg-[#af8107]' : 'bg-gray-500 hover:bg-[#af8107]'} animate-pulse`}
                  onClick={() => setActiveTab('istanbul')}
                ></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-800 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  İstanbul
                </div>
              </div>
              
              <div className="absolute top-[60%] left-[27%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div 
                  className={`h-6 w-6 rounded-full ${activeTab === 'izmir' ? 'bg-[#af8107]' : 'bg-gray-500 hover:bg-[#af8107]'} animate-pulse`}
                  onClick={() => setActiveTab('izmir')}
                ></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-800 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  İzmir
                </div>
              </div>
              
              <div className="absolute top-[45%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div 
                  className={`h-6 w-6 rounded-full ${activeTab === 'bursa' ? 'bg-[#af8107]' : 'bg-gray-500 hover:bg-[#af8107]'} animate-pulse`}
                  onClick={() => setActiveTab('bursa')}
                ></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-800 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Bursa
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Facilities Tabs */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center mb-8 space-x-2 md:space-x-4">
            {Object.keys(locations).map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveTab(loc)}
                className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === loc
                    ? 'bg-[#af8107] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {locations[loc as keyof typeof locations].name}
              </button>
            ))}
          </div>
          
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeLocation.name}</h3>
                <div className="flex items-start mb-4">
                  <FaMapMarkerAlt className="text-[#af8107] text-xl flex-shrink-0 mt-1 mr-3" />
                  <p className="text-gray-600">{activeLocation.address}</p>
                </div>
                <p className="text-gray-700 mb-6">{activeLocation.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Üretim Kapasitesi</p>
                    <p className="text-xl font-semibold text-gray-800">{activeLocation.capacity}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Çalışan Sayısı</p>
                    <p className="text-xl font-semibold text-gray-800">{activeLocation.staff}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Uzmanlık Alanları</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {activeLocation.images.slice(0, 3).map((image, idx) => (
                  <div 
                    key={idx} 
                    className={`relative ${idx === 0 ? 'col-span-2 h-64' : 'h-48'}`}
                  >
                    <Image 
                      src={image}
                      alt={`${activeLocation.name} Görünüm ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Global Network Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Global Varlığımız</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Türkiye'deki üretim tesislerimizin yanı sıra, dünya genelinde distribütör ağımız ve satış ofislerimizle küresel pazarda aktif rol oynuyoruz.
            </p>
          </motion.div>
          
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/images/dunya-haritasi.jpg"
              alt="DRN Moda Tekstil Global Ağ"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-lg max-w-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">20+ Ülkeye İhracat</h3>
                <p className="text-white/90 mb-6">
                  Avrupa, Ortadoğu, Kuzey Afrika ve Asya bölgelerinde 20'den fazla ülkeye ihracat yaparak global tekstil sektöründe güçlü bir konuma sahibiz.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Almanya", "Fransa", "İngiltere", "İtalya", "İspanya", "Hollanda", "Rusya", "BAE"].map((country, idx) => (
                    <span key={idx} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {country}
                    </span>
                  ))}
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">+12 Daha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quality Standards */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Kalite Standartlarımız</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tüm üretim tesislerimizde en yüksek kalite standartlarına uygun üretim yapıyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "ISO 9001:2015",
                description: "Uluslararası Kalite Yönetim Sistemi Standardı, tüm üretim süreçlerimizde uygulanmaktadır."
              },
              {
                name: "OEKO-TEX® Standard 100",
                description: "Ürünlerimizin zararlı kimyasal içermediğini ve insan sağlığına uygun olduğunu belgelendiren sertifika."
              },
              {
                name: "GOTS",
                description: "Global Organik Tekstil Standardı, organik elyaftan yapılan tekstil ürünlerinin üretiminde çevresel ve sosyal kriterleri belirliyor."
              },
              {
                name: "BSCI",
                description: "İş Sosyal Uygunluk Girişimi, çalışma koşullarının iyileştirilmesi ve işçi haklarının korunmasını amaçlıyor."
              },
              {
                name: "GRS",
                description: "Global Geri Dönüşüm Standardı, ürünlerin geri dönüştürülmüş içeriğini, sosyal ve çevresel uygulamaları doğruluyor."
              },
              {
                name: "SEDEX",
                description: "Etik Veri Değişim Üyeliği, tedarik zincirlerinde etik ve sorumlu iş uygulamalarını destekliyor."
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="border-2 border-[#af8107] text-[#af8107] w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold mb-4 mx-auto">
                  ISO
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{cert.name}</h3>
                <p className="text-gray-600 text-center">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-[#af8107]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Üretim Tesislerimizi Ziyaret Etmek İster misiniz?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Üretim süreçlerimizi yakından görmek ve kapasitemiz hakkında bilgi almak için randevu alın.
            </p>
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-lg">
              Randevu Talep Edin
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 