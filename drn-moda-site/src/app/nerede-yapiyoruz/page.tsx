'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaIndustry, FaMapMarkerAlt, FaGlobeEurope, FaUsers, FaWarehouse, FaCheckCircle } from 'react-icons/fa';
import TurkeyMap from '../../components/TurkeyMap';

// Animation variants
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
  const [activeTab, setActiveTab] = useState('istanbul-merkez');

  const locations = {
    'istanbul-merkez': {
      name: "Genel Merkez",
      address: "İstanbul, Türkiye",
      description: "İstanbul'daki genel merkez ve showroom tesisimiz, yönetim, pazarlama ve tasarım ekiplerimize ev sahipliği yapmaktadır. Müşterilerimizle buluşmalarımızı burada gerçekleştirmekteyiz.",
      capacity: "Showroom ve Yönetim",
      staff: "50+",
      specialties: ["Yönetim", "Showroom", "Tasarım", "Pazarlama"],
      images: [
        "/images/fabrika.jpg",
        "/images/fabrika-ic.jpg"
      ],
      plateCode: "34"
    },
    'tokat': {
      name: "Tokat Erbaa, Tesisi",
      address: "Tokat, Türkiye",
      description: "Tokat Erbaa'daki üretim tesisimiz, ana üretim merkezimiz olup modern makine parkuru ile kaliteli ürünler üretmektedir.",
      capacity: "Üretim Tesisi",
      staff: "200+",
      specialties: ["Üretim", "Kalite Kontrol", "Paketleme"],
      images: [
        "/images/fabrika.jpg",
        "/images/fabrika-ic.jpg"
      ],
      plateCode: "60"
    },
    'istanbul-kesimhane': {
      name: "İstanbul, Tesisi",
      address: "İstanbul, Türkiye",
      description: "İstanbul'daki tesisimiz, kesimhane olarak hizmet vermekte ve ürünlerimizin ilk aşamasını burada gerçekleştirmekteyiz.",
      capacity: "Kesimhane",
      staff: "100+",
      specialties: ["Kesim", "Model Hazırlama", "Kalıp"],
      images: [
        "/images/fabrika.jpg",
        "/images/fabrika-ic.jpg"
      ],
      plateCode: "34"
    }
  };

  const stats = [
    { icon: <FaIndustry />, value: "3", label: "Üretim Tesisi" },
    { icon: <FaMapMarkerAlt />, value: "2", label: "Farklı Şehir" },
    { icon: <FaGlobeEurope />, value: "20+", label: "İhracat Ülkesi" },
    { icon: <FaUsers />, value: "350+", label: "Çalışan" },
    { icon: <FaWarehouse />, value: "10.000+ m²", label: "Toplam Üretim Alanı" },
    { icon: <FaCheckCircle />, value: "4+", label: "Uluslararası Sertifika" }
  ];

  const activeLocation = locations[activeTab as keyof typeof locations];

  // Handle province hover on Turkey map
  const handleProvinceHover = (locationKey: string) => {
    // Direkt olarak locationKey'i kullanarak aktif tabı belirle
    if (locationKey && locations[locationKey as keyof typeof locations]) {
      setActiveTab(locationKey);
    }
  };

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#333] to-[#af8107]"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
        
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
              DRN Moda Tekstil olarak, Türkiye'nin iki farklı şehrinde modern üretim tesislerimizle hizmet vermekteyiz.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full relative h-[650px]">
              {/* Interactive Turkey Map Component */}
              <TurkeyMap onProvinceHover={handleProvinceHover} />
            </div>
          </div>
          
          {/* Additional information below map */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#af8107] flex items-center justify-center text-white font-bold mr-3">2</div>
                <h3 className="font-bold text-gray-800">Şehir</h3>
              </div>
              <p className="text-gray-600 text-sm">İstanbul ve Tokat'ta stratejik konumda bulunan tesislerimiz</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#af8107] flex items-center justify-center text-white font-bold mr-3">3</div>
                <h3 className="font-bold text-gray-800">Tesis</h3>
              </div>
              <p className="text-gray-600 text-sm">Üretimin her aşaması için özelleşmiş modern tesisler</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#af8107] flex items-center justify-center text-white font-bold mr-3">+</div>
                <h3 className="font-bold text-gray-800">Genişleme</h3>
              </div>
              <p className="text-gray-600 text-sm">Hızla büyüyen kapasitemiz ile yeni lokasyonlara genişleme planlarımız</p>
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
                  <p className="text-gray-600 font-medium">{activeLocation.address}</p>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{activeLocation.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 font-medium">Kapasite</p>
                    <p className="font-semibold text-lg">{activeLocation.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1 font-medium">Çalışan</p>
                    <p className="font-semibold text-lg">{activeLocation.staff}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2 font-medium">Uzmanlık Alanları</p>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.specialties.map((specialty, index) => (
                      <span key={index} className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="px-5 py-2 bg-[#af8107] text-white rounded-lg font-medium hover:bg-[#8a6606] transition-colors">
                  İletişime Geç
                </button>
              </div>
              
              <div className="bg-gray-100 flex items-center justify-center p-4">
                <div className="relative h-full w-full">
                  {activeLocation.images[0] && (
                    <Image 
                      src={activeLocation.images[0]}
                      alt={`${activeLocation.name} Üretim Tesisi`}
                      fill
                      className="object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Additional Info Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Stratejik Konum</h2>
                <div className="h-1 w-24 bg-[#af8107] mb-6"></div>
                <p className="text-gray-600 mb-4">
                  Tesislerimizin konumlarını, lojistik avantajlar, nitelikli işgücüne erişim ve ihracat kolaylıkları göz önünde bulundurarak seçtik. İstanbul'daki merkez tesisimiz, küresel pazarlara hızlı erişim sağlarken, Tokat Erbaa'daki üretim tesisimiz verimli üretim kapasitesiyle öne çıkıyor.
                </p>
                <p className="text-gray-600">
                  Her tesisimiz, modern ekipmanlar ve sürdürülebilir üretim teknolojileriyle donatılmıştır. Üretim süreçlerimizin her aşamasında kalite kontrol sistemlerimiz ile müşterilerimize en yüksek kalitede ürünler sunuyoruz.
                </p>
              </motion.div>
            </div>
            
            <div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sürdürülebilir Üretim</h2>
                <div className="h-1 w-24 bg-[#af8107] mb-6"></div>
                <p className="text-gray-600 mb-4">
                  Tüm üretim tesislerimizde çevresel sürdürülebilirliği ön planda tutuyoruz. Su tasarrufu, enerji verimliliği ve atık yönetimi konularında yenilikçi çözümler uyguluyoruz.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#af8107] mr-2 mt-0.5">✓</span>
                    <span>Su tüketiminde %30 azalma sağlayan teknolojiler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af8107] mr-2 mt-0.5">✓</span>
                    <span>Güneş enerjisi panelleri ile kısmi enerji üretimi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af8107] mr-2 mt-0.5">✓</span>
                    <span>Tekstil atıklarının geri dönüşümü ve yeniden değerlendirilmesi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#af8107] mr-2 mt-0.5">✓</span>
                    <span>GOTS ve Oeko-Tex sertifikalarına uygun üretim süreçleri</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
 