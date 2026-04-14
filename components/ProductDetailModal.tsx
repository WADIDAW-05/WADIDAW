
import React, { useState } from 'react';
import { X, Star, ShoppingCart, MessageSquare, Send } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size?: string, qty?: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [newComment, setNewComment] = useState('');

  if (!product) return null;

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Pilih ukuran dulu, Bos!');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-[0_0_50px_rgba(255,0,0,0.2)] animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Left: Image Section */}
        <div className="md:w-1/2 relative bg-[#151515] flex items-center justify-center p-8 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-10">
            <span className="text-red-500 font-black italic text-4xl uppercase tracking-tighter">
              {product.category}
            </span>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-2 border-b-2 font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'details' ? 'border-red-500 text-white' : 'border-transparent text-gray-500'}`}
            >
              Info Produk
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 border-b-2 font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'reviews' ? 'border-red-500 text-white' : 'border-transparent text-gray-500'}`}
            >
              Ulasan ({product.reviews?.length || 0})
            </button>
          </div>

          {activeTab === 'details' ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
              <div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">{product.name}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-mono font-black text-red-500">Rp {product.price.toLocaleString()}</span>
                  <div className="flex items-center text-yellow-500 gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>

              {/* Pemesanan Section */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 block">PILIH UKURAN</label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-6 py-3 rounded-xl border font-bold transition-all ${
                            selectedSize === size 
                              ? 'bg-red-500 border-red-500 text-black scale-110 shadow-[0_0_15px_rgba(255,0,0,0.5)]' 
                              : 'border-white/10 hover:border-red-500 text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 block">QTY</label>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-red-500">-</button>
                      <span className="w-12 text-center font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-red-500">+</button>
                    </div>
                  </div>
                  <button 
                    onClick={handleAdd}
                    className="flex-1 bg-white text-black h-16 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-red-500 transition-all group"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-125 transition-transform" />
                    BUNGKUS SEKARANG
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right duration-300">
              <div className="space-y-6 mb-8">
                {product.reviews?.map(review => (
                  <div key={review.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-black italic text-red-400">{review.user}</span>
                      <div className="flex text-yellow-500 gap-0.5">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">"{review.comment}"</p>
                    <span className="text-[10px] text-gray-600 font-mono">{review.date}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 block">TULIS ULASAN</label>
                <div className="relative">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Wadidaw bangeeet..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-12 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none h-24"
                  />
                  <button className="absolute bottom-4 right-4 text-red-500 hover:scale-125 transition-transform">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
