'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHistory, FaChartLine, FaBullseye, FaHandshake } from 'react-icons/fa';

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

export default function HakkimizdaPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/fabrika.jpg" 
            alt="DRN Moda Tekstil Fabrika" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Hakkımızda</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              DRN Moda Tekstil hikayemizi, değerlerimizi ve vizyonumuzu keşfedin.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Company Info Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Bir Bakışta DRN Moda Tekstil</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              2015 yılında kurulan DRN Moda Tekstil, global tekstil sektöründe yenilikçi yaklaşımı ve kaliteli ürünleriyle öncü bir marka haline gelmiştir. İstanbul'daki modern üretim tesislerimizde, en son teknoloji ve sürdürülebilir uygulamalarla, dünya standartlarında tekstil ürünleri üretiyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Müşteri memnuniyetini ve kaliteyi her zaman ön planda tutan firmamız, geniş ürün yelpazesi ve esnek üretim kapasitesiyle Türkiye'den dünyaya hizmet vermektedir. Deneyimli ekibimiz ve güçlü iş ortaklıklarımızla, tekstil sektörünün güvenilir bir tedarikçisi olarak tanınmaktayız.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image 
              src="/images/fabrika-ic.jpg" 
              alt="DRN Moda Tekstil Üretim Alanı" 
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Vizyon & Misyon</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-gray-50 rounded-lg p-8 shadow-lg border-t-4 border-[#af8107]"
            >
              <div className="text-[#af8107] text-5xl mb-6">
                <FaBullseye />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Vizyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Tekstil sektöründe global bir güç haline gelerek, yenilikçi tasarımlarımız, sürdürülebilir uygulamalarımız ve müşteri odaklı yaklaşımımızla dünya çapında tanınan ve tercih edilen bir marka olmak.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-gray-50 rounded-lg p-8 shadow-lg border-t-4 border-[#af8107]"
            >
              <div className="text-[#af8107] text-5xl mb-6">
                <FaHandshake />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Misyonumuz</h3>
              <p className="text-gray-600 leading-relaxed">
                Müşterilerimizin beklentilerini aşan kaliteli ürünler sunmak, sürdürülebilir üretim pratikleri benimsemek, çalışanlarımızın gelişimini desteklemek ve topluma değer katarken sektörde lider konumumuzu güçlendirmek.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Company Values */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Değerlerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <FaHistory className="text-[#af8107] text-3xl" />,
                title: 'Kalite',
                description: 'En yüksek kalite standartlarında ürünler sunmayı taahhüt ediyoruz.'
              },
              {
                icon: <FaChartLine className="text-[#af8107] text-3xl" />,
                title: 'Yenilikçilik',
                description: 'Sürekli kendimizi geliştirerek sektördeki yeni trendleri takip ediyor ve öncülük ediyoruz.'
              },
              {
                icon: <FaBullseye className="text-[#af8107] text-3xl" />,
                title: 'Sürdürülebilirlik',
                description: 'Çevreye duyarlı üretim süreçleri ve sürdürülebilir kaynaklar kullanıyoruz.'
              },
              {
                icon: <FaHandshake className="text-[#af8107] text-3xl" />,
                title: 'Güvenilirlik',
                description: 'Müşterilerimize ve iş ortaklarımıza karşı her zaman dürüst ve şeffaf davranıyoruz.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Company Timeline */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tarihçemiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative border-l-2 border-[#af8107] ml-6 md:ml-0 md:mx-auto"
          >
            {[
              {
                year: '2015',
                title: 'Kuruluş',
                description: 'DRN Moda Tekstil, İstanbul\'da kuruldu.'
              },
              {
                year: '2017',
                title: 'İlk İhracat',
                description: 'Avrupa pazarına ilk ihracatımızı gerçekleştirdik.'
              },
              {
                year: '2019',
                title: 'Yeni Üretim Tesisi',
                description: 'Modern ve geniş üretim tesisimize taşındık.'
              },
              {
                year: '2021',
                title: 'Sürdürülebilirlik Dönüşümü',
                description: 'Sürdürülebilir üretim süreçlerine geçiş başladı.'
              },
              {
                year: '2023',
                title: 'Global Genişleme',
                description: 'Orta Doğu ve Uzak Doğu pazarlarına açıldık.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="mb-12 ml-8 md:ml-0 md:grid md:grid-cols-9 relative"
              >
                <div className="md:col-span-4 md:text-right md:pr-8 mb-2 md:mb-0">
                  <h3 className="text-xl font-bold text-[#af8107]">{item.year}</h3>
                  <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                </div>
                
                <div className="absolute left-[-10px] md:left-1/2 md:ml-[-10px] h-5 w-5 bg-[#af8107] rounded-full"></div>
                
                <div className="md:col-span-4 md:pl-8">
                  <p className="text-gray-600">{item.description}</p>
                </div>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hikayemizin Bir Parçası Olmak İster misiniz?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              DRN Moda Tekstil ile çalışarak, kalitenin ve yenilikçiliğin adresine adım atın.
            </p>
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-lg">
              İletişime Geçin
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 