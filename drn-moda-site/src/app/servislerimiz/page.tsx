'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaTag, FaTimes, FaImages } from 'react-icons/fa';
import { getServices, getServiceCategories } from '@/lib/api/strapi';
import { Service, ServiceCategory } from '@/types/services';
import { markdownToHtml } from '@/lib/utils/markdown';

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

// Modal animation variants
const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalContent = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } }
};

export default function ServislerimizPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Sabit kategori ve servis verilerimiz
  const mockCategories: ServiceCategory[] = [
    {
      id: 1,
      attributes: {
        name: "Moda & Tasarım",
        slug: "moda-tasarim",
        description: "Moda trendlerini takip eden ve yenilikçi tasarım hizmetlerimiz",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    {
      id: 3,
      attributes: {
        name: "Üretim & Sevkiyat",
        slug: "uretim-sevkiyat",
        description: "Modern üretim tesislerimiz ve deneyimli ekibimizle hizmet",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  ];

  const mockServices: Service[] = [
    {
      id: 1,
      attributes: {
        title: "Koleksiyon Tasarımı",
        slug: "koleksiyon-tasarimi",
        description: "Sezonun trendlerine uygun, markanızı yansıtan özgün koleksiyonlar tasarlıyoruz.",
        content: "<p>Koleksiyon tasarım hizmetimiz ile markanızın kimliğini yansıtan özgün tasarımlar sunuyoruz.</p>",
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
        content: "<p>Üretim planlama ve takip hizmetimiz ile siparişlerinizin her aşamasını kontrol ederiz.</p>",
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
        // Strapi'den veri çekmeyi deneyin
        const servicesData = await getServices();
        const categoriesData = await getServiceCategories();
        
        // Eğer API'den veri geldiyse kullan, yoksa sabit verileri kullan
        const finalServices = servicesData && servicesData.length > 0 ? servicesData : mockServices;
        const finalCategories = categoriesData && categoriesData.length > 0 ? categoriesData : mockCategories;
        
        setServices(finalServices);
        setCategories(finalCategories);
        
        // İlk kategoriyi aktif yap
        if (finalCategories && finalCategories.length > 0 && finalCategories[0].attributes && finalCategories[0].attributes.slug) {
          setActiveCategory(finalCategories[0].attributes.slug);
        } else {
          console.warn('Kategori verisi beklenen formatta değil veya boş');
          setActiveCategory(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // Hata durumunda sabit verileri kullan
        setServices(mockServices);
        setCategories(mockCategories);
        
        if (mockCategories.length > 0) {
          setActiveCategory(mockCategories[0].attributes.slug);
        }
        
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter services by active category and ensure proper data structure
  const filteredServices = activeCategory
    ? services.filter(
        service => service.attributes?.category?.data?.attributes?.slug === activeCategory
      )
    : services;

  // Function to get Strapi image URL with safety check
  const getImageUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg'; // Placeholder for missing images
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
  };

  // Handle opening the product modal
  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    if (service.attributes?.featuredImage?.data) {
      setSelectedImage(service.attributes.featuredImage.data.attributes.url);
    }
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the service modal
  const closeServiceModal = () => {
    setSelectedService(null);
    setSelectedImage(null);
    setShowGallery(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Handle image selection in the gallery
  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  // Toggle full gallery view
  const toggleGallery = () => {
    setShowGallery(!showGallery);
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

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedService) {
        closeServiceModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      // Reset body overflow in case component unmounts with modal open
      document.body.style.overflow = 'auto';
    };
  }, [selectedService]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af8107]"></div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Servislerimiz</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              DRN Moda Tekstil olarak müşterilerimize sunduğumuz yüksek kaliteli hizmetler ile tekstil endüstrisinde fark yaratıyoruz.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Category Tabs */}
      <section className="py-6 px-4 md:px-8 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  if (category && category.attributes && category.attributes.slug) {
                    setActiveCategory(category.attributes.slug);
                  } else {
                    console.warn('Bu kategoride geçerli bir slug yok', category);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === (category.attributes?.slug || '')
                    ? 'bg-[#af8107] text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.attributes?.name || 'İsimsiz Kategori'}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Description */}
      {activeCategory && categories.find(cat => cat.attributes?.slug === activeCategory) && (
        <section className="py-8 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {categories.find(cat => cat.attributes?.slug === activeCategory)?.attributes?.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {categories.find(cat => cat.attributes?.slug === activeCategory)?.attributes?.description}
              </p>
              <div className="h-1 w-20 bg-[#af8107] mx-auto mt-6"></div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Service Cards Grid */}
      <section className="py-8 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {filteredServices.length > 0 ? (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={fadeIn}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-300"
                  onClick={() => openServiceModal(service)}
                >
                  <div className="relative aspect-square">
                    {service.attributes?.featuredImage?.data ? (
                      <Image 
                        src={getImageUrl(service.attributes.featuredImage.data.attributes.url)} 
                        alt={service.attributes.title || 'Service'} 
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200">
                        <p className="text-gray-400">Görsel Bulunamadı</p>
                      </div>
                    )}
                    {/* Title overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold text-white">{service.attributes?.title || 'İsimsiz Servis'}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-600 text-lg">Bu kategoride henüz ürün bulunmamaktadır.</p>
                <p className="text-gray-500 mt-2">Lütfen başka bir kategori seçin veya yakında tekrar ziyaret edin.</p>
              </motion.div>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#8f6a06] to-[#af8107]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ürünlerimiz Hakkında Detaylı Bilgi Almak İster misiniz?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              İhtiyaçlarınıza uygun çözümler için bizimle iletişime geçin.
              Uzman ekibimiz size özel ürün önerileri sunacaktır.
            </p>
            <Link href="/iletisim">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-[#af8107] font-bold rounded-full transition-colors text-lg shadow-xl"
              >
                Sipariş Vermek İstiyorum
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalBackdrop}
            onClick={closeServiceModal}
          >
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors text-gray-800"
                onClick={closeServiceModal}
              >
                <FaTimes size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left side - Image area */}
                <div className="bg-gray-100">
                  <div className="relative h-80 md:h-full">
                    {selectedImage && (
                      <Image 
                        src={getImageUrl(selectedImage)} 
                        alt={selectedService.attributes?.title || ''} 
                        fill
                        className="object-cover"
                      />
                    )}
                    
                    {/* Gallery thumbnail toggle */}
                    {selectedService.attributes?.gallery?.data && selectedService.attributes.gallery.data.length > 0 && (
                      <button 
                        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md"
                        onClick={toggleGallery}
                      >
                        <FaImages className="text-[#af8107]" />
                      </button>
                    )}
                  </div>
                  
                  {/* Gallery thumbnails */}
                  {showGallery && selectedService.attributes?.gallery?.data && (
                    <div className="bg-gray-800 p-3 flex space-x-2 overflow-x-auto">
                      {/* Featured image */}
                      {selectedService.attributes.featuredImage?.data && (
                        <div 
                          className={`relative h-16 w-16 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${
                            selectedService.attributes.featuredImage.data.attributes.url === selectedImage 
                              ? 'border-[#af8107]' 
                              : 'border-transparent'
                          }`}
                          onClick={() => handleImageClick(selectedService.attributes.featuredImage.data.attributes.url)}
                        >
                          <Image 
                            src={getImageUrl(selectedService.attributes.featuredImage.data.attributes.url)} 
                            alt={selectedService.attributes?.title || ''} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Gallery images */}
                      {selectedService.attributes.gallery.data.map((image) => (
                        <div 
                          key={image.id}
                          className={`relative h-16 w-16 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${
                            image.attributes.url === selectedImage ? 'border-[#af8107]' : 'border-transparent'
                          }`}
                          onClick={() => handleImageClick(image.attributes.url)}
                        >
                          <Image 
                            src={getImageUrl(image.attributes.url)} 
                            alt={`${selectedService.attributes?.title} ${image.id}`} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right side - Content area */}
                <div className="p-6 md:p-8 flex flex-col h-full">
                  {/* Category badge */}
                  {selectedService.attributes?.category?.data?.attributes?.name && (
                    <span className="inline-block bg-[#af8107]/10 text-[#af8107] px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {selectedService.attributes.category.data.attributes.name}
                    </span>
                  )}
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {selectedService.attributes?.title || 'İsimsiz Servis'}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {selectedService.attributes?.description || 'Açıklama bulunamadı'}
                  </p>
                  
                  {/* Publish date if available */}
                  {selectedService.attributes?.publishedAt && (
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(selectedService.attributes.publishedAt)}
                    </p>
                  )}
                  
                  {/* Content */}
                  <div className="prose prose-sm md:prose max-w-none flex-grow overflow-y-auto mt-4">
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(selectedService.attributes?.content) }}></div>
                  </div>
                  
                  {/* Action button */}
                  <div className="mt-6 flex justify-between items-center">
                    <Link 
                      href={`/servislerimiz/${selectedService.attributes?.slug || selectedService.id}`}
                      className="inline-flex items-center text-[#af8107] font-medium hover:underline"
                    >
                      Ürün Detayları <FaArrowRight className="ml-2" />
                    </Link>
                    
                    <Link href="/iletisim">
                      <button className="bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Sipariş Vermek İstiyorum
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 