import axios, { AxiosError } from 'axios';

// Strapi API URL
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Debugging helper
const logApiRequest = (url: string) => {
  console.log(`Making API request to: ${url}`);
};

// Özel rastgele görsel oluşturucu
const getRandomImage = (seed: string | number) => {
  // Var olan yerel görseller dizisi
  const localImages = [
    '/images/basic.jpg',
    '/images/fitness.jpg',
    '/images/gunluk-giyim.jpg',
    '/images/sports.jpg',
    '/images/placeholder.jpg',
  ];
  
  // Sabit bir görsel döndürelim
  const index = typeof seed === 'number' ? seed % localImages.length : String(seed).length % localImages.length;
  return localImages[index || 0];
};

// Transform Strapi response to match expected structure
const transformStrapiResponse = (data: any) => {
  if (!data) return null;
  
  console.log('Raw data to transform:', JSON.stringify(data, null, 2));
  
  // Check if it's a flat structure (from Strapi v4 content API)
  if (data.id !== undefined) {
    // Önce temel nesneyi oluştur
    const transformedData = {
      id: data.id,
      attributes: {
        ...data.attributes,
      }
    };
    
    // Eğer image alanı yoksa ancak tipte bekleniyorsa, boş bir yapı oluştur
    if (!transformedData.attributes.image) {
      transformedData.attributes.image = {
        data: null
      };
    }
    
    console.log('Transformed data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
  }
  
  // Return original data if it already has the expected structure
  return data;
};

// Fetch all services
export async function getServices() {
  const url = `${API_URL}/api/services?populate=*`;
  logApiRequest(url);
  
  try {
    const response = await axios.get(url);
    if (response.data && response.data.data) {
      // Transform each service to match expected structure
      return Array.isArray(response.data.data) 
        ? response.data.data.map(transformStrapiResponse)
        : [];
    }
    console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return [];
  }
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string) {
  const url = `${API_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`;
  logApiRequest(url);
  
  try {
    const response = await axios.get(url);
    if (response.data && response.data.data && response.data.data.length > 0) {
      // Transform the service to match expected structure
      return transformStrapiResponse(response.data.data[0]);
    }
    console.warn(`No service found with slug: ${slug}`);
    return null;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

// Fetch categories for services
export async function getServiceCategories() {
  const url = `${API_URL}/api/service-categories?populate=*`;
  logApiRequest(url);
  
  try {
    const response = await axios.get(url);
    
    // Tam API yanıtını yazdır
    console.log('Service Categories API Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.data) {
      // Transform each category to match expected structure
      return Array.isArray(response.data.data) 
        ? response.data.data.map(transformStrapiResponse)
        : [];
    }
    
    console.warn('Unexpected API response format for categories:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching service categories:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details for categories:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return [];
  }
}

// Fetch all products
export async function getProducts() {
  const url = `${API_URL}/api/products?populate=*`;
  logApiRequest(url);
  
  try {
    const response = await axios.get(url);
    if (response.data && response.data.data) {
      // Transform each product to match expected structure
      return Array.isArray(response.data.data) 
        ? response.data.data.map(transformStrapiResponse)
        : [];
    }
    console.warn('Unexpected API response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return [];
  }
}

// Fetch categories for products (using service categories)
export async function getProductCategories() {
  const url = `${API_URL}/api/service-categories?populate=*`;
  logApiRequest(url);
  
  try {
    const response = await axios.get(url);
    
    console.log('Product Categories API Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.data) {
      // Transform each category to match expected structure
      return Array.isArray(response.data.data) 
        ? response.data.data.map(transformStrapiResponse)
        : [];
    }
    
    console.warn('Unexpected API response format for categories:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details for categories:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return [];
  }
}

// Fetch product categories with images
export async function getProductCategoriesWithImages() {
  // Correct API endpoint: http://localhost:1337/api/product-categories?populate=*
  const url = `${API_URL}/api/product-categories?populate=*`;
  console.log('===== API URL =====', API_URL);
  console.log('===== Making request to =====', url);
  logApiRequest(url);
  
  try {
    console.log('Sending request to Strapi API...');
    const response = await axios.get(url);
    console.log('Response received from Strapi API');
    console.log('Response status:', response.status);
    
    if (response.data && response.data.data) {
      console.log(`Found ${response.data.data.length} categories`);
      
      // Transform data according to Strapi v4 format
      const transformedData = response.data.data.map((item: any) => {
        console.log('Processing category item ID:', item.id);
        
        // Check if image exists directly in the response
        const hasImage = item.image !== null && item.image !== undefined;
        console.log(`Category ${item.id} has direct image:`, hasImage);
        
        return {
          id: item.id,
          attributes: {
            name: item.name || 'Kategori',
            slug: item.slug || '',
            description: item.description || '',
            // Image handling directly from the response structure
            image: {
              data: {
                attributes: {
                  url: item.image?.url || '/images/placeholder.jpg'
                }
              }
            },
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }
        };
      });
      
      console.log('Transformed categories data:', JSON.stringify(transformedData, null, 2));
      return transformedData;
    }
    
    console.warn('Unexpected API response format for product categories:', response.data);
    return [];
  } catch (error) {
    console.error('===== ERROR FETCHING PRODUCT CATEGORIES =====');
    console.error('Error fetching product categories:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details for categories:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          headers: axiosError.config?.headers
        }
      });
    }
    return [];
  }
}

// Fetch products for a specific category
export async function getProductsByCategory(categoryId: number) {
  // Updated to match the schema where products use product_category field
  const url = `${API_URL}/api/products?populate=*&filters[product_category][id][$eq]=${categoryId}`;
  console.log('===== Making request to products API =====', url);
  logApiRequest(url);
  
  try {
    console.log('Sending request to Products API...');
    const response = await axios.get(url);
    console.log('Products Response status:', response.status);
    console.log(`Found ${response.data?.data?.length || 0} products`);
    
    if (response.data && response.data.data) {
      // Transform each product directly based on the actual response structure
      return response.data.data.map((item: any) => {
        console.log('Processing product item:', item.id, item.title || 'Unknown Product');
        
        return {
          id: item.id,
          attributes: {
            title: item.title || 'Ürün',
            description: item.description || '',
            price: item.price || 0,
            // Handle image directly from the response structure
            image: {
              data: {
                attributes: {
                  url: item.image?.url || '/images/placeholder.jpg'
                }
              }
            },
            category: {
              data: {
                id: categoryId,
                attributes: {
                  name: item.product_category?.name || 'Kategori',
                  slug: item.product_category?.slug || 'kategori',
                  description: item.product_category?.description || '',
                }
              }
            },
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt || item.updatedAt
          }
        };
      });
    }
    
    console.warn(`No products found for category ${categoryId}`);
    return [];
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return [];
  }
}

// Fetch product details
export async function getProductDetails(productId: number) {
  // Corrected endpoint based on the Strapi API structure
  const url = `${API_URL}/api/products/${productId}?populate=*`;
  console.log('===== Making request to product details API =====', url);
  logApiRequest(url);
  
  try {
    console.log('Sending request to Product Details API...');
    const response = await axios.get(url);
    console.log('Product Details Response status:', response.status);
    
    if (response.data && response.data.data) {
      // Get the product data directly from the response
      const item = response.data.data;
      console.log('Product Details ID:', item.id);
      
      // Extract features from description
      const description = item.description || '';
      const features = extractFeatures(description);
      
      // Check for image data
      let imageUrl = '/images/placeholder.jpg';
      if (item.image?.url) {
        imageUrl = item.image.url;
        console.log('Found direct image URL:', imageUrl);
      }
      
      // Format the URL if needed
      if (imageUrl && !imageUrl.startsWith('http') && imageUrl.startsWith('/')) {
        imageUrl = `${API_URL}${imageUrl}`;
      }
      
      return {
        id: item.id,
        title: item.title || 'Ürün',
        description: description,
        price: item.price || 0,
        imageUrl: imageUrl,
        category: item.product_category?.name || 'Genel',
        features,
        gallery: [] // Empty gallery as fallback
      };
    }
    
    console.warn(`No product details found for product ${productId}`);
    return null;
  } catch (error) {
    console.error(`Error fetching product details for product ${productId}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return null;
  }
}

// Helper function to extract features from product description
function extractFeatures(description: string): string[] {
  if (!description) return [];
  
  // If description contains bullet points, extract them as features
  if (description.includes('- ')) {
    const lines = description.split('\n').filter(line => line.trim().startsWith('- '));
    return lines.map(line => line.replace('- ', '').trim());
  }
  
  return [];
}

// Fetch product details from product-detail collection
export async function getProductDetailByProductId(productId: number) {
  // Use the product-detail collection API endpoint
  const url = `${API_URL}/api/product-details?populate=*&filters[products][id][$eq]=${productId}`;
  console.log('===== Making request to product-details API =====', url);
  logApiRequest(url);
  
  try {
    console.log('Sending request to Product Detail Collection API...');
    const response = await axios.get(url);
    console.log('Product Detail Collection Response status:', response.status);
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      // Get the first matching detail
      const item = response.data.data[0];
      console.log('Found product detail with ID:', item.id);
      
      // Extract features from description
      const description = item.description || '';
      const features = extractFeatures(description);
      
      // Get image URL
      let imageUrl = '/images/placeholder.jpg';
      if (item.image?.url) {
        imageUrl = item.image.url;
        console.log('Found product detail image URL:', imageUrl);
      }
      
      // Format the URL if needed
      if (imageUrl && !imageUrl.startsWith('http') && imageUrl.startsWith('/')) {
        imageUrl = `${API_URL}${imageUrl}`;
      }
      
      // Handle content field
      let content = '';
      if (item.content) {
        content = item.content;
        console.log('Found content for product detail');
      }
      
      // Get gallery images
      let gallery = [];
      if (item.gallery && Array.isArray(item.gallery)) {
        gallery = item.gallery.map((img: any) => {
          let url = img.url || '';
          if (url && !url.startsWith('http') && url.startsWith('/')) {
            url = `${API_URL}${url}`;
          }
          return url;
        }).filter(Boolean);
        console.log(`Found ${gallery.length} gallery images`);
      }
      
      return {
        id: item.id,
        title: item.title || 'Ürün Detayı',
        description: description,
        content: content,
        price: item.price || 0,
        imageUrl: imageUrl,
        category: item.category?.name || 'Genel',
        features,
        gallery: gallery
      };
    }
    
    console.warn(`No product detail found for product ${productId}`);
    return null;
  } catch (error) {
    console.error(`Error fetching product detail for product ${productId}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        config: axiosError.config
      });
    }
    return null;
  }
}

// Combined function to get product details from either source
export async function getProductDetailsEnhanced(productId: number) {
  // First try to get detailed info from product-detail collection
  const detailInfo = await getProductDetailByProductId(productId);
  if (detailInfo) {
    return detailInfo;
  }
  
  // If not found, fallback to regular product info
  return await getProductDetails(productId);
}

// Tüm haberleri getir
export async function getHaberler() {
  const url = `${API_URL}/api/habers?populate=image`;
  logApiRequest(url);
  
  try {
    console.log('===== Haberler API isteği yapılıyor =====', url);
    const response = await axios.get(url);
    
    // API yanıtı başarılı mı kontrol et
    if (!response || !response.data) {
      console.error('API yanıtı boş veya geçersiz');
      return [];
    }
    
    console.log('API yanıtı alındı:', JSON.stringify(response.data, null, 2));
    
    // Veri dizisini kontrol et
    const rawData = response.data.data || [];
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn('API yanıtında haber verisi bulunamadı veya boş dizi');
      return [];
    }
    
    // API'den gelen her haberi TypeScript yapısına uygun dönüştür
    const haberler = rawData.map(item => {
      // Ham veriyi loglayarak incelemek için
      console.log(`Haber ID: ${item.id}, Başlık: ${item.title || "Başlık yok"}`);
      return {
        id: item.id,
        attributes: {
          title: item.title || "Başlık Yok",
          slug: item.slug || `haber-${item.id}`,
          content: item.content || "",
          description: item.description || "",
          date: item.date || null,
          publishedAt: item.publishedAt || new Date().toISOString(),
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
          image: item.image ? { data: { attributes: item.image } } : { data: null }
        }
      };
    });
    
    console.log(`${haberler.length} haber başarıyla dönüştürüldü:`, 
      haberler.map(h => `${h.id}: ${h.attributes.title}`).join(', '));
    
    return haberler;
    
  } catch (error) {
    console.error('===== HABERLER API HATASI =====');
    console.error('Error fetching haberler:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method
        }
      });
    }
    return []; // Hata durumunda boş dizi dön
  }
}

