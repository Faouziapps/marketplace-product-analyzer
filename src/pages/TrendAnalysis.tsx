import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search, Filter, Calendar, Globe, Zap, BarChart3, PieChart, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const mockTrendData = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'Mai', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

const TrendAnalysis = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Tendências de Mercado</h2>
          <p className="text-slate-500 font-medium">Explore o que está em alta no Mercado Livre e Google Trends.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar tendências..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Featured Trend Chart */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Volume de Buscas Global</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Últimos 6 meses • Brasil</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '90D', '1Y'].map((p) => (
                <button key={p} className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black transition-all",
                  p === '90D' ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}>{p}</button>
              ))}
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '16px', 
                    border: 'none',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '12px'
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-slate-900/20">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Zap className="text-amber-400" size={20} /> Categorias em Alta
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Eletrônicos', growth: '+45%', color: 'bg-blue-500' },
                { label: 'Casa & Jardim', growth: '+28%', color: 'bg-emerald-500' },
                { label: 'Moda', growth: '+12%', color: 'bg-purple-500' },
                { label: 'Beleza', growth: '+8%', color: 'bg-pink-500' },
              ].map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-400">{cat.label}</span>
                    <span className="text-white">{cat.growth}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: cat.growth.replace('+', '') }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn("h-full rounded-full", cat.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={20} /> Insights Rápidos
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Melhor Dia para Anúncio</p>
                <p className="text-lg font-black text-slate-900">Domingo, 20h - 22h</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Ticket Médio em Alta</p>
                <p className="text-lg font-black text-slate-900">R$ 150,00 - R$ 280,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Produtos Emergentes</h3>
          <button className="text-blue-600 font-black text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Ver todos <ArrowUpRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Fone Bluetooth Pro', growth: '+124%', trend: 'up', category: 'Eletrônicos' },
            { name: 'Luminária Inteligente', growth: '+85%', trend: 'up', category: 'Casa' },
            { name: 'Mochila Antifurto', growth: '+42%', trend: 'up', category: 'Acessórios' },
            { name: 'Smartwatch V8', growth: '-12%', trend: 'down', category: 'Eletrônicos' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-lg shadow-slate-100/50 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Zap size={24} />
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1",
                  item.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                  {item.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {item.growth}
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.category}</p>
              <h4 className="text-lg font-black text-slate-900 leading-tight mb-4">{item.name}</h4>
              <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                Analisar Tendência
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
