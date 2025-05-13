'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTshirt, FaRulerCombined, FaTruck, FaHandshake, FaSearch, FaClipboardCheck } from 'react-icons/fa';

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

export default function NeYapiyoruzPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Ne Yapıyoruz?</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tekstil sektöründe sunduğumuz hizmetleri ve ürünlerimizi keşfedin.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hizmetlerimize Genel Bakış</h2>
          <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            DRN Moda Tekstil olarak, tekstil tasarımından üretimine, kalite kontrolünden sevkiyata kadar tüm süreçlerde kaliteli ve güvenilir hizmetler sunuyoruz.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FaTshirt className="text-[#af8107] text-4xl" />,
              title: "Tekstil Ürünleri",
              description: "Geniş ürün yelpazemizle her türlü tekstil ihtiyacınızı karşılıyoruz."
            },
            {
              icon: <FaRulerCombined className="text-[#af8107] text-4xl" />,
              title: "Tasarım Hizmetleri",
              description: "Uzman tasarım ekibimizle özel koleksiyonlar ve ürünler tasarlıyoruz."
            },
            {
              icon: <FaTruck className="text-[#af8107] text-4xl" />,
              title: "Lojistik Çözümler",
              description: "Ulusal ve uluslararası sevkiyat hizmetleriyle ürünlerinizi güvenle teslim ediyoruz."
            },
            {
              icon: <FaHandshake className="text-[#af8107] text-4xl" />,
              title: "İş Ortaklıkları",
              description: "Uzun vadeli ve sürdürülebilir iş birliktelikleri kuruyoruz."
            },
            {
              icon: <FaSearch className="text-[#af8107] text-4xl" />,
              title: "Ar-Ge Çalışmaları",
              description: "Sektördeki yenilikleri takip ederek sürekli gelişim sağlıyoruz."
            },
            {
              icon: <FaClipboardCheck className="text-[#af8107] text-4xl" />,
              title: "Kalite Kontrol",
              description: "Her ürünü titizlikle kontrol ederek kalite standartlarımızı koruyoruz."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Product Categories Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ürün Kategorilerimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Geniş ürün yelpazemizle farklı ihtiyaçlara yönelik çözümler sunuyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-20"
          >
            {[
              {
                title: "Hazır Giyim",
                description: "Kadın, erkek ve çocuk giyim ürünlerinde geniş bir yelpazeye sahibiz. T-shirt'ten pantolona, ceketlerden elbiselere kadar pek çok ürün kategorisinde hizmet veriyoruz.",
                image: "/images/hazir-giyim.jpg",
                reverse: false,
                items: ["T-shirt", "Pantolon", "Gömlek", "Ceket", "Elbise", "Sweatshirt", "Dış Giyim", "İç Giyim"]
              },
              {
                title: "Ev Tekstili",
                description: "Yatak örtülerinden perdelere, havlulardan masa örtülerine kadar ev tekstilinde kaliteli ürünler sunuyoruz. Özel tasarım desenler ve dayanıklı kumaşlarla üretilen ürünlerimiz uzun ömürlü kullanım sağlıyor.",
                image: "/images/ev-tekstil.jpg",
                reverse: true,
                items: ["Yatak Örtüleri", "Nevresim Takımları", "Perdeler", "Havlular", "Masa Örtüleri", "Dekoratif Yastıklar", "Battaniyeler", "Halılar"]
              },
              {
                title: "Endüstriyel Tekstil",
                description: "Otel, hastane, restoran gibi işletmelerin ihtiyacı olan endüstriyel tekstil ürünlerinde profesyonel çözümler sunuyoruz. Dayanıklı ve fonksiyonel özelliklere sahip ürünlerimiz işletmelerin ihtiyaçlarına göre özelleştirilebiliyor.",
                image: "/images/endustriyel.jpg",
                reverse: false,
                items: ["Otel Tekstili", "Hastane Tekstili", "Restoran Tekstili", "İş Kıyafetleri", "Endüstriyel Perdeler", "Endüstriyel Halılar", "Logo Baskılı Ürünler", "Özel Tasarım Tekstiller"]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${category.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`order-2 ${category.reverse ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src={category.image} 
                      alt={category.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className={`order-1 ${category.reverse ? 'md:order-2' : 'md:order-1'}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-[#af8107] rounded-full mr-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Çalışma Sürecimiz</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              İhtiyaçlarınızı anlamaktan ürünün teslimine kadar her aşamada profesyonel ve şeffaf bir süreç yürütüyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#af8107]"></div>
            
            {[
              {
                title: "İhtiyaç Analizi",
                description: "Müşterilerimizin ihtiyaçlarını detaylı olarak analiz ediyor, beklentileri ve hedefleri belirliyoruz."
              },
              {
                title: "Tasarım ve Planlama",
                description: "Uzman tasarım ekibimizle konsept oluşturuyor, ürün tasarımlarını ve üretim planlamasını yapıyoruz."
              },
              {
                title: "Numune Üretimi",
                description: "Tasarımları hayata geçirerek numune ürünler üretiyor ve müşterilerimizin onayına sunuyoruz."
              },
              {
                title: "Üretim Süreci",
                description: "Onaylanan tasarımların seri üretimini başlatıyor, her aşamada kalite kontrolü sağlıyoruz."
              },
              {
                title: "Kalite Kontrol",
                description: "Üretilen her ürün, deneyimli kalite kontrol ekibimiz tarafından titizlikle inceleniyor."
              },
              {
                title: "Sevkiyat ve Teslimat",
                description: "Ürünleri özenle paketleyerek, zamanında ve güvenli bir şekilde sevkiyatını gerçekleştiriyoruz."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative mb-12 md:mb-24"
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-0 md:mr-auto md:pr-12' : 'md:mr-0 md:ml-auto md:pl-12'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="h-12 w-12 flex items-center justify-center bg-[#af8107] text-white rounded-full font-bold text-xl mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {/* Timeline Circle */}
                <div className="hidden md:block absolute top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#af8107] rounded-full border-4 border-white shadow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Müşteri Yorumları</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Değerli müşterilerimizin hizmetlerimiz hakkındaki düşünceleri.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Ayşe Yılmaz",
                company: "YKM Moda",
                testimony: "DRN Moda Tekstil ile üç yıldır çalışıyoruz. Kaliteli ürünleri, zamanında teslimatları ve profesyonel yaklaşımlarıyla her zaman beklentilerimizin üzerinde performans gösteriyorlar.",
                image: "/images/testimonial-1.jpg"
              },
              {
                name: "Mehmet Kaya",
                company: "Global Tekstil",
                testimony: "Özellikle tasarım süreçlerindeki yaratıcı yaklaşımları ve hızlı çözüm üretme kabiliyetleri ile sektörde fark yaratıyorlar. İş ortağımız olarak çalışmaktan memnuniyet duyuyoruz.",
                image: "/images/testimonial-2.jpg"
              },
              {
                name: "Zeynep Demir",
                company: "Batı Giyim",
                testimony: "Kalite standartlarından ödün vermeden üretim yapmaları ve müşteri odaklı yaklaşımları nedeniyle tercih ediyoruz. İhtiyaçlarımızı her zaman anlayarak en uygun çözümleri sunuyorlar.",
                image: "/images/testimonial-3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-50 rounded-lg p-8 shadow-md relative"
              >
                <div className="text-[#af8107] text-6xl absolute top-4 right-6 opacity-10">"</div>
                <p className="text-gray-600 mb-6 relative z-10">{testimonial.testimony}</p>
                
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
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
              Projeniz İçin Bizimle Çalışmak İster misiniz?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              İhtiyaçlarınıza özel çözümler için hemen iletişime geçin.
            </p>
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-lg">
              Teklif Alın
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
 