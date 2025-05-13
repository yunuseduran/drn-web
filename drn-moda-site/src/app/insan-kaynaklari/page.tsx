'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUsers, FaGraduationCap, FaHandshake, FaUserTie, FaBriefcase, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { getJobs } from '@/lib/api/strapi';
import { Job } from '@/types/jobs';

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

// İş detay modalı
const JobModal = ({ job, isOpen, onClose }: { job: Job | null, isOpen: boolean, onClose: () => void }) => {
  const router = useRouter();
  
  if (!isOpen || !job) return null;
  
  const handleApply = () => {
    router.push(`/kariyer?position=${encodeURIComponent(job.attributes.Pozisyon || job.attributes.title || 'Pozisyon')}`);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="relative p-0">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#222] via-[#444] to-[#af8107] p-8 rounded-t-xl">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {job.attributes.Pozisyon || job.attributes.title || 'Pozisyon'}
            </h2>
            
            <div className="flex flex-wrap gap-3 mt-4">
              {(job.attributes.Konum || job.attributes.location) && (
                <div className="flex items-center bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{job.attributes.Konum || job.attributes.location}</span>
                </div>
              )}
              {(job.attributes.JobsType || job.attributes.department) && (
                <div className="flex items-center bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FaBuilding className="mr-2" />
                  <span>{job.attributes.JobsType || job.attributes.department}</span>
                </div>
              )}
              {job.attributes.PozisyonSekli && (
                <div className="flex items-center bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FaBriefcase className="mr-2" />
                  <span>{job.attributes.PozisyonSekli}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Content body */}
          <div className="p-8">
            {/* Açıklama */}
            {job.attributes.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-l-4 border-[#af8107] pl-3">
                  Genel Açıklama
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {job.attributes.description}
                </p>
              </div>
            )}
            
            {/* Detaylı içerik */}
            {job.attributes.content && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-l-4 border-[#af8107] pl-3">
                  Detaylı Bilgi
                </h3>
                <div 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed prose prose-headings:text-gray-800 dark:prose-headings:text-gray-200 prose-a:text-[#af8107] max-w-none" 
                  dangerouslySetInnerHTML={{ __html: job.attributes.content }} 
                />
              </div>
            )}
            
            {/* Başvuru butonu */}
            <div className="mt-10 flex justify-end">
              <button 
                onClick={handleApply}
                className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
              >
                Başvuru Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InsanKaynaklariPage() {
  const [activeTab, setActiveTab] = useState('kariyer');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        console.log('Alınan pozisyonlar:', jobsData);
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('İş pozisyonları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    // Scroll'u devre dışı bırak
    document.body.style.overflow = 'hidden';
  };
  
  const closeJobModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    // Scroll'u tekrar aktif et
    document.body.style.overflow = 'auto';
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
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#af8107]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              ) : jobs.length > 0 ? (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#af8107]/30 transform hover:-translate-y-1"
                      onClick={() => openJobModal(job)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-800">
                          {job.attributes.Pozisyon || job.attributes.title || "Pozisyon"}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          {(job.attributes.JobsType || job.attributes.department) && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                              <FaBuilding className="mr-1" /> {job.attributes.JobsType || job.attributes.department}
                            </span>
                          )}
                          {(job.attributes.Konum || job.attributes.location) && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                              <FaMapMarkerAlt className="mr-1" /> {job.attributes.Konum || job.attributes.location}
                            </span>
                          )}
                          {job.attributes.PozisyonSekli && (
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                              <FaBriefcase className="mr-1" /> {job.attributes.PozisyonSekli}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.attributes.description || "Bu pozisyon için detaylı açıklama bulunmamaktadır."}
                      </p>
                      <div className="text-[#af8107] font-medium flex items-center">
                        Detaylar için tıklayın 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 text-gray-600 p-8 rounded-lg text-center">
                  <FaBriefcase className="mx-auto text-gray-300 text-5xl mb-4" />
                  <p className="text-lg">Şu anda açık pozisyon bulunmamaktadır.</p>
                  <p className="mt-2">Lütfen daha sonra tekrar kontrol ediniz.</p>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'staj' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Staj Programımız</h3>
              <div className="bg-gray-50 rounded-lg p-8 shadow-md">
                <p className="text-gray-600 mb-4">
                  DRN Moda Tekstil olarak, geleceğin profesyonellerine kapılarımızı açıyor ve onlara değerli iş deneyimi kazandırma fırsatı sunuyoruz. Staj programımız, tekstil sektöründe kariyer yapmak isteyen öğrencilere pratik beceriler ve sektör bilgisi kazandırmayı hedefliyor.
                </p>
                <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Staj Programımızın Avantajları</h4>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Gerçek projelerde çalışma fırsatı</li>
                  <li>Sektör profesyonellerinden mentorluk</li>
                  <li>Departmanlar arası rotasyon imkânı</li>
                  <li>Networking ve kariyer gelişimi</li>
                  <li>Başarılı stajyerlere iş imkânı</li>
                </ul>
                <p className="text-gray-600 mt-6">
                  Staj başvuruları yılın belirli dönemlerinde açılmaktadır. Güncel staj ilanlarımız için bizi takip etmeye devam edin.
                </p>
                <div className="mt-8">
                  <Link href="/iletisim">
                    <button className="px-5 py-2 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors">
                      Daha Fazla Bilgi
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'gelisim' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Eğitim ve Gelişim Fırsatları</h3>
              <div className="bg-gray-50 rounded-lg p-8 shadow-md">
                <p className="text-gray-600 mb-6">
                  DRN Moda Tekstil olarak çalışanlarımızın sürekli gelişimini destekliyor, onların potansiyellerini en üst düzeyde kullanabilmeleri için çeşitli eğitim ve gelişim programları sunuyoruz.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Mesleki Eğitimler</h4>
                    <p className="text-gray-600">
                      Pozisyona özel teknik bilgi ve becerileri geliştirmeye yönelik eğitimler sunuyoruz.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Kişisel Gelişim</h4>
                    <p className="text-gray-600">
                      Liderlik, iletişim ve problem çözme gibi alanlarda kişisel gelişim eğitimleri düzenliyoruz.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Yabancı Dil Desteği</h4>
                    <p className="text-gray-600">
                      Global pazarda rekabet edebilmek için çalışanlarımıza yabancı dil eğitim desteği sağlıyoruz.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Mentorluk Programları</h4>
                    <p className="text-gray-600">
                      Deneyimli çalışanlarımızın bilgi ve tecrübelerini aktarabileceği mentorluk programları düzenliyoruz.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600">
                  Eğitim ve gelişim programlarımız hakkında daha fazla bilgi almak için İnsan Kaynakları departmanımızla iletişime geçebilirsiniz.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Job Modal */}
      <JobModal 
        job={selectedJob} 
        isOpen={isModalOpen} 
        onClose={closeJobModal} 
      />
    </main>
  );
} 
 