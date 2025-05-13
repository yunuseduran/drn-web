// İş pozisyonları için tip tanımları

// Görsel için düzeltilmiş veri yapısı
export interface JobImage {
  data: null | {
    id?: number;
    attributes: any; // Strapi'den dönen her türlü görsel özelliğini desteklemek için any kullanıyoruz
  }
}

// İş pozisyonu ana tip
export interface Job {
  id: number;
  attributes: JobAttributes;
}

// İş pozisyon özellikleri
export interface JobAttributes {
  // Strapi'den dönen alanlar (doğrudan API yanıtı)
  title?: string;
  slug?: string;
  Pozisyon?: string; // Başlık olarak kullanılacak alan 
  description?: string;
  Konum?: string;  // Lokasyon bilgisi
  PozisyonSekli?: string; // Tam zamanlı, yarı zamanlı vs.
  JobsType?: string; // Departman/kategori bilgisi
  content?: string; // Detaylı içerik
  
  // Eski alanlar - geriye uyumluluk için tutuyoruz
  location?: string;
  department?: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;
  isActive?: boolean;
  
  // Zaman damgaları
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  
  // Görseller
  image: JobImage;
}

// Kariyer başvuru formu için tip
export interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  cv: File | null;
  positionName: string;
  message?: string;
} 