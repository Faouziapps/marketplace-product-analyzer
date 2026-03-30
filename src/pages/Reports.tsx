import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  PieChart, 
  BarChart, 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  FileType,
  Zap,
  Target,
  DollarSign,
  Megaphone,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const Reports = () => {
  const [generatingId, setGeneratingId] = useState<number | null>(null);

  const handleGenerate = (id: number, title: string) => {
    setGeneratingId(id);
    
    // Simulating report generation
    setTimeout(() => {
      setGeneratingId(null);
      toast.success(`Relatório "${title}" gerado com sucesso!`, {
        description: "O arquivo está pronto para download no histórico.",
        action: {
          label: "Baixar",
          onClick: () => console.log("Baixando...")
        }
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Relatórios de <span className="text-ml-blue">Inteligência</span></h2>
          <p className="text-slate-500 font-medium">Gere e visualize dados consolidados do mercado para decisões estratégicas.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => toast.info("Exportando todos os dados...")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-ml-yellow text-slate-900 font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-100"
          >
            <Download size={18} /> Exportar Tudo
          </button>
        </div>
      </div>

      {/* Featured Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { id: 1, title: 'Estratégia de Ads & Mkt', icon: Megaphone, color: 'text-ml-blue', bg: 'bg-blue-50', desc: 'Planejamento de investimento em Ads, ACOS alvo e canais de divulgação.' },
          { id: 2, title: 'Análise de Nichos', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Distribuição de mercado e identificação de lacunas lucrativas.' },
          { id: 3, title: 'Previsão de Demanda', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Projeções baseadas em IA para os próximos 90 dias.' },
        ].map((report, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8 }}
            onClick={() => handleGenerate(report.id, report.title)}
            className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 group cursor-pointer relative overflow-hidden"
          >
            <div className={cn(
              "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm",
              report.bg, report.color
            )}>
              <report.icon size={32} />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{report.title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{report.desc}</p>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileType size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PDF • 2.4 MB</span>
              </div>
              <button 
                disabled={generatingId === report.id}
                className="text-ml-blue font-black text-xs flex items-center gap-1 group-hover:gap-2 transition-all disabled:opacity-50"
              >
                {generatingId === report.id ? (
                  <>Gerando... <Loader2 size={14} className="animate-spin" /></>
                ) : (
                  <>Gerar <ArrowUpRight size={14} /></>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Section: Marketing Strategy Highlight */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.01 }}
        onClick={() => toast.success("Estratégia de Performance atualizada!", {
          description: "Os dados foram recalculados com base nas últimas 24h de vendas."
        })}
        className="bg-ml-blue rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200 cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Zap size={12} className="fill-white" />
              <span>Destaque do Mês</span>
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight">
              Estratégia de Divulgação <br /> <span className="text-ml-yellow">Alta Performance</span>
            </h3>
            <p className="text-blue-50 text-lg mb-8 leading-relaxed">
              Consolidamos os dados de Ads para seus produtos "Best Sellers". Saiba exatamente quanto investir para maximizar o ROI.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-bold text-blue-200 uppercase mb-1">Budget Sugerido</span>
                <span className="text-xl font-black">R$ 4.500,00</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <span className="block text-[10px] font-bold text-blue-200 uppercase mb-1">ACOS Alvo</span>
                <span className="text-xl font-black">12.5%</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8">
            <h4 className="text-lg font-black mb-6 flex items-center gap-2">
              <Target size={20} className="text-ml-yellow" />
              Checklist de Divulgação
            </h4>
            <div className="space-y-4">
              {[
                'Otimizar títulos com palavras-chave de cauda longa',
                'Ativar Mercado Ads (Product Ads) em modo "Crescimento"',
                'Participar de Campanhas de Ofertas Relâmpago',
                'Melhorar fotos secundárias para aumentar CTR'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-ml-yellow flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-slate-900" />
                  </div>
                  <p className="text-sm font-medium text-blue-50">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Product Analysis Section */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-ml-blue text-white rounded-2xl">
              <BarChart size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Análise Detalhada de Produto</h3>
              <p className="text-slate-500 text-sm font-medium">Dados extraídos da última varredura de mercado.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Atualizado Agora</span>
          </div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Column 1: Pricing & Competitors */}
            <div className="space-y-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <DollarSign size={14} /> Preços e Concorrência
              </h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">Preço Médio Concorrentes</span>
                  <span className="text-xl font-black text-slate-900">R$ 189,90</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">Menor Preço (Full)</span>
                  <span className="text-xl font-black text-ml-blue">R$ 165,00</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">Sugestão de Venda</span>
                  <span className="text-xl font-black text-emerald-600">R$ 179,90</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-ml-blue w-[70%]" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                  * Sugerimos R$ 179,90 para manter competitividade com margem de 32% após taxas do ML.
                </p>
              </div>
            </div>

            {/* Column 2: Ads & Marketing */}
            <div className="space-y-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Megaphone size={14} /> Investimento em Ads
              </h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">Budget Diário Sugerido</span>
                  <span className="text-xl font-black text-slate-900">R$ 50,00</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">CPC Médio Estimado</span>
                  <span className="text-xl font-black text-ml-blue">R$ 0,85</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm font-medium">ACOS Alvo</span>
                  <span className="text-xl font-black text-amber-500">10% - 15%</span>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-bold text-ml-blue leading-relaxed">
                    Dica: Ative o Product Ads no modo "Rentabilidade" para este item, focando em palavras-chave de fundo de funil.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: ROI & Potential */}
            <div className="space-y-8">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={14} /> Potencial de Retorno
              </h4>
              <div className="bg-slate-900 p-6 rounded-[2rem] text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-2">ROI Estimado</span>
                  <span className="text-4xl font-black text-ml-yellow">420%</span>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Vendas Mensais Est.</span>
                      <span className="font-bold">150 - 200 un.</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Lucro Líquido Est.</span>
                      <span className="font-bold text-emerald-400">R$ 8.400,00</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-ml-yellow/10 rounded-full blur-2xl" />
              </div>
              <button 
                onClick={() => toast.success("Relatório detalhado exportado!")}
                className="w-full py-4 bg-ml-yellow text-slate-900 font-black rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} /> Baixar PDF Completo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-500 rounded-2xl">
              <Clock size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Histórico de Relatórios</h3>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar histórico..." 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm"
              />
            </div>
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-10 py-6">Documento</th>
                <th className="px-10 py-6">Tipo</th>
                <th className="px-10 py-6">Data de Geração</th>
                <th className="px-10 py-6">Tamanho</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Estratégia de Ads: Q2 2026', date: '24 Mar 2026', type: 'Marketing', size: '1.8 MB', icon: Megaphone, color: 'text-ml-blue' },
                { name: 'Tendências de Verão 2026', date: '20 Mar 2026', type: 'Tendência', size: '1.2 MB', icon: FileText, color: 'text-orange-600' },
                { name: 'Análise Concorrência: Eletrônicos', date: '15 Mar 2026', type: 'Mercado', size: '3.5 MB', icon: FileSpreadsheet, color: 'text-blue-600' },
                { name: 'Relatório de Lucratividade Q1', date: '01 Mar 2026', type: 'Financeiro', size: '840 KB', icon: FileText, color: 'text-emerald-600' },
              ].map((item, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-3 bg-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all", item.color)}>
                        <item.icon size={20} />
                      </div>
                      <span className="font-black text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-slate-500">{item.date}</td>
                  <td className="px-10 py-8 text-sm font-bold text-slate-400">{item.size}</td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info(`Iniciando download de: ${item.name}`);
                      }}
                      className="p-3 text-slate-300 hover:text-ml-blue hover:bg-blue-50 rounded-2xl transition-all"
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => toast.info("Carregando mais registros do histórico...")}
            className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-ml-blue transition-colors"
          >
            Carregar mais registros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