// Belirli bir haberi ID'ye göre getir
export async function getHaberById(id: number) {
  const url = `${API_URL}/api/habers/${id}?populate=image`;
  logApiRequest(url);
  
  try {
    console.log(`Haber ID=${id} için API isteği yapılıyor:`, url);
    const response = await axios.get(url);
    console.log('Haber detay API yanıt durumu:', response.status);
    
    if (response.data && response.data.data) {
      const haber = transformStrapiResponse(response.data.data);
      console.log('Haber detayı alındı, ID:', haber?.id);
      return haber;
    }
    
    console.warn(`No haber found with id: ${id}`);
    return null;
  } catch (error) {
    console.error(`Error fetching haber with id ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Haber detay Axios hatası:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data
      });
    }
    throw error;
  }
}

// Belirli bir haberi slug'a göre getir
export async function getHaberBySlug(slug: string) {
  const url = `${API_URL}/api/habers?filters[slug][$eq]=${slug}&populate=image`;
  logApiRequest(url);
  
  try {
    console.log(`Haber slug=${slug} için API isteği yapılıyor:`, url);
    const response = await axios.get(url);
    
    if (!response || !response.data) {
      console.error('API yanıtı boş veya geçersiz');
      return null;
    }
    
    console.log('API yanıtı alındı:', JSON.stringify(response.data, null, 2));
    
    // Veri dizisini kontrol et
    const rawData = response.data.data || [];
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn(`Slug "${slug}" için haber bulunamadı`);
      return null;
    }
    
    // İlk eşleşen haberi al
    const item = rawData[0];
    
    // Görsel işleme
    let imageData = null;
    if (item.image && item.image.data) {
      imageData = item.image.data;
    } else if (item.image) {
      imageData = item.image;
    }
    
    // Haberi TypeScript yapısına uygun dönüştür
    const haber = {
      id: item.id,
      attributes: {
        title: item.title || "Başlık Yok",
        slug: item.slug || `haber-${item.id}`,
        content: item.content || "",
        description: item.description || "",
        date: item.date || null,
        publishedAt: item.publishedAt || new Date().toISOString(),
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
        image: imageData ? { data: { attributes: imageData } } : { data: null }
      }
    };
    
    console.log(`Haber detayı başarıyla alındı: ${haber.id}, ${haber.attributes.title}`);
    console.log('Image data:', JSON.stringify(haber.attributes.image, null, 2));
    return haber;
    
  } catch (error) {
    console.error(`Error fetching haber with slug ${slug}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Haber detay hatası:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data
      });
    }
    return null;
  }
}

