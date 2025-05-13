'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getProductCategoriesWithImages, getProductsByCategory, getProductDetailsEnhanced } from '@/lib/api/strapi';
import { ProductCategoryWithImage, ProductWithImage, ProductDetail } from '@/types/products';

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

// Fallback categories if API fails
const fallbackCategories: ProductCategoryWithImage[] = [
  {
    id: 1,
    attributes: {
      name: 'Fitness & Spor',
      slug: 'fitness-spor',
      description: 'Yüksek performanslı fitness ve spor giyim koleksiyonu',
      image: {
        data: {
          id: 1,
          attributes: {
            url: '/images/placeholder.jpg',
            width: 800,
            height: 600,
            alternativeText: 'Fitness & Spor'
          }
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    id: 2,
    attributes: {
      name: 'Günlük Giyim',
      slug: 'gunluk-giyim',
      description: 'Rahat ve şık günlük giyim ürünleri',
      image: {
        data: {
          id: 2,
          attributes: {
            url: '/images/placeholder.jpg',
            width: 800,
            height: 600,
            alternativeText: 'Günlük Giyim'
          }
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
];

// Fallback products
const fallbackProducts: ProductWithImage[] = [
  {
    id: 1,
    attributes: {
      title: 'Spor T-shirt',
      description: 'Hafif ve nefes alabilen spor t-shirt',
      price: 249.99,
      image: {
        data: {
          id: 1,
          attributes: {
            url: '/images/placeholder.jpg',
            width: 800,
            height: 600,
            alternativeText: 'Spor T-shirt'
          }
        }
      },
      category: {
        data: {
          id: 1,
          attributes: {
            name: 'Fitness & Spor',
            slug: 'fitness-spor',
            description: 'Yüksek performanslı fitness ve spor giyim koleksiyonu',
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

export default function UrunlerimizPage() {
  const [categories, setCategories] = useState<ProductCategoryWithImage[]>([]);
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getProductCategoriesWithImages();
        
        if (data && data.length > 0) {
          setCategories(data);
          // Set the first category as selected by default
          const firstCategoryId = data[0].id;
          setSelectedCategory(firstCategoryId);
          
          // Fetch products for first category
          fetchProductsForCategory(firstCategoryId);
        } else {
          console.warn("No categories found");
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching product categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Fetch products for selected category
  const fetchProductsForCategory = async (categoryId: number) => {
    if (categoryId === null) return;
    
    try {
      setProductLoading(true);
      console.log(`Fetching products for category ID ${categoryId}`);
      
      const data = await getProductsByCategory(categoryId);
      console.log(`Products loaded, total: ${data.length}`);
      
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        console.warn(`No products found for category`);
        setProducts([]);
      }
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      setProducts([]);
    } finally {
      setProductLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchProductsForCategory(categoryId);
  };

  // Get image URL helper
  const getImageUrl = (image: any) => {
    console.log('Getting image URL for product, input:', JSON.stringify(image, null, 2));
    
    if (!image || image.data === null) {
      console.log('No image data, returning placeholder');
      return '/images/placeholder.jpg';
    }
    
    if (image?.data?.attributes?.url) {
      const url = image.data.attributes.url;
      console.log('Found image URL:', url);
      
      const fullUrl = url.startsWith('http') 
        ? url 
        : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
      
      console.log('Full image URL:', fullUrl);
      return fullUrl;
    }
    
    console.log('No URL found in image data, returning placeholder');
    return '/images/placeholder.jpg';
  };

  // Handle product selection
  const handleProductSelect = async (productId: number) => {
    try {
      const data = await getProductDetailsEnhanced(productId);
      
      if (data) {
        // Ensure imageUrl is properly formatted
        if (!data.imageUrl || typeof data.imageUrl !== 'string') {
          data.imageUrl = '/images/placeholder.jpg';
        }
        
        // Ensure gallery exists
        data.gallery = data.gallery || [];
        
        setSelectedProduct(data);
      }
    } catch (error) {
      console.error(`Error fetching product details:`, error);
    }
  };

  // Close product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Format price with Turkish Lira symbol
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('tr-TR')} ₺`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#af8107]"></div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="text-[#af8107]">Ürünlerimiz</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              DRN Moda Tekstil ürün kataloğumuza göz atın ve ihtiyacınıza uygun tekstil çözümlerini keşfedin.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Category Tabs - Horizontal Chips with modern design */}
      <section className="py-6 bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#af8107] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.attributes.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 md:px-8">
          {productLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-200 aspect-[4/3] rounded-t-xl"></div>
                  <div className="p-5">
                    <div className="bg-gray-200 h-6 w-3/4 rounded mb-3"></div>
                    <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-2/3 rounded mb-4"></div>
                    <div className="bg-gray-200 h-10 w-1/2 rounded mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                  onClick={() => handleProductSelect(product.id)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={getImageUrl(product.attributes.image)}
                      alt={product.attributes.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.attributes.price && (
                      <div className="absolute top-4 right-4 bg-[#af8107]/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(product.attributes.price)}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#af8107] transition-colors">
                      {product.attributes.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {product.attributes.description}
                    </p>
                    <div className="mt-auto">
                      <button
                        className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-[#af8107] hover:text-white transition-colors flex items-center group-hover:bg-[#af8107] group-hover:text-white"
                      >
                        <span>Detay</span>
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Bu kategoride henüz ürün bulunmamaktadır.</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Lütfen başka bir kategori seçin veya yakında tekrar ziyaret edin.
              </p>
            </div>
          )}
        </div>
      </motion.section>
      
      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalBackdrop}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm"
            onClick={closeProductModal}
          >
            <motion.div
              variants={modalContent}
              className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10 backdrop-blur-sm bg-white/90">
                <h3 className="text-xl font-bold text-gray-800">{selectedProduct.title}</h3>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  onClick={closeProductModal}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="aspect-square relative rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={
                      selectedProduct.imageUrl.startsWith('http') 
                        ? selectedProduct.imageUrl 
                        : selectedProduct.imageUrl.startsWith('/')
                          ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${selectedProduct.imageUrl}`
                          : '/images/placeholder.jpg'
                    }
                    alt={selectedProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.price > 0 && (
                      <div className="text-2xl font-bold text-[#af8107] mt-2">
                        {formatPrice(selectedProduct.price)}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Ürün Açıklaması</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  
                  {selectedProduct.content && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Detaylı Bilgi</h4>
                      <div 
                        className="text-gray-600 prose prose-sm max-w-none" 
                        dangerouslySetInnerHTML={{ __html: selectedProduct.content }}
                      />
                    </div>
                  )}
                  
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Özellikler</h4>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-[#af8107] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Ürün Galerisi</h4>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {selectedProduct.gallery.map((imageUrl, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-[#af8107] transition-colors">
                            <Image
                              src={
                                imageUrl.startsWith('http') 
                                  ? imageUrl 
                                  : imageUrl.startsWith('/')
                                    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`
                                    : '/images/placeholder.jpg'
                              }
                              alt={`${selectedProduct.title} - ${index + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 pt-0 flex justify-end border-t">
                <button
                  className="px-6 py-3 bg-[#af8107] text-white rounded-lg hover:bg-[#8f6a06] transition-colors"
                  onClick={closeProductModal}
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 