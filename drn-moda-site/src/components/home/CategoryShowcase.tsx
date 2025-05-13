'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProductCategoriesWithImages } from '@/lib/api/strapi';
import { ProductCategoryWithImage } from '@/types/products';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CategoryShowcase: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategoryWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProductCategoriesWithImages();
        
        console.log('Fetched categories:', JSON.stringify(data, null, 2));
        
        // Take only the first 4 categories
        const limitedCategories = data.slice(0, 4);
        
        if (limitedCategories.length === 0) {
          setError('Kategori bulunamadı');
        }
        
        setCategories(limitedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Kategoriler yüklenirken bir hata oluştu');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Helper function to get image URL
  const getImageUrl = (category: ProductCategoryWithImage) => {
    try {
      console.log('Getting image URL for category:', category.id);
      
      // Check if using direct image object
      if (category.attributes?.image) {
        console.log('Using image object from attributes');
        
        // First try direct URL
        if (category.attributes.image.url) {
          const url = category.attributes.image.url;
          console.log('Found direct URL:', url);
          return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
        }
        
        // Then try data.attributes.url path
        if (category.attributes.image.data?.attributes?.url) {
          const url = category.attributes.image.data.attributes.url;
          console.log('Found URL in data.attributes.url:', url);
          return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
        }
      }
      
      console.log('No image URL found in expected paths');
    } catch (error) {
      console.error('Error getting image URL:', error);
    }
    
    console.log('Using placeholder image for category:', category.id);
    return '/images/placeholder.jpg';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Hata: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ürün Kategorilerimiz</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kalite ve stil bir arada. İhtiyacınıza uygun ürün kategorilerimize göz atın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeIn}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={getImageUrl(category)}
                  alt={category.attributes.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.attributes.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.attributes.description || 'Kaliteli ürünler'}
                </p>
                <Link
                  href="/urunlerimiz"
                  className="inline-flex items-center text-[#af8107] hover:text-[#8f6a06] transition-colors"
                >
                  <span>Daha Fazla</span>
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Button */}
        {categories.length === 4 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mt-8"
          >
            <Link 
              href="/urunlerimiz"
              className="px-6 py-3 bg-[#af8107] text-white rounded-full hover:bg-[#8f6a06] transition-colors inline-flex items-center space-x-2"
            >
              <span>Daha Fazla Kategoriler</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase; 