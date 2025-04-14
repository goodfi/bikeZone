export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
  isNew: boolean;
  isWeeklyHit?: boolean;
  inStock: boolean;
  sku?: string;
  createdAt: string;
  quantity?: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}
