export interface ProductCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    products?: {
      data: Product[];
    };
  };
}

export interface ProductCategoryWithImage {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    image?: {
      data?: {
        id?: number;
        attributes?: {
          url?: string;
          width?: number;
          height?: number;
          alternativeText?: string;
        };
      };
      url?: string; // Direct URL field for alternative format
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    mainImage: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText?: string;
        };
      }>;
    };
    gallery?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText?: string;
        };
      }>;
    };
    service_categories: {
      data: ProductCategory[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ProductWithImage {
  id: number;
  attributes: {
    title: string;
    description: string;
    price?: number;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText?: string;
        };
      };
    };
    category: {
      data: ProductCategory;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string | any;
  category: string;
  features: string[];
  content?: string;
  gallery: string[];
} 