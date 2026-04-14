
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [isColored, setIsColored] = useState(false);

  return (
    <div 
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-500 shadow-2xl"
    >
      {/* The "Window" (Jendela) Container */}
      <div 
        className="aspect-[3/4] overflow-hidden relative bg-[#151515] flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsColored(true)}
        onMouseLeave={() => setIsColored(false)}
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isColored ? 'grayscale-0' : 'grayscale'
          } group-hover:scale-105`}
          style={{ objectPosition: 'center 20%' }}
        />
        
        {/* Reveal Hint Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <Eye className="w-10 h-10 mb-2 text-red-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-red-600 px-4 py-2 rounded-full shadow-xl">Lihat Detail</span>
        </div>
        
        {/* Hover Glow */}
        <div className={`absolute inset-0 bg-red-500/5 transition-opacity duration-300 pointer-events-none ${isColored ? 'opacity-0' : 'opacity-100'}`} />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white z-10 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-5 border-t border-white/5 bg-[#0d0d0d]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-base group-hover:text-red-400 transition-colors uppercase tracking-tight">{product.name}</h3>
          <span className="text-red-500 font-mono font-black text-sm">Rp {product.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold px-2 py-1 bg-white/5 rounded">{product.category}</span>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.color }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
