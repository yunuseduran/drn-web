export interface ServiceCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    services?: {
      data: Service[];
    };
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    featuredImage: {
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
    category: {
      data: ServiceCategory;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
} 
 