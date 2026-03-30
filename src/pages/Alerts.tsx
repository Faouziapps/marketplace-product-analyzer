import React from 'react';
import { Bell, Settings, Filter, Trash2, CheckCircle2, Clock, DollarSign, TrendingUp, Zap, ShieldCheck, BellOff, MoreVertical, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      title: 'Oportunidade Detectada',
      message: 'O produto "Microfone Condensador" atingiu o critério de Demanda > 80% e Concorrência < 10 vendedores.',
      time: 'Há 10 minutos',
      type: 'opportunity',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Aumento de Preço',
      message: 'A média de preço para "Smartwatch D20" subiu 15% nas últimas 24 horas.',
      time: 'Há 2 horas',
      type: 'price',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Nova Tendência',
      message: 'Buscas por "Decoração Boho" cresceram 200% no Google Trends.',
      time: 'Há 5 horas',
      type: 'trend',
      read: true,
      priority: 'low'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Central de Alertas</h2>
          <p className="text-slate-500 font-medium">Gerencie suas notificações e critérios de monitoramento inteligente.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> Filtrar
          </button>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Alerts List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-200">Todos</button>
            <button className="px-5 py-2 text-slate-400 hover:text-slate-600 text-xs font-black transition-colors">Não Lidos</button>
            <button className="px-5 py-2 text-slate-400 hover:text-slate-600 text-xs font-black transition-colors">Arquivados</button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {alerts.map((alert, i) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={cn(
                    "group p-6 rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden",
                    !alert.read ? "bg-white border-blue-100 shadow-xl shadow-blue-100/50" : "bg-slate-50/50 border-slate-100"
                  )}
                >
                  {!alert.read && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                  )}
                  
                  <div className="flex gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-sm",
                      alert.type === 'opportunity' ? "bg-emerald-50 text-emerald-600" :
                      alert.type === 'price' ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    )}>
                      {alert.type === 'opportunity' ? <CheckCircle2 size={28} /> : 
                       alert.type === 'price' ? <DollarSign size={28} /> : <TrendingUp size={28} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-slate-900 text-lg">{alert.title}</h4>
                            {alert.priority === 'high' && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black uppercase tracking-widest rounded-full">Urgente</span>
                            )}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={10} /> {alert.time}
                          </span>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all">Ver Detalhes</button>
                          <button className="px-4 py-2 text-slate-400 hover:text-red-500 text-xs font-black flex items-center gap-1 transition-colors">
                            <Trash2 size={14} /> Excluir
                          </button>
                        </div>
                        {!alert.read && (
                          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Marcar como lido</button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -mr-16 -mt-16" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-black tracking-tight">Regras Inteligentes</h3>
              </div>
              
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                Defina os gatilhos para que o sistema monitore o mercado por você 24/7.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { label: 'Demanda > 75%', active: true },
                  { label: 'Concorrência < 15', active: true },
                  { label: 'Margem > 40%', active: false },
                  { label: 'Preço Subiu > 10%', active: true },
                ].map((rule, i) => (
                  <label key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all group">
                    <span className={cn("text-sm font-bold transition-colors", rule.active ? "text-white" : "text-slate-500")}>{rule.label}</span>
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-colors",
                      rule.active ? "bg-blue-600" : "bg-slate-700"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                        rule.active ? "right-1" : "left-1"
                      )} />
                    </div>
                    <input type="checkbox" className="hidden" defaultChecked={rule.active} />
                  </label>
                ))}
              </div>

              <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-black/20">
                Salvar Regras
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-[3rem] space-y-4">
            <div className="flex items-center gap-3 text-blue-600 mb-2">
              <ShieldCheck size={24} />
              <h4 className="font-black text-lg">Modo Focado</h4>
            </div>
            <p className="text-blue-800/70 text-sm font-medium leading-relaxed">
              Ative o modo focado para receber apenas alertas de <strong>Alta Prioridade</strong> durante o horário comercial.
            </p>
            <button className="flex items-center gap-2 text-blue-600 font-black text-sm hover:gap-3 transition-all">
              Configurar horários <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
