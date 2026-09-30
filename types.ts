
export interface ProductVariant {
  name: string; // "Length", "Color", "Texture", "Shade", "Size"
  options: string[]; // ["18 inch", "22 inch"], ["Natural Black", "Honey Blonde"], ["Warm Sand", "Golden Honey"]
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  mainImage: string;
  images: string[];
  features: string[];
  ingredients?: string[]; // Mostly layout-driven for cosmetics
  variants: ProductVariant[];
}

export interface SelectedVariant {
  [key: string]: string; // "Length": "18 inch", "Shade": "Chic Rose"
}

export interface CartItem {
  id: string; // composite id: product.id + stringified variant
  product: Product;
  quantity: number;
  selectedVariant: SelectedVariant;
  isSelected?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // List of paragraphs/sections
  author: string;
  authorAvatar: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  mainImage: string;
  isFeatured?: boolean;
  comments: BlogComment[];
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}
