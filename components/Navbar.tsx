
import React from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
  cartCount: number;
  currentView: AppView;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartOpen, cartCount, currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 cursor-pointer hover:text-red-400 transition-colors" />
        <div 
          onClick={() => onNavigate('home')}
          className="text-2xl font-black tracking-tighter italic cursor-pointer select-none"
        >
          WADI<span className="text-red-500">DAW</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
        <button 
          onClick={() => onNavigate('home')}
          className={`${currentView === 'home' ? 'text-red-400' : 'text-white'} hover:text-red-400 transition-colors underline-offset-8 ${currentView === 'home' ? 'underline' : ''}`}
        >
          BERANDA
        </button>
        <button 
          onClick={() => onNavigate('collections')}
          className={`${currentView === 'collections' ? 'text-red-400' : 'text-white'} hover:text-red-400 transition-colors underline-offset-8 ${currentView === 'collections' ? 'underline' : ''}`}
        >
          KOLEKSI
        </button>
        <button 
          onClick={() => onNavigate('brand')}
          className={`${currentView === 'brand' ? 'text-red-400' : 'text-white'} hover:text-red-400 transition-colors underline-offset-8 ${currentView === 'brand' ? 'underline' : ''}`}
        >
          WDDW
        </button>
      </div>

      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 cursor-pointer hover:text-red-400" />
        <User className="w-5 h-5 cursor-pointer hover:text-red-400" />
        <button 
          onClick={onCartOpen}
          className="relative p-2 group"
        >
          <ShoppingBag className="w-6 h-6 group-hover:text-red-400 transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
