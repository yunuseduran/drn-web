'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaWater, FaSeedling, FaHandHoldingHeart, FaUsers, FaSolarPanel, FaTree } from 'react-icons/fa';

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

export default function SurdurulebilirlikPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sürdürülebilirlik</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Doğaya saygılı üretim süreçlerimiz ve sürdürülebilir geleceğe katkılarımız.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Sürdürülebilir Üretim Anlayışımız</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              DRN Moda Tekstil olarak, üretim süreçlerimizin her aşamasında çevreye ve topluma karşı sorumluluklarımızın farkındayız. Sürdürülebilirlik stratejimiz, sadece çevre dostu üretim uygulamalarını değil, aynı zamanda sosyal sorumluluk projelerini ve etik iş standartlarını da kapsamaktadır.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Yenilikçi teknolojiler ve sürdürülebilir malzemeler kullanarak, tekstil sektörünün karbon ayak izini azaltmayı ve gelecek nesillere daha temiz bir dünya bırakmayı hedefliyoruz. Ürettiğimiz her ürünün çevresel etkisini minimize etmek için sürekli olarak çalışıyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image 
              src="/images/surdurulebilir-uretim.jpg" 
              alt="DRN Moda Tekstil Sürdürülebilir Üretim" 
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Commitments Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sürdürülebilirlik Taahhütlerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Sürdürülebilir bir gelecek için çevresel, sosyal ve ekonomik alanlarda attığımız adımlar ve hedeflerimiz.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <FaLeaf className="text-green-600 text-4xl" />,
                title: "Çevre Dostu Üretim",
                description: "Üretim süreçlerimizde enerji ve su tüketimini azaltarak çevresel etkimizi minimize ediyoruz."
              },
              {
                icon: <FaRecycle className="text-green-600 text-4xl" />,
                title: "Geri Dönüşüm",
                description: "Atık yönetimine önem vererek, tekstil atıklarının geri dönüştürülmesini ve yeniden kullanımını sağlıyoruz."
              },
              {
                icon: <FaHandHoldingHeart className="text-green-600 text-4xl" />,
                title: "Sosyal Sorumluluk",
                description: "Çalışanlarımıza adil çalışma koşulları sağlıyor ve toplum yararına projeler geliştiriyoruz."
              },
              {
                icon: <FaSeedling className="text-green-600 text-4xl" />,
                title: "Sürdürülebilir Malzemeler",
                description: "Organik, geri dönüştürülmüş ve sürdürülebilir kaynaklardan elde edilen malzemeler kullanıyoruz."
              }
            ].map((commitment, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6 flex justify-center">{commitment.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{commitment.title}</h3>
                <p className="text-gray-600 text-center">{commitment.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Environmental Initiatives */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Çevresel Girişimlerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Çevresel sürdürülebilirlik için yürüttüğümüz projeler ve uygulamalarımız.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {[
              {
                title: "Su Tasarrufu Programı",
                description: "Tekstil üretiminde su kullanımını azaltmak için yenilikçi yöntemler ve ileri teknoloji kullanıyoruz. Son 5 yılda su tüketimimizi %30 oranında azalttık ve 2025 yılına kadar %50 azaltmayı hedefliyoruz.",
                image: "/images/su-tasarrufu.jpg",
                icon: <FaWater className="text-blue-500 text-3xl" />,
                stats: [
                  { label: "Su Tasarrufu", value: "%30" },
                  { label: "2025 Hedefi", value: "%50" }
                ],
                reverse: false
              },
              {
                title: "Yenilenebilir Enerji Kullanımı",
                description: "Üretim tesislerimizde güneş enerjisi panelleri kullanarak enerji ihtiyacımızın bir kısmını yenilenebilir kaynaklardan sağlıyoruz. Tesislerimizde enerji verimliliğini artırmak için LED aydınlatma ve enerji tasarruflu ekipmanlar kullanıyoruz.",
                image: "/images/yenilenebilir-enerji.jpg",
                icon: <FaSolarPanel className="text-yellow-500 text-3xl" />,
                stats: [
                  { label: "Güneş Enerjisi", value: "%25" },
                  { label: "CO2 Azaltımı", value: "860 ton/yıl" }
                ],
                reverse: true
              },
              {
                title: "Atık Yönetimi ve Geri Dönüşüm",
                description: "Üretim sürecinde ortaya çıkan tekstil atıklarını minimize ediyor ve geri dönüşüme kazandırıyoruz. Sıfır atık politikamız doğrultusunda, tüm tesislerimizde kapsamlı bir atık yönetim sistemi uyguluyoruz.",
                image: "/images/geri-donusum.jpg",
                icon: <FaRecycle className="text-green-500 text-3xl" />,
                stats: [
                  { label: "Geri Dönüşüm Oranı", value: "%85" },
                  { label: "Yeniden Kullanım", value: "12 ton/ay" }
                ],
                reverse: false
              }
            ].map((initiative, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${initiative.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`order-2 ${initiative.reverse ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src={initiative.image} 
                      alt={initiative.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className={`order-1 ${initiative.reverse ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="flex items-center mb-4">
                    <div className="mr-4">{initiative.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{initiative.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {initiative.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 shadow-md">
                        <p className="text-3xl font-bold text-[#af8107]">{stat.value}</p>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Social Responsibility Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sosyal Sorumluluk Projelerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Topluma değer katmak ve sürdürülebilir bir gelecek için yürüttüğümüz sosyal sorumluluk projeleri.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Tekstil Akademisi",
                description: "Gençlere tekstil sektöründe kariyer fırsatları sunmak için eğitim programları düzenliyoruz. Her yıl 100'den fazla öğrenciye burs ve staj imkanı sağlıyoruz.",
                image: "/images/tekstil-akademisi.jpg",
                icon: <FaUsers className="text-purple-500" />
              },
              {
                title: "Kadın İstihdamı Projesi",
                description: "Kadınların iş gücüne katılımını desteklemek için özel programlar yürütüyor ve istihdam fırsatları sunuyoruz. Çalışanlarımızın %60'ını kadınlar oluşturuyor.",
                image: "/images/kadin-istihdami.jpg",
                icon: <FaHandHoldingHeart className="text-pink-500" />
              },
              {
                title: "Ağaç Dikme Kampanyası",
                description: "Her yıl düzenlediğimiz kampanya ile binlerce ağaç dikiyoruz. Bugüne kadar 50.000'den fazla ağaç dikerek doğaya katkı sağladık.",
                image: "/images/agac-dikme.jpg",
                icon: <FaTree className="text-green-500" />
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{project.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link href="/iletisim">
                    <button className="text-[#af8107] font-medium hover:underline">
                      Daha Fazla Bilgi &rarr;
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Sustainable Certifications */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sürdürülebilirlik Sertifikalarımız</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Sürdürülebilirlik çalışmalarımızın kalitesini ve güvenilirliğini belgelemek için aldığımız uluslararası sertifikalar.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              {
                name: "GOTS",
                full: "Global Organic Textile Standard",
                image: "/images/gots.png"
              },
              {
                name: "OEKO-TEX",
                full: "STANDARD 100 by OEKO-TEX",
                image: "/images/oeko-tex.png"
              },
              {
                name: "GRS",
                full: "Global Recycled Standard",
                image: "/images/grs.png"
              },
              {
                name: "BCI",
                full: "Better Cotton Initiative",
                image: "/images/bci.png"
              },
              {
                name: "ZDHC",
                full: "Zero Discharge of Hazardous Chemicals",
                image: "/images/zdhc.png"
              },
              {
                name: "EU Ecolabel",
                full: "European Union Ecolabel",
                image: "/images/eu-ecolabel.png"
              },
              {
                name: "Bluesign",
                full: "Bluesign System",
                image: "/images/bluesign.png"
              },
              {
                name: "ISO 14001",
                full: "Environmental Management System",
                image: "/images/iso14001.png"
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
              >
                <div className="relative h-16 w-full mb-4">
                  <Image 
                    src={cert.image} 
                    alt={cert.name} 
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{cert.name}</h3>
                <p className="text-gray-500 text-sm text-center">{cert.full}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Goals Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#af8107] to-[#d4a72c] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">2030 Sürdürülebilirlik Hedeflerimiz</h2>
            <div className="h-1 w-24 bg-white mx-auto mb-8"></div>
            <p className="text-white/90 max-w-3xl mx-auto">
              Daha sürdürülebilir bir gelecek için belirlediğimiz uzun vadeli hedeflerimiz.
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
              "2030 yılına kadar karbon ayak izimizi %70 azaltmak",
              "Üretimde kullanılan suyun %90'ını geri dönüştürmek",
              "Enerji ihtiyacımızın %100'ünü yenilenebilir kaynaklardan sağlamak",
              "Sıfır atık politikasını tüm tesislerimizde tam olarak uygulamak",
              "Sürdürülebilir ve organik malzeme kullanımını %80'e çıkarmak",
              "Tedarik zincirimizde %100 sürdürülebilirlik sağlamak"
            ].map((goal, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start">
                  <div className="bg-white text-[#af8107] h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1 mr-4">
                    {index + 1}
                  </div>
                  <p className="text-white text-lg">{goal}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mt-16"
          >
            <Link href="/iletisim">
              <button className="px-8 py-4 bg-white text-[#af8107] hover:bg-gray-100 font-bold rounded-full transition-colors text-lg shadow-lg">
                Sürdürülebilirlik Projelerimizde Yer Alın
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Annual Report */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-gray-50 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="relative h-64 w-full">
                  <Image 
                    src="/images/sustainability-report.jpg" 
                    alt="DRN Moda Tekstil Sürdürülebilirlik Raporu" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sürdürülebilirlik Raporumuz</h3>
                <p className="text-gray-600 mb-6">
                  Sürdürülebilirlik alanında attığımız adımlar, başarılarımız ve gelecek hedeflerimiz hakkında detaylı bilgi edinmek için yıllık sürdürülebilirlik raporumuzu inceleyebilirsiniz.
                </p>
                <a 
                  href="/documents/2023-sustainability-report.pdf" 
                  className="inline-flex items-center px-6 py-3 bg-[#af8107] text-white font-medium rounded-lg transition-colors hover:bg-[#8f6c06]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>2023 Sürdürülebilirlik Raporu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
 