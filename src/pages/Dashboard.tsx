import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertCircle,
  Zap,
  Target,
  Activity,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { toast } from 'sonner';

const StatCard = ({ title, value, change, icon: Icon, trend, color }: { title: string, value: string, change: string, icon: any, trend: 'up' | 'down', color: string }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon size={24} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
        trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      )}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
  </motion.div>
);

interface Suggestion {
  id: string;
  name: string;
  demand: string;
  margin: string;
  competition: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchRealTrends = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Quais são os 4 produtos que estão mais em alta no Mercado Livre Brasil hoje? Retorne o nome do produto, a demanda estimada (0-100%), a margem de lucro média esperada e o nível de concorrência.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                demand: { type: Type.STRING },
                margin: { type: Type.STRING },
                competition: { type: Type.STRING }
              },
              required: ["id", "name", "demand", "margin", "competition"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      setSuggestions(data);
      setLastUpdate(new Date().toLocaleTimeString());
      toast.success("Dados de mercado atualizados em tempo real!");
    } catch (error) {
      console.error("Error fetching trends:", error);
      toast.error("Erro ao buscar dados reais. Usando dados locais.");
      // Fallback to static data if API fails
      setSuggestions([
        { id: '1', name: 'Kit de Iluminação para Podcast', demand: '94%', margin: '45%', competition: 'Média' },
        { id: '2', name: 'Tapete de Yoga Antiderrapante', demand: '82%', margin: '60%', competition: 'Baixa' },
        { id: '3', name: 'Mini Projetor Portátil 4K', demand: '91%', margin: '38%', competition: 'Alta' },
        { id: '4', name: 'Suporte Articulado para Monitor', demand: '76%', margin: '52%', competition: 'Média' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealTrends();
  }, []);

  const chartData = [
    { name: 'Seg', sales: 4000, demand: 2400 },
    { name: 'Ter', sales: 3000, demand: 1398 },
    { name: 'Qua', sales: 5000, demand: 9800 },
    { name: 'Qui', sales: 2780, demand: 3908 },
    { name: 'Sex', sales: 4890, demand: 4800 },
    { name: 'Sáb', sales: 6390, demand: 3800 },
    { name: 'Dom', sales: 7390, demand: 4300 },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Olá, Faouzi 👋</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            Aqui está o que está acontecendo no Mercado Livre hoje.
            {lastUpdate && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Live: {lastUpdate}</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchRealTrends}
            disabled={loading}
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-ml-blue hover:border-ml-blue transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={cn(loading && "animate-spin")} />
          </button>
          <Link 
            to="/opportunities"
            className="px-6 py-3 bg-ml-yellow text-slate-900 rounded-2xl font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-100 flex items-center gap-2"
          >
            <Zap size={18} />
            Analisar Agora
          </Link>
        </div>
      </div>

      {/* Hero Section / CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-ml-blue rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 text-white">
              <Zap size={12} className="fill-white" />
              <span>Novo: Análise em Tempo Real via IA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Encontre o seu próximo <span className="text-ml-yellow">Best Seller</span> hoje.
            </h2>
            <p className="text-blue-50 text-lg mb-8 leading-relaxed">
              Nossa IA analisa tendências reais do Google e Mercado Livre para encontrar as melhores oportunidades de lucro para você agora mesmo.
            </p>
            <Link 
              to="/opportunities"
              className="inline-flex items-center gap-3 bg-ml-yellow text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all shadow-xl active:scale-95"
            >
              Ver Oportunidades
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <div className="hidden lg:block w-64 h-64 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 rotate-3 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-ml-yellow rounded-xl flex items-center justify-center text-slate-900">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold bg-green-400 text-green-900 px-2 py-1 rounded-lg">HOT</span>
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-white/20 rounded-full w-full" />
              <div className="h-2 bg-white/20 rounded-full w-3/4" />
              <div className="h-2 bg-white/20 rounded-full w-1/2" />
              <div className="pt-4 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-blue-100 uppercase">Demanda</span>
                  <span className="text-2xl font-black">98%</span>
                </div>
                <div className="w-12 h-12 border-4 border-ml-yellow border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Opportunities Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Oportunidades em Destaque</h3>
          <Link to="/opportunities" className="text-ml-blue font-bold text-sm hover:underline flex items-center gap-1">
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 animate-pulse h-48" />
            ))
          ) : (
            suggestions.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-ml-blue">
                    <ShoppingCart size={20} />
                  </div>
                  <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-1 rounded-lg uppercase">
                    {product.demand}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-ml-blue transition-colors h-10">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Margem</span>
                    <span className="text-lg font-black text-emerald-600">{product.margin}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Comp.</span>
                    <span className="text-xs font-bold text-slate-600">{product.competition}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Produtos em Alta" 
          value="124" 
          change="+12%" 
          icon={TrendingUp} 
          trend="up" 
          color="bg-blue-50 text-ml-blue"
        />
        <StatCard 
          title="Concorrência" 
          value="Baixa" 
          change="-5%" 
          icon={Users} 
          trend="down" 
          color="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Margem Média" 
          value="32.5%" 
          change="+2.4%" 
          icon={DollarSign} 
          trend="up" 
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard 
          title="Volume Semanal" 
          value="R$ 45.2k" 
          change="+18%" 
          icon={ShoppingCart} 
          trend="up" 
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Análise de Performance</h3>
              <p className="text-slate-400 text-sm font-medium">Volume de vendas vs. Demanda estimada</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-white rounded-lg text-xs font-bold shadow-sm text-slate-900">Semanal</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">Mensal</button>
            </div>
          </div>
          <div className="h-[400px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3483FA" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3483FA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff', 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{fontWeight: 700}}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3483FA" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#cbd5e1" 
                  strokeWidth={2} 
                  fillOpacity={0} 
                  strokeDasharray="8 8" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Suggestions */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Sugestões em Tempo Real</h3>
              <Zap size={20} className="text-amber-500 fill-amber-500" />
            </div>
            <div className="space-y-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 size={40} className="text-ml-blue animate-spin" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Analisando Mercado...</p>
                </div>
              ) : (
                suggestions.map((product, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={product.id} 
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-ml-blue font-black text-sm group-hover:bg-ml-blue group-hover:text-white transition-all duration-300">
                      {product.margin}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-ml-blue transition-colors">{product.name}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="flex items-center gap-1 text-green-600"><TrendingUp size={10} /> {product.demand} DEM.</span>
                        <span className="flex items-center gap-1"><Users size={10} /> {product.competition}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-ml-blue transition-all">
                      <ArrowUpRight size={16} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            <Link 
              to="/opportunities"
              className="w-full mt-8 py-4 bg-slate-900 text-white text-center block font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Explorar Todas
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-ml-blue p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
          <Target size={32} className="mb-6 opacity-80" />
          <h4 className="text-xl font-black mb-2">Meta de Vendas</h4>
          <p className="text-blue-100 text-sm mb-6">Você atingiu 75% da sua meta mensal de R$ 60k.</p>
          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-white h-full w-3/4 rounded-full" />
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
            <span>R$ 45k</span>
            <span className="opacity-60">R$ 60k</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-4">
              <AlertCircle size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Alerta Crítico</span>
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Estoque em Baixa</h4>
            <p className="text-slate-500 text-sm">3 produtos do seu inventário principal estão com estoque para menos de 5 dias.</p>
          </div>
          <button className="mt-6 text-ml-blue font-bold text-sm hover:underline flex items-center gap-2">
            Ver Inventário <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
          <div>
            <Activity size={32} className="text-ml-blue mb-6" />
            <h4 className="text-lg font-black mb-2">Saúde da Conta</h4>
            <p className="text-slate-400 text-sm">Sua reputação no Mercado Livre está excelente. Continue assim!</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-8 bg-ml-blue rounded-full" />)}
            <span className="ml-2 text-2xl font-black">4.9</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
