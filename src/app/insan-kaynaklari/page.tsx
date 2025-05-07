'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUsers, FaGraduationCap, FaHandshake, FaUserTie, FaBriefcase } from 'react-icons/fa';

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

export default function InsanKaynaklariPage() {
  const [activeTab, setActiveTab] = useState('kariyer');
  
  const jobListings = [
    {
      title: "Tekstil Tasarımcısı",
      department: "Tasarım",
      location: "İstanbul",
      type: "Tam Zamanlı",
      description: "Moda trendlerini takip eden, yaratıcı ve yenilikçi tasarımlar geliştirebilecek, koleksiyon oluşturma süreçlerine hakim tasarımcılar arıyoruz."
    },
    {
      title: "Üretim Planlama Uzmanı",
      department: "Üretim",
      location: "İzmir",
      type: "Tam Zamanlı",
      description: "Üretim süreçlerini planlayan, takip eden ve optimize eden, verimlilik odaklı çalışacak uzmanlar arıyoruz."
    },
    {
      title: "Kalite Kontrol Sorumlusu",
      department: "Kalite",
      location: "Bursa",
      type: "Tam Zamanlı",
      description: "Tekstil ürünlerinin kalite standartlarına uygunluğunu denetleyecek, sorun tespiti ve çözümü konusunda deneyimli sorumlular arıyoruz."
    },
    {
      title: "İhracat Uzmanı",
      department: "Dış Ticaret",
      location: "İstanbul",
      type: "Tam Zamanlı",
      description: "Uluslararası satış ve pazarlama faaliyetlerini yürütecek, ihracat süreçlerine hakim, en az bir yabancı dil bilen uzmanlar arıyoruz."
    }
  ];

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/insan-kaynaklari.jpg" 
            alt="DRN Moda Tekstil İnsan Kaynakları" 
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">İnsan Kaynakları</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Kariyerinizde yeni bir sayfa açın. DRN Moda Tekstil ailesine katılın.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Why Work With Us Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Neden DRN Moda Tekstil?</h2>
          <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tekstil sektöründe lider konumumuzla, çalışanlarımıza sunduğumuz benzersiz fırsatlar ve çalışma ortamımız.
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
              icon: <FaGraduationCap className="text-[#af8107] text-4xl" />,
              title: "Sürekli Gelişim",
              description: "Çalışanlarımızın kişisel ve profesyonel gelişimini destekliyor, eğitim ve kariyer fırsatları sunuyoruz."
            },
            {
              icon: <FaHandshake className="text-[#af8107] text-4xl" />,
              title: "İş-Yaşam Dengesi",
              description: "Esnek çalışma saatleri ve sosyal aktivitelerle çalışanlarımızın iş-yaşam dengesini gözetiyoruz."
            },
            {
              icon: <FaUserTie className="text-[#af8107] text-4xl" />,
              title: "Kariyer Fırsatları",
              description: "Performansa dayalı terfi sistemimiz ile çalışanlarımızın kariyer yolculuğunu destekliyoruz."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('kariyer')}
              className={`px-5 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'kariyer'
                  ? 'bg-[#af8107] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Açık Pozisyonlar
            </button>
            <button
              onClick={() => setActiveTab('staj')}
              className={`px-5 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'staj'
                  ? 'bg-[#af8107] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Staj Programı
            </button>
            <button
              onClick={() => setActiveTab('gelisim')}
              className={`px-5 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeTab === 'gelisim'
                  ? 'bg-[#af8107] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Eğitim ve Gelişim
            </button>
          </div>
          
          {activeTab === 'kariyer' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Açık Pozisyonlar</h3>
              
              <div className="space-y-6">
                {jobListings.map((job, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-800">{job.title}</h4>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {job.location}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <Link href="/iletisim">
                      <button className="px-4 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors">
                        Başvur
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Listede ilgilendiğiniz bir pozisyon bulamadınız mı? Özgeçmişinizi gönderin, size uygun pozisyonlar açıldığında sizi bilgilendirelim.
                </p>
                <Link href="/iletisim">
                  <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">
                    Özgeçmiş Gönder
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'staj' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Staj Programımız</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col h-full">
                  <p className="text-gray-600 mb-6">
                    DRN Moda Tekstil olarak, tekstil sektöründe kariyer yapmak isteyen öğrencilere kapsamlı staj programları sunuyoruz. Programlarımız, öğrencilerin teorik bilgilerini pratik deneyimle birleştirmelerine olanak tanıyor.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Stajyerlerimiz, tasarımdan üretime, kalite kontrolden pazarlamaya kadar şirketimizin farklı departmanlarında deneyim kazanma şansına sahip oluyorlar. Mentorluk programımız ile stajyerlerimize profesyonel gelişimlerinde rehberlik ediyor ve sektörde başarılı olmaları için gereken becerileri kazandırıyoruz.
                  </p>
                  <div className="mt-auto">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Staj Departmanlarımız:</h4>
                    <ul className="list-disc pl-5 text-gray-600 mb-6">
                      <li>Tasarım ve Ürün Geliştirme</li>
                      <li>Üretim ve Planlama</li>
                      <li>Kalite Kontrol</li>
                      <li>Satış ve Pazarlama</li>
                      <li>İhracat ve Dış Ticaret</li>
                      <li>İnsan Kaynakları</li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/staj-programi.jpg" 
                    alt="DRN Moda Tekstil Staj Programı" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link href="/iletisim">
                  <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors">
                    Staj Başvurusu Yap
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'gelisim' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Eğitim ve Gelişim Programlarımız</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <FaGraduationCap className="text-[#af8107] text-3xl mr-4" />
                    <h4 className="text-xl font-bold text-gray-800">Mesleki Eğitimler</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Tekstil sektöründeki en son yenilikleri ve teknolojileri takip etmek için çalışanlarımıza düzenli olarak mesleki eğitimler sunuyoruz.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Tasarım yazılımları eğitimleri</li>
                    <li>Teknik tekstil seminerleri</li>
                    <li>Kalite standartları eğitimleri</li>
                    <li>Üretim teknolojileri kursları</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-[#af8107] text-3xl mr-4" />
                    <h4 className="text-xl font-bold text-gray-800">Kişisel Gelişim</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Çalışanlarımızın sadece teknik değil, kişisel ve profesyonel becerilerini de geliştirmelerini destekliyoruz.
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Liderlik programları</li>
                    <li>İletişim becerileri eğitimleri</li>
                    <li>Yabancı dil kursları</li>
                    <li>Zaman ve stres yönetimi seminerleri</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Mentor Programımız</h4>
                <p className="text-gray-600 mb-6">
                  Deneyimli çalışanlarımızın bilgi ve tecrübelerini aktardığı mentorluk programımız ile yeni katılan çalışanlarımızın kariyer gelişimlerini destekliyoruz. Program kapsamında düzenli toplantılar ve geri bildirim mekanizmaları ile sürekli gelişimi teşvik ediyoruz.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Çalışanlarımızın Deneyimleri</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              DRN Moda Tekstil ailesinin üyelerinden deneyimler ve hikayeler.
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
                name: "Ayşe Kaya",
                position: "Tasarımcı",
                years: "4 yıl",
                image: "/images/employee-1.jpg",
                testimony: "DRN Moda Tekstil'de çalışmak, yaratıcılığımı her gün kullanabildiğim ve sürekli gelişebildiğim bir deneyim. Burada fikirlerim değer görüyor ve tasarımlarımın ürüne dönüştüğünü görmek inanılmaz tatmin edici."
              },
              {
                name: "Mehmet Demir",
                position: "Üretim Müdürü",
                years: "7 yıl",
                image: "/images/employee-2.jpg",
                testimony: "Kariyer gelişimi için ideal bir ortam. Şirkette başladığımdan beri iki kez terfi aldım ve şimdi bir ekibi yönetiyorum. Çalışanların potansiyelini gören ve destekleyen bir yönetim anlayışı var."
              },
              {
                name: "Zeynep Yılmaz",
                position: "İK Uzmanı",
                years: "3 yıl",
                image: "/images/employee-3.jpg",
                testimony: "İş-yaşam dengesi ve çalışan memnuniyetine verilen önem, DRN'yi diğer şirketlerden ayırıyor. Burada sadece bir çalışan değil, ailenin bir parçası olduğunuzu hissediyorsunuz."
              }
            ].map((employee, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={employee.image} 
                      alt={employee.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{employee.name}</h4>
                    <p className="text-gray-600">{employee.position} | {employee.years}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{employee.testimony}"</p>
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
              Kariyerinizde Yeni Bir Adım Atmaya Hazır mısınız?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              DRN Moda Tekstil ailesine katılın, birlikte büyüyelim ve başarılı olalım.
            </p>
            <Link href="/iletisim">
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-lg">
                Hemen Başvur
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 