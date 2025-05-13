'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaImages, FaTag, FaCalendarAlt } from 'react-icons/fa';
import { getServiceBySlug } from '@/lib/api/strapi';
import { Service } from '@/types/services';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Sabit servis verileri
  const mockServices: Service[] = [
    {
      id: 1,
      attributes: {
        title: "Koleksiyon Tasarımı",
        slug: "koleksiyon-tasarimi",
        description: "Sezonun trendlerine uygun, markanızı yansıtan özgün koleksiyonlar tasarlıyoruz.",
        content: `
          <h2>Koleksiyon Tasarım Hizmetimiz</h2>
          <p>DRN Moda Tekstil olarak, markanızın kimliğini ve vizyonunu yansıtan özgün koleksiyonlar tasarlıyoruz. Deneyimli tasarımcılarımız, global moda trendlerini yakından takip ederek, hedef kitlenize hitap eden koleksiyonlar oluşturuyor.</p>
          
          <h3>Hizmet Kapsamımız</h3>
          <ul>
            <li><strong>Trend Analizi:</strong> Sezonun öne çıkan trendlerini araştırıyor ve raporluyoruz</li>
            <li><strong>Konsept Geliştirme:</strong> Markanızın DNA'sına uygun koleksiyon konseptleri oluşturuyoruz</li>
            <li><strong>Tasarım Çizimleri:</strong> Detaylı teknik çizimler ve stil önerileri sunuyoruz</li>
          </ul>
        `,
        featuredImage: {
          data: {
            id: 1,
            attributes: {
              url: "/images/placeholder.jpg",
              width: 800,
              height: 600,
              alternativeText: "Koleksiyon Tasarımı"
            }
          }
        },
        gallery: {
          data: [
            {
              id: 1,
              attributes: {
                url: "/images/placeholder.jpg",
                width: 800,
                height: 600,
                alternativeText: "Koleksiyon Örnek 1"
              }
            },
            {
              id: 2,
              attributes: {
                url: "/images/placeholder.jpg",
                width: 800,
                height: 600,
                alternativeText: "Koleksiyon Örnek 2"
              }
            }
          ]
        },
        category: {
          data: {
            id: 1,
            attributes: {
              name: "Moda & Tasarım",
              slug: "moda-tasarim",
              description: "Moda trendleri",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      }
    },
    {
      id: 2,
      attributes: {
        title: "Üretim Planlama ve Takip",
        slug: "uretim-planlama-ve-takip",
        description: "Modern üretim tesislerimiz ve uzman ekibimizle, siparişlerinizi en verimli şekilde planlar ve üretim sürecini takip ederiz.",
        content: `
          <h2>Üretim Planlama ve Takip Hizmetimiz</h2>
          <p>DRN Moda Tekstil olarak, tekstil üretiminde planlama ve takip süreçlerini en verimli şekilde yönetiyoruz. İleri teknoloji altyapımız ve deneyimli üretim ekibimizle, siparişlerinizi zamanında ve yüksek kalitede teslim ediyoruz.</p>
          
          <h3>Hizmet Kapsamımız</h3>
          <ul>
            <li><strong>Üretim Planlama:</strong> Siparişlerinizi en verimli üretim planları ile programlıyoruz</li>
            <li><strong>Hammadde Tedariki:</strong> Kaliteli hammadde tedarikini zamanında sağlıyoruz</li>
            <li><strong>Üretim Takibi:</strong> Gerçek zamanlı üretim takip sistemi ile süreçleri izliyoruz</li>
          </ul>
        `,
        featuredImage: {
          data: {
            id: 2,
            attributes: {
              url: "/images/placeholder.jpg",
              width: 800,
              height: 600,
              alternativeText: "Üretim Planlama"
            }
          }
        },
        gallery: {
          data: [
            {
              id: 3,
              attributes: {
                url: "/images/placeholder.jpg",
                width: 800,
                height: 600,
                alternativeText: "Üretim Örnek 1"
              }
            },
            {
              id: 4,
              attributes: {
                url: "/images/placeholder.jpg",
                width: 800,
                height: 600,
                alternativeText: "Üretim Örnek 2"
              }
            }
          ]
        },
        category: {
          data: {
            id: 3,
            attributes: {
              name: "Üretim & Sevkiyat",
              slug: "uretim-sevkiyat",
              description: "Üretim süreçleri",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      }
    }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        // Önce Strapi'den veri çekmeyi dene
        const serviceData = await getServiceBySlug(params.slug);
        
        if (serviceData) {
          // Strapi'den veri geldiyse kullan
          setService(serviceData);
          
          if (serviceData?.attributes?.featuredImage?.data) {
            setSelectedImage(serviceData.attributes.featuredImage.data.attributes.url);
          } else {
            console.warn('Featured image is missing for service:', params.slug);
          }
        } else {
          // Strapi'den veri gelmezse mock verilerden bul
          const mockService = mockServices.find(s => s.attributes.slug === params.slug);
          
          if (mockService) {
            setService(mockService);
            
            if (mockService.attributes.featuredImage?.data) {
              setSelectedImage(mockService.attributes.featuredImage.data.attributes.url);
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        
        // Hata durumunda mock verilerden bul
        const mockService = mockServices.find(s => s.attributes.slug === params.slug);
        
        if (mockService) {
          setService(mockService);
          
          if (mockService.attributes.featuredImage?.data) {
            setSelectedImage(mockService.attributes.featuredImage.data.attributes.url);
          }
        }
        
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.slug]);

  // Function to get Strapi image URL
  const getImageUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Handle gallery image click
  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  // Toggle gallery modal
  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af8107]"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Servis Bulunamadı</h2>
        <p className="text-gray-600 mb-6">Aradığınız servis bulunamadı veya kaldırılmış olabilir.</p>
        <Link href="/servislerimiz">
          <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors">
            Tüm Servislere Dön
          </button>
        </Link>
      </div>
    );
  }

  // Veriyi güvenli bir şekilde çıkaralım, eksik olabilecek alanlar için varsayılan değerler belirleyelim
  const title = service.attributes?.title || 'İsimsiz Servis';
  const description = service.attributes?.description || 'Açıklama bulunmuyor';
  const content = service.attributes?.content || '';
  const featuredImage = service.attributes?.featuredImage;
  const gallery = service.attributes?.gallery;
  const category = service.attributes?.category?.data;
  const publishDate = service.attributes?.publishedAt;
  const galleryImages = gallery?.data || [];

  return (
    <main className="bg-gray-50">
      {/* Back Link with Enhanced Style */}
      <div className="sticky top-0 z-20 bg-white py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/servislerimiz" 
            className="inline-flex items-center text-gray-600 hover:text-[#af8107] transition-colors font-medium"
          >
            <FaChevronLeft className="mr-2" /> Tüm Servislere Dön
          </Link>
        </div>
      </div>
      
      {/* Hero Section with Service Title */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-gray-900 to-[#af8107] text-white">
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center md:text-left"
          >
            {category && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                {category.attributes?.name}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">{description}</p>
          </motion.div>
        </div>
      </section>
      
      {/* Service Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-8"
            >
              {/* Featured Image */}
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg mb-8">
                {selectedImage && (
                  <Image 
                    src={getImageUrl(selectedImage)} 
                    alt={title} 
                    fill
                    priority
                    className="object-cover"
                  />
                )}
                
                {galleryImages.length > 0 && (
                  <button 
                    onClick={toggleGallery}
                    className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-full shadow-md hover:bg-opacity-100 transition-opacity"
                    aria-label="Galeriyi Görüntüle"
                  >
                    <FaImages className="text-[#af8107]" />
                  </button>
                )}
              </div>
              
              {/* Gallery Thumbnails */}
              {galleryImages.length > 0 && (
                <div className="flex overflow-x-auto space-x-3 pb-4 mb-8">
                  {/* Featured image thumbnail */}
                  {featuredImage?.data && (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                        selectedImage === featuredImage.data.attributes.url 
                          ? 'ring-2 ring-[#af8107]' 
                          : ''
                      }`}
                      onClick={() => handleImageClick(featuredImage.data.attributes.url)}
                    >
                      <Image 
                        src={getImageUrl(featuredImage.data.attributes.url)} 
                        alt={title} 
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  
                  {/* Gallery thumbnails */}
                  {galleryImages.map((image) => (
                    <motion.div 
                      key={image.id}
                      whileHover={{ scale: 1.05 }}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                        selectedImage === image.attributes.url 
                          ? 'ring-2 ring-[#af8107]' 
                          : ''
                      }`}
                      onClick={() => handleImageClick(image.attributes.url)}
                    >
                      <Image 
                        src={getImageUrl(image.attributes.url)} 
                        alt={`${title} ${image.id}`} 
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Content */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-gray-800 prose-strong:font-semibold">
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </article>
              </div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-4"
            >
              {/* Service Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Servis Bilgileri</h3>
                
                {/* Category */}
                {category && (
                  <div className="flex items-start py-3 border-b border-gray-100">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <FaTag className="text-[#af8107]" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Kategori</span>
                      <span className="font-medium text-gray-800">{category.attributes?.name}</span>
                    </div>
                  </div>
                )}
                
                {/* Publish Date */}
                {publishDate && (
                  <div className="flex items-start py-3 border-b border-gray-100">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <FaCalendarAlt className="text-[#af8107]" />
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Tarih</span>
                      <span className="font-medium text-gray-800">{formatDate(publishDate)}</span>
                    </div>
                  </div>
                )}
                
                {/* CTA Button */}
                <Link href="/iletisim">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Bu Hizmet Hakkında Bilgi Alın
                  </motion.button>
                </Link>
              </div>
              
              {/* Related Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#af8107] mr-2"></div>
                    20+ yıl tekstil deneyimi
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#af8107] mr-2"></div>
                    Uzman ve deneyimli kadro
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#af8107] mr-2"></div>
                    Modern üretim tesisleri
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#af8107] mr-2"></div>
                    Müşteri memnuniyeti odaklı çalışma
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#af8107] mr-2"></div>
                    Yenilikçi ve kaliteli ürünler
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#8f6a06] to-[#af8107]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bu Hizmetle İlgili Detaylı Bilgi Almak İster misiniz?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              İhtiyaçlarınıza uygun çözümler için bizimle iletişime geçin.
              Uzman ekibimiz size özel çözümler sunacaktır.
            </p>
            <Link href="/iletisim">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-xl"
              >
                İletişime Geçin
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={toggleGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              aria-label="Galeriyi Kapat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[80vh]"
            >
              {selectedImage && (
                <Image 
                  src={getImageUrl(selectedImage)} 
                  alt={title} 
                  fill
                  className="object-contain"
                />
              )}
            </motion.div>
            
            <div className="flex justify-center mt-4 overflow-x-auto space-x-3 pb-2">
              {/* Featured image thumbnail */}
              {featuredImage?.data && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === featuredImage.data.attributes.url 
                      ? 'ring-2 ring-white' 
                      : ''
                  }`}
                  onClick={() => handleImageClick(featuredImage.data.attributes.url)}
                >
                  <Image 
                    src={getImageUrl(featuredImage.data.attributes.url)} 
                    alt={title} 
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
              
              {/* Gallery thumbnails */}
              {galleryImages.map((image) => (
                <motion.div 
                  key={image.id}
                  whileHover={{ scale: 1.1 }}
                  className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === image.attributes.url 
                      ? 'ring-2 ring-white' 
                      : ''
                  }`}
                  onClick={() => handleImageClick(image.attributes.url)}
                >
                  <Image 
                    src={getImageUrl(image.attributes.url)} 
                    alt={`${title} ${image.id}`} 
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 