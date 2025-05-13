'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaHistory, FaChartLine, FaBullseye, FaHandshake, FaCircle } from 'react-icons/fa';

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

// Timeline item component interfaces
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, color, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center relative"
  >
    <div className="text-right pr-8 w-1/3">
      <div className="font-bold text-[#C8A028] text-3xl">{year}</div>
      <div className="text-xl font-semibold mt-1 text-gray-800">{title}</div>
    </div>
    
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-[#C8A028] flex items-center justify-center text-white font-bold z-10 relative border-2 border-white shadow-md">
        {year.substring(2, 4)}
      </div>
      <div className="absolute top-6 left-6 h-[70px] w-0.5 bg-gray-200 -z-10"></div>
    </div>
    
    <div className="pl-8 w-1/2 flex items-center">
      <span className="text-[#C8A028] mr-3 flex-shrink-0">{icon}</span>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

// Hiding vertical line for the last item
const LastTimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, color, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center relative"
  >
    <div className="text-right pr-8 w-1/3">
      <div className="font-bold text-[#C8A028] text-3xl">{year}</div>
      <div className="text-xl font-semibold mt-1 text-gray-800">{title}</div>
    </div>
    
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 rounded-full bg-[#C8A028] flex items-center justify-center text-white font-bold z-10 relative border-2 border-white shadow-md">
        {year.substring(2, 4)}
      </div>
    </div>
    
    <div className="pl-8 w-1/2 flex items-center">
      <span className="text-[#C8A028] mr-3 flex-shrink-0">{icon}</span>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export default function HakkimizdaPage() {
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
          
          <div className="space-y-14">
            <TimelineItem 
              year="2015" 
              title="Kuruluş" 
              description="DRN Moda Tekstil, İstanbul'da kuruldu." 
              color="#C8A028" 
              icon={<FaCircle size={14} />} 
            />
            
            <TimelineItem 
              year="2017" 
              title="İlk İhracat" 
              description="Avrupa pazarına ilk ihracatımızı gerçekleştirdik." 
              color="#C8A028" 
              icon={<FaCircle size={14} />} 
            />
            
            <TimelineItem 
              year="2019" 
              title="Yeni Üretim Tesisi" 
              description="Modern ve geniş üretim tesisimize taşındık." 
              color="#C8A028" 
              icon={<FaCircle size={14} />} 
            />
            
            <TimelineItem 
              year="2021" 
              title="Sürdürülebilirlik Dönüşümü" 
              description="Sürdürülebilir üretim süreçlerine geçiş başladı." 
              color="#C8A028" 
              icon={<FaCircle size={14} />} 
            />
            
            <LastTimelineItem 
              year="2023" 
              title="Global Genişleme" 
              description="Orta Doğu ve Uzak Doğu pazarlarına açıldık." 
              color="#C8A028" 
              icon={<FaCircle size={14} />} 
            />
          </div>
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
 