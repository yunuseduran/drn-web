// Haber tipi için temel tanımlar

// Görsel için düzeltilmiş veri yapısı
export interface MediaImage {
  data: null | {
    id: number;
    attributes: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string;
    }
  }
}

// Haber özellikleri
export interface HaberAttributes {
  title: string;
  content: string;
  slug: string;
  summary?: string;
  description?: string;
  date?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  // API'de hiç image alanı olmayabilir veya olup data null olabilir
  image?: MediaImage;
}

// Haber ana tipi
export interface Haber {
  id: number;
  attributes: HaberAttributes;
}

// API yanıtı için tip
export interface HaberResponse {
  data: Haber[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
} 