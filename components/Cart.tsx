
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl border-l border-white/10 flex flex-col animate-slide-in-right">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold uppercase tracking-tight">Your Loadout</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <div className="w-16 h-16 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 opacity-30" />
              </div>
              <p className="text-sm uppercase tracking-widest">Cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Cart Window for Image */}
                <div className="w-20 h-24 bg-[#151515] rounded-lg overflow-hidden border border-white/5 flex items-center justify-center p-1">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm mb-1 group-hover:text-red-400 transition-colors uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold text-red-500">${(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-white/[0.02]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-sm uppercase font-bold tracking-widest">Subtotal</span>
            <span className="text-2xl font-black italic text-red-500">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-red-500 text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={items.length === 0}>
            Initiate Checkout
          </button>
          <p className="text-[10px] text-center text-gray-600 mt-4 uppercase tracking-[0.2em]">Secure Encryption Active</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
