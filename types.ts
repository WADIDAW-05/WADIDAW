
export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Hoodie' | 'T-Shirt' | 'Accessories' | 'Footwear';
  image: string;
  description: string;
  color: string;
  sizes?: string[];
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type AppView = 'home' | 'collections' | 'brand';

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  items: string[]; // Product IDs
}