// Tüm pozisyonları getir
export async function getJobs() {
  const url = `${API_URL}/api/jobs?populate=*`;
  logApiRequest(url);
  
  try {
    console.log('===== İş Pozisyonları API isteği yapılıyor =====', url);
    const response = await axios.get(url);
    
    // API yanıtı başarılı mı kontrol et
    if (!response || !response.data) {
      console.error('API yanıtı boş veya geçersiz');
      return [];
    }
    
    console.log('API yanıtı alındı:', JSON.stringify(response.data, null, 2));
    
    // Veri dizisini kontrol et
    const rawData = response.data.data || [];
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn('API yanıtında pozisyon verisi bulunamadı veya boş dizi');
      return [];
    }
    
    // API'den gelen her pozisyonu TypeScript yapısına uygun dönüştür
    const jobs = rawData.map(item => {
      // Ham veriyi loglayarak incelemek için
      console.log(`Pozisyon ID: ${item.id}, Ham Veri:`, JSON.stringify(item, null, 2));
      
      // Yeni API veri formatını eski Strapi v4 formatına dönüştür
      // Eğer zaten attributes içindeyse dokunma, değilse attributes içine al
      const transformedItem = {
        id: item.id,
        attributes: item.attributes || item // Özellikler attributes içinde değilse, tüm öğeyi attributes'e koy
      };
      
      // Görsel işleme
      let imageData = null;
      
      if (transformedItem.attributes.image && transformedItem.attributes.image.data) {
        imageData = transformedItem.attributes.image.data;
        console.log('Image data bulundu:', imageData);
      }
      
      // Dönüştürülmüş pozisyon nesnesi
      return {
        id: transformedItem.id,
        attributes: {
          // API yanıtından doğrudan alınan alanlar (Doğrudan item kullanıyoruz çünkü dönüşüm yaptık)
          Pozisyon: transformedItem.attributes.Pozisyon || "Pozisyon Adı",
          description: transformedItem.attributes.description || "",
          Konum: transformedItem.attributes.Konum || "Belirtilmemiş",
          PozisyonSekli: transformedItem.attributes.PozisyonSekli || "Tam Zamanlı",
          JobsType: transformedItem.attributes.JobsType || "Genel",
          content: transformedItem.attributes.content || "",
          
          // Geriye uyumluluk için eski alanları da doldur
          title: transformedItem.attributes.Pozisyon || transformedItem.attributes.title || "Pozisyon Adı",
          slug: transformedItem.attributes.slug || `pozisyon-${transformedItem.id}`,
          location: transformedItem.attributes.Konum || transformedItem.attributes.location || "Belirtilmemiş",
          department: transformedItem.attributes.JobsType || transformedItem.attributes.department || "Genel",
          
          // Zaman damgaları
          publishedAt: transformedItem.attributes.publishedAt || new Date().toISOString(),
          createdAt: transformedItem.attributes.createdAt || new Date().toISOString(),
          updatedAt: transformedItem.attributes.updatedAt || new Date().toISOString(),
          
          // Görsel
          image: imageData ? { data: { attributes: imageData.attributes } } : { data: null }
        }
      };
    });
    
    console.log(`${jobs.length} pozisyon başarıyla dönüştürüldü:`, jobs.map(job => 
      `ID: ${job.id}, Başlık: ${job.attributes.Pozisyon}, Konum: ${job.attributes.Konum}, Tür: ${job.attributes.PozisyonSekli}`).join('\n'));
    
    return jobs;
    
  } catch (error) {
    console.error('===== İŞ POZİSYONLARI API HATASI =====');
    console.error('Error fetching jobs:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios Error Details:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method
        }
      });
    }
    return []; // Hata durumunda boş dizi dön
  }
}

