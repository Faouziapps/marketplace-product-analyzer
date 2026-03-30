import React, { useState } from 'react';
import { Search, Filter, Star, Users, ShoppingCart, ExternalLink, Loader2, TrendingUp, ArrowUpRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    fetch(`/api/ml/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-10">
      {/* Search Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-[3rem] -z-10" />
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-6">Encontre sua próxima mina de ouro</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
              <input 
                type="text"
                placeholder="Ex: Fone de ouvido bluetooth, Cadeira gamer..."
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-400 transition-all text-lg font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="px-10 py-5 bg-blue-600 text-white font-black rounded-[1.5rem] hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
              Analisar Mercado
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sugestões:</span>
            {['Eletrônicos', 'Casa & Jardim', 'Moda', 'Esportes'].map(cat => (
              <button 
                key={cat} 
                onClick={() => { setQuery(cat); }}
                className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Filter size={18} />
              <span className="text-sm font-bold">Filtros Avançados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {results.length > 0 ? (
            results.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={product.id} 
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 overflow-hidden group"
              >
                <div className="relative h-64 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <ShoppingCart size={64} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-slate-900 shadow-sm">
                    R$ {product.price.toFixed(2)}
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200">
                    Oportunidade
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span>{product.rating} (1.2k avaliações)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-3xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Concorrência</p>
                      <p className="text-lg font-black text-slate-800">{product.sellers} vend.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-3xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vendas Est.</p>
                      <p className="text-lg font-black text-slate-800">{product.sales} un/mês</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                      Análise Profunda
                    </button>
                    <button className="w-14 h-14 flex items-center justify-center border-2 border-slate-100 text-slate-400 rounded-2xl hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <ExternalLink size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : query && !loading ? (
            <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Nada por aqui...</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">Não encontramos resultados para sua busca. Tente termos mais abrangentes ou mude de categoria.</p>
            </div>
          ) : !query && (
            <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/50 p-8 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-slate-400">
                    <Info size={32} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Dica #{i}</h4>
                  <p className="text-sm text-slate-500">Use filtros de localização para encontrar nichos regionais com menos frete.</p>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductSearch;
