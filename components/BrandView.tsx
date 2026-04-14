
import React from 'react';
import { Cpu, Zap, Globe, ShieldCheck } from 'lucide-react';

const BrandView: React.FC = () => {
  const handleContactDida = () => {
    // Redirect to WhatsApp using the updated number 08132180030
    window.open('https://wa.me/628132180030', '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 animate-in fade-in duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Manifesto Section */}
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-black tracking-[0.5em] text-red-500 uppercase">Mission File 001</div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              <span className="text-red-500">WADIDAW</span> IS YOUR IDENTITY
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed font-light">
              WADIDAW,bukan sekedar nama,wadidaw adalah ekpresi kagum saat melihat sesuatu yang keren,di ambil dari nama sang pembuat juga yaitu wa dida w.biarkan gaya yang bercerita.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-4xl font-black italic mb-1 text-white">2025</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Inception</div>
              </div>
              <div>
                <div className="text-4xl font-black italic mb-1 text-white">0.03s</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-black italic mb-1 text-white">64K</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Node Network</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-10 bg-red-500/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative aspect-square rounded-full border border-white/10 p-4 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-red-500/30 flex items-center justify-center animate-spin-slow">
                <div className="w-32 h-32 bg-red-500 rounded-full blur-[40px] opacity-40" />
                <div className="text-2xl font-black italic z-10">WADIDAW CORE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { icon: <Cpu />, title: 'Tech Integrated', desc: 'Terhubung mulus dengan perangkat keras neural dan digital Anda.' },
            { icon: <Zap />, title: 'Hyper Fabric', desc: 'Tekstil adaptif yang mengatur suhu dan denyut nadi.' },
            { icon: <Globe />, title: 'Decentralized', desc: 'Kepemilikan diverifikasi melalui teknologi blockchain yang aman.' },
            { icon: <ShieldCheck />, title: 'Meta-Shield', desc: '100% AMAN DAN SESUAI DENGAN GAMBAR' }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-red-500/30 transition-all group">
              <div className="w-12 h-12 bg-red-500 text-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
              </div>
              <h4 className="text-xl font-black italic uppercase mb-4 tracking-tight">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-12 bg-white text-black rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-4xl font-black italic uppercase mb-6">Ingin bergabung dengan gerakan kami?</h3>
              <p className="text-black/60 font-medium leading-relaxed">
                Kami mencari kreator, desainer, dan hacker untuk memperluas ekosistem WADIDAW. Jejak digital Anda sangat berarti.
              </p>
            </div>
            <button 
              onClick={handleContactDida}
              className="whitespace-nowrap bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-red-600 transition-all transform hover:scale-105"
            >
              Hubungi Dida
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BrandView;
