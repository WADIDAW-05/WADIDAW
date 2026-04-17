
import { Product, Collection, Review } from './types';

const MOCK_REVIEWS: Review[] = [
  { id: 'r1', user: 'CyberNomad', rating: 5, comment: 'Bahannya gokil, beneran techwear masa depan! Wadidaw banget!', date: '2025-05-12' },
  { id: 'r2', user: 'StreetGazer', rating: 4, comment: 'Desainnya cakep, pengiriman ke Bekasi cepet juga.', date: '2025-05-10' }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'WDDW Hoodie',
    price: 299.999,
    category: 'Hoodie',
    image: 'https://picsum.photos/seed/hoodie/800/800',
    description: 'Hoodie katun premium oversized dengan logo WADIDAW holografik. Dirancang untuk kenyamanan maksimal di iklim urban.',
    color: '#ff0000',
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '2',
    name: 'T-Shirt W11',
    price: 119.999,
    category: 'T-Shirt',
    image: 'https://picsum.photos/seed/tshirt/800/800',
    description: 'W - Boxy Oversize Tshirtm - Combed 24s Hitam/Putih. (kelembutan kain lebih lembut dan soft)',
    color: '#ff00ff',
    sizes: ['S', 'M', 'L'],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '3',
    name: 'WDDW X LVP',
    price: 110.000,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/acc/800/800',
    description: 'Kalung WDDW X LVP Titanium Dengan Magnet.',
    color: '#ffffff',
    sizes: ['60 cm', '50cm', '55 cm'],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '4',
    name: 'Orbit Sneakers V2',
    price: 899.00,
    category: 'Footwear',
    image: 'https://picsum.photos/seed/shoes/800/800',
    description: 'Langkah kecilmu hari ini bisa jadi awal cerita besar.sepatu bukan cuma alas kaki,tapi bagian untuk mengejar mimpi.',
    color: '#39ff14',
    sizes: ['40', '41', '42', '43', '44'],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '5',
    name: 'Keychain Titanium',
    price: 20.000,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/keychain/800/800',
    description: 'Keychain Y2K Titanium dengan Magnet.',
    color: '#ff4d4d',
    sizes: ['All Size'],
    reviews: [...MOCK_REVIEWS]
  },
  {
    id: '6',
    name: 'Jorts Pants',
    price: 150.000,
    category: 'PANTS',
    image: 'https://picsum.photos/seed/pants/800/800',
    description: 'Street Style.',
    color: '#ff4d4d',
    sizes: ['All Size'],
    reviews: [...MOCK_REVIEWS]
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: 'NEON PROTOCOL',
    subtitle: 'High-visibility urban wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=100&w=1600',
    items: ['1', '4']
  },
  {
    id: 'c2',
    title: 'SILENT RUN',
    subtitle: 'Stealth-focused techwear',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=100&w=1600',
    items: ['2', '3']
  },
  {
    id: 'c3',
    title: 'ORBITAL CORE',
    subtitle: 'Space-age essentials',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=100&w=1600',
    items: ['5', '6']
  }
];
