import React, { useState } from 'react';
import { Calculator, DollarSign, Truck, Percent, ArrowRight, RefreshCw, BarChart3, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ProfitCalculator = () => {
  const [inputs, setInputs] = useState({
    supplierCost: 50,
    shipping: 15,
    mlFee: 12, // percentage
    sellingPrice: 120,
    units: 10
  });

  const calculate = () => {
    const feeAmount = (inputs.sellingPrice * inputs.mlFee) / 100;
    const totalCostPerUnit = inputs.supplierCost + inputs.shipping + feeAmount;
    const profitPerUnit = inputs.sellingPrice - totalCostPerUnit;
    const netMargin = (profitPerUnit / inputs.sellingPrice) * 100;
    const totalProfit = profitPerUnit * inputs.units;
    const roi = (profitPerUnit / (inputs.supplierCost + inputs.shipping)) * 100;

    return {
      feeAmount,
      totalCostPerUnit,
      profitPerUnit,
      netMargin,
      totalProfit,
      roi
    };
  };

  const results = calculate();

  const InputField = ({ label, icon: Icon, value, onChange, type = "number", prefix = "R$" }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors font-bold text-sm">
          {prefix ? prefix : <Icon size={18} />}
        </div>
        <input 
          type={type} 
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-800"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Calculadora de Lucro</h2>
          <p className="text-slate-500 font-medium">Simule seus custos e descubra a viabilidade do seu produto.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <RefreshCw size={18} /> Limpar Tudo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Inputs Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Custos & Preços</h3>
            </div>
            
            <div className="space-y-6">
              <InputField 
                label="Custo do Fornecedor" 
                value={inputs.supplierCost} 
                onChange={(val: number) => setInputs({...inputs, supplierCost: val})} 
              />
              <InputField 
                label="Frete (por unidade)" 
                value={inputs.shipping} 
                onChange={(val: number) => setInputs({...inputs, shipping: val})} 
              />
              <div className="grid grid-cols-2 gap-6">
                <InputField 
                  label="Taxa ML (%)" 
                  prefix="%"
                  value={inputs.mlFee} 
                  onChange={(val: number) => setInputs({...inputs, mlFee: val})} 
                />
                <InputField 
                  label="Qtd. Vendas" 
                  prefix="#"
                  value={inputs.units} 
                  onChange={(val: number) => setInputs({...inputs, units: val})} 
                />
              </div>
              <div className="pt-4">
                <InputField 
                  label="Preço de Venda Sugerido" 
                  value={inputs.sellingPrice} 
                  onChange={(val: number) => setInputs({...inputs, sellingPrice: val})} 
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-emerald-900 font-black text-sm">Análise de Risco</p>
              <p className="text-emerald-700 text-xs font-medium">Sua margem está acima de 25%. Este produto é considerado de <strong>Baixo Risco</strong>.</p>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Margem Líquida</p>
                  <h2 className="text-7xl font-black tracking-tighter">{results.netMargin.toFixed(1)}%</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-[2rem] border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">ROI Estimado</p>
                  <p className="text-2xl font-black">{results.roi.toFixed(0)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Lucro / Unidade</p>
                  <p className="text-3xl font-black text-emerald-400">R$ {results.profitPerUnit.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Taxas Totais</p>
                  <p className="text-3xl font-black text-red-400">R$ {results.feeAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] shadow-xl shadow-blue-900/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs font-black uppercase tracking-widest mb-1">Lucro Total ({inputs.units} un.)</p>
                    <p className="text-5xl font-black">R$ {results.totalProfit.toFixed(2)}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Competitivo', price: inputs.sellingPrice * 0.9, icon: Zap, color: 'text-amber-500' },
              { label: 'Equilibrado', price: inputs.sellingPrice, icon: BarChart3, color: 'text-blue-500' },
              { label: 'Premium', price: inputs.sellingPrice * 1.15, icon: TrendingUp, color: 'text-emerald-500' },
            ].map((scenario, i) => {
              const fee = (scenario.price * inputs.mlFee) / 100;
              const profit = scenario.price - (inputs.supplierCost + inputs.shipping + fee);
              const margin = (profit / scenario.price) * 100;
              
              return (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={i} 
                  className={cn(
                    "p-6 rounded-[2rem] border transition-all duration-300",
                    i === 1 ? "bg-white border-blue-200 shadow-lg shadow-blue-100/50" : "bg-white/50 border-slate-100"
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <scenario.icon size={16} className={scenario.color} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{scenario.label}</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 mb-1">R$ {scenario.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Margem:</span>
                    <span className={cn("text-sm font-black", margin > 20 ? "text-emerald-600" : "text-amber-600")}>
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
