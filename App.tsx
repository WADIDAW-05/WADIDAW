
import React, { useState, useEffect } from 'react';
import Hero3D from './components/Hero3D';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import Cart from './components/Cart';
import AIStylist from './components/AIStylist';
import CollectionsView from './components/CollectionsView';
import BrandView from './components/BrandView';
import { PRODUCTS } from './constants';
import { Product, CartItem, AppView } from './types';
import { ArrowDown, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Scroll to top when view changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const addToCart = (product: Product, size?: string, qty: number = 1) => {
    setCart(prev => {
      const cartId = `${product.id}-${size || 'default'}`;
      const existing = prev.find(item => `${item.id}-${item.selectedSize || 'default'}` === cartId);
      
      if (existing) {
        return prev.map(item => 
          `${item.id}-${item.selectedSize || 'default'}` === cartId 
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, quantity: qty, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(0, item.quantity + delta);
        return nextQty === 0 ? null : { ...item, quantity: nextQty };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            {/* Hero Content */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6">
              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4 animate-pulse">
                WADI<span className="text-red-500">DAW</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-2xl uppercase tracking-[0.3em] font-light max-w-2xl text-center">
                BIARKAN GAYA YANG BERBICARA
              </p>
              <div className="absolute bottom-10 animate-bounce">
                <ArrowDown className="w-8 h-8 text-red-500" />
              </div>
            </section>

            {/* Products Section */}
            <main className="relative z-20 bg-[#050505] pt-24 pb-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-2">BEST SELLER <span className="text-red-500">01</span></h2>
                    <p className="text-gray-500 font-mono tracking-widest">EST. 2025 // INDONESIA - BEKASI</p>
                  </div>
                  <div className="flex gap-4">
                    {['Semua', 'Hoodie', 'Alas Kaki', 'Teknis'].map(cat => (
                      <button key={cat} className="px-6 py-2 rounded-full border border-white/10 hover:border-red-500 transition-colors text-xs font-bold uppercase tracking-widest">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div id="collection" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={(p) => addToCart(p)} 
                      onViewDetails={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>

                {/* Special Feature Section */}
                <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-square rounded-3xl overflow-hidden group border border-white/5">
                    <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=100&w=3840" alt="Cyberpunk Aesthetic" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay" />
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-5xl font-black italic leading-tight">LEBIH DARI <br/> PAKAIAN.</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      WADIDAW bukan sekadar label. Ini adalah upgrade untuk avatar fisik dan digital Anda.
                      Menggunakan serat bio-organik dan teknologi pewarna pintar, kami menciptakan pakaian yang bernapas,
                      bereaksi, dan berevolusi.
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-8">
                      <div>
                        <h4 className="text-red-500 text-3xl font-black mb-2">99.9%</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Material Daur Ulang</p>
                      </div>
                      <div>
                        <h4 className="text-red-500 text-3xl font-black mb-2">24/7</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Bantuan Gaya</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setCurrentView('brand')}
                      className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-red-500 transition-all group"
                    >
                      Gabung Kolektif <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </>
        );
      case 'collections':
        // Fixed: Passed onViewDetails to CollectionsView to resolve prop requirement and enable product modals
        return (
          <CollectionsView 
            onAddToCart={(p) => addToCart(p)} 
            onViewDetails={(p) => setSelectedProduct(p)} 
          />
        );
      case 'brand':
        return <BrandView />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-red-500 selection:text-black">
      {/* 3D Background - Persistent across views */}
      <Hero3D />

      <Navbar 
        onCartOpen={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {renderContent()}

      {/* Footer */}
      <footer className="relative z-20 bg-[#0a0a0a] border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6 max-w-xs">
            <div 
              onClick={() => setCurrentView('home')}
              className="text-3xl font-black tracking-tighter italic cursor-pointer"
            >
              WADI<span className="text-red-500">DAW</span>
            </div>
            <p className="text-gray-500 text-sm">
              Rumah mode futuristik untuk pengembara digital. Lahir di jalanan, dibangun untuk masa depan.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-400">Belanja</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li onClick={() => setCurrentView('home')} className="hover:text-red-500 cursor-pointer transition-colors">Pria</li>
                <li onClick={() => setCurrentView('home')} className="hover:text-red-500 cursor-pointer transition-colors">Wanita</li>
                <li onClick={() => setCurrentView('collections')} className="hover:text-red-500 cursor-pointer transition-colors">Edisi Cyber</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-400">Bantuan</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li className="hover:text-red-500 cursor-pointer transition-colors">Pengiriman</li>
                <li className="hover:text-red-500 cursor-pointer transition-colors">Retur</li>
                <li className="hover:text-red-500 cursor-pointer transition-colors">FAQ</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-400">Newsletter</h5>
              <div className="flex gap-2">
                <input type="email" placeholder="ALAMAT EMAIL" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs w-full focus:outline-none focus:border-red-500" />
                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs">IKUT</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em]">
          &copy; 2025 WADIDAW INDUSTRIES. HAK CIPTA DILINDUNGI.
        </div>
      </footer>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <AIStylist />

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff0000;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
