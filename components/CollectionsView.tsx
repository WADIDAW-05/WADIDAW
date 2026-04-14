
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ArrowRight, ChevronLeft } from 'lucide-react';

interface CollectionsViewProps {
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'Hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=100&w=1200',
  'T-Shirt': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=100&w=1200',
  'Accessories': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=100&w=1200',
  'Footwear': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=100&w=1200'
};

const CollectionsView: React.FC<CollectionsViewProps> = ({ onAddToCart, onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [coloredCategories, setColoredCategories] = useState<Record<string, boolean>>({});

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  const handleCategoryClick = (cat: string) => {
    setColoredCategories(prev => ({ ...prev, [cat]: true }));
    setTimeout(() => setSelectedCategory(cat), 500);
  };

  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        {!selectedCategory ? (
          <>
            <div className="mb-16">
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
                KATE<span className="text-red-500">GORI</span>
              </h2>
              <p className="text-gray-500 font-mono tracking-widest max-w-lg">
                PILIH ARMOR FISIKMU BERDASARKAN KELAS DAN FUNGSIONALITAS URBAN.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-red-500/50 transition-all bg-[#111]"
                >
                  <img 
                    src={CATEGORY_IMAGES[cat] || PRODUCTS.find(p => p.category === cat)?.image} 
                    alt={cat} 
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      coloredCategories[cat] ? 'grayscale-0' : 'grayscale'
                    } group-hover:scale-110`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-red-600 px-6 py-3 rounded-full shadow-2xl">
                      Jelajahi
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-black italic uppercase group-hover:text-red-400 transition-colors tracking-tighter">
                      {cat === 'Footwear' ? 'ALAS KAKI' : cat === 'Accessories' ? 'AKSESORIS' : cat.toUpperCase()}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {PRODUCTS.filter(p => p.category === cat).length} ITEM TERSEDIA
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 mb-12 uppercase font-bold text-xs tracking-widest transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Kembali ke Kategori
            </button>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-2">
                  {selectedCategory === 'Footwear' ? 'ALAS KAKI' : selectedCategory === 'Accessories' ? 'AKSESORIS' : selectedCategory.toUpperCase()}
                </h2>
                <p className="text-red-500 font-mono tracking-widest uppercase">ARSIP PRODUK WADIDAW // KELAS {selectedCategory.toUpperCase()}</p>
              </div>
              <p className="text-gray-500 max-w-sm text-sm uppercase tracking-wide">
                Setiap item dirancang dengan presisi teknis tinggi untuk mobilitas maksimal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onViewDetails={onViewDetails} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsView;