// Belirli bir pozisyonu ID'ye göre getir
export async function getJobById(id: number) {
  const url = `${API_URL}/api/jobs/${id}?populate=*`;
  logApiRequest(url);
  
  try {
    console.log(`Pozisyon ID=${id} için API isteği yapılıyor:`, url);
    const response = await axios.get(url);
    console.log('Pozisyon detay API yanıt durumu:', response.status);
    
    if (response.data && response.data.data) {
      const item = response.data.data;
      console.log('Ham pozisyon verisi:', JSON.stringify(item, null, 2));
      
      // Yeni API veri formatını eski Strapi v4 formatına dönüştür
      // Eğer zaten attributes içindeyse dokunma, değilse attributes içine al
      const transformedItem = {
        id: item.id,
        attributes: item.attributes || item // Özellikler attributes içinde değilse, tüm öğeyi attributes'e koy
      };
      
      // Görsel işleme
      let imageData = null;
      if (transformedItem.attributes.image && transformedItem.attributes.image.data) {
        imageData = transformedItem.attributes.image.data;
        console.log('Detay görsel verisi bulundu:', imageData);
      }
      
      const job = {
        id: transformedItem.id,
        attributes: {
          // API yanıtından doğrudan alınan alanlar
          Pozisyon: transformedItem.attributes.Pozisyon || "Pozisyon Adı",
          description: transformedItem.attributes.description || "",
          Konum: transformedItem.attributes.Konum || "Belirtilmemiş",
          PozisyonSekli: transformedItem.attributes.PozisyonSekli || "Tam Zamanlı",
          JobsType: transformedItem.attributes.JobsType || "Genel",
          content: transformedItem.attributes.content || "",
          
          // Geriye uyumluluk için eski alanları da doldur
          title: transformedItem.attributes.Pozisyon || transformedItem.attributes.title || "Pozisyon Adı",
          slug: transformedItem.attributes.slug || `pozisyon-${transformedItem.id}`,
          location: transformedItem.attributes.Konum || transformedItem.attributes.location || "Belirtilmemiş",
          department: transformedItem.attributes.JobsType || transformedItem.attributes.department || "Genel",
          
          // Zaman damgaları
          publishedAt: transformedItem.attributes.publishedAt || new Date().toISOString(),
          createdAt: transformedItem.attributes.createdAt || new Date().toISOString(),
          updatedAt: transformedItem.attributes.updatedAt || new Date().toISOString(),
          
          // Görsel
          image: imageData ? { data: { attributes: imageData.attributes } } : { data: null }
        }
      };
      
      console.log('Dönüştürülmüş pozisyon detayı:', 
        `ID: ${job.id}, Başlık: ${job.attributes.Pozisyon}, Konum: ${job.attributes.Konum}, Tür: ${job.attributes.PozisyonSekli}`);
      return job;
    }
    
    console.warn(`No job found with id: ${id}`);
    return null;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Pozisyon detay Axios hatası:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data
      });
    }
    return null;
  }
} 
 