import React, { useState } from 'react';
import { 
  Target, 
  DollarSign, 
  Zap, 
  ArrowUpRight, 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Activity,
  Megaphone,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { toast } from 'sonner';

interface SuggestedProduct {
  name: string;
  reason: string;
  estimatedPrice: string;
  expectedMargin: string;
  demand: string; // 0-100%
  competitionDetails: string; // Detailed analysis of competition
  adsStrategy: string;
  difficulty: 'Baixa' | 'Média' | 'Alta';
  mlLink: string; // Link to search on Mercado Livre
}

const PersonalizedAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [experience, setExperience] = useState('Iniciante');
  const [result, setResult] = useState<SuggestedProduct | null>(null);

  const loadingMessages = [
    "Cruzando dados de mercado...",
    "Analisando concorrência...",
    "Calculando margens ideais...",
    "Formatando estratégia de Ads...",
    "Finalizando relatório..."
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) {
      toast.error("Por favor, insira seu orçamento para divulgação.");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setResult(null);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `Aja como um especialista em Mercado Livre Brasil. 
      O usuário tem um orçamento de R$ ${budget} para divulgação (Ads/Marketing). 
      A categoria de interesse é: ${category || 'Qualquer uma'}. 
      O nível de experiência do usuário é: ${experience}.
      Com base nisso, encontre o MELHOR produto específico para ele vender hoje.
      Analise profundamente a demanda e a concorrência (se a concorrência for muito alta, evite sugerir a menos que o orçamento seja alto).
      Retorne um objeto JSON com:
      - name: Nome do produto
      - reason: Por que este produto é ideal para este orçamento e experiência
      - estimatedPrice: Preço médio de venda sugerido (ex: R$ 150,00)
      - expectedMargin: Margem de lucro esperada (%)
      - demand: Porcentagem de demanda estimada (ex: 85%)
      - competitionDetails: Explicação detalhada sobre a concorrência atual para este produto
      - adsStrategy: Como ele deve usar os R$ ${budget} da melhor forma para este produto
      - difficulty: Nível de dificuldade (Baixa, Média ou Alta)
      - mlLink: URL de pesquisa no Mercado Livre para este produto (ex: https://lista.mercadolivre.com.br/nome-do-produto)`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              estimatedPrice: { type: Type.STRING },
              expectedMargin: { type: Type.STRING },
              demand: { type: Type.STRING },
              competitionDetails: { type: Type.STRING },
              adsStrategy: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ['Baixa', 'Média', 'Alta'] },
              mlLink: { type: Type.STRING }
            },
            required: ["name", "reason", "estimatedPrice", "expectedMargin", "demand", "competitionDetails", "adsStrategy", "difficulty", "mlLink"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}") as SuggestedProduct;
      setResult(data);
      toast.success("Análise personalizada concluída!");
    } catch (error) {
      console.error("Error in analysis:", error);
      toast.error("Erro ao processar análise. Tente novamente.");
    } finally {
      setLoading(false);
      clearInterval(stepInterval);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Análise <span className="text-ml-blue">Personalizada</span></h2>
          <p className="text-slate-500 font-medium">Encontre o produto ideal com base no seu orçamento e perfil.</p>
        </div>
        <div className="p-3 bg-ml-yellow rounded-2xl shadow-xl shadow-yellow-100">
          <Sparkles className="text-slate-900" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40">
            <form onSubmit={handleAnalyze} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <DollarSign size={16} /> Orçamento para Ads (R$)
                </label>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ex: 500"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-lg"
                />
                <p className="text-[10px] text-slate-400 font-bold">Quanto você pretende gastar por mês em divulgação.</p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Target size={16} /> Categoria de Interesse
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold"
                >
                  <option value="">Qualquer Categoria</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Casa e Cozinha">Casa e Cozinha</option>
                  <option value="Beleza">Beleza</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Brinquedos">Brinquedos</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={16} /> Nível de Experiência
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Iniciante', 'Intermediário', 'Expert'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setExperience(level)}
                      className={cn(
                        "py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border",
                        experience === level 
                          ? "bg-ml-blue text-white border-ml-blue shadow-lg shadow-blue-100" 
                          : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-ml-yellow text-slate-900 font-black rounded-[2rem] hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>Analisando... <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Encontrar Produto Ideal <ArrowUpRight size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 rounded-[3.5rem] border-2 border-dashed border-slate-200"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                  <Target size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">Aguardando Dados</h3>
                <p className="text-slate-400 font-medium max-w-xs">Preencha as informações ao lado para que nossa IA encontre a melhor oportunidade para você.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center bg-ml-blue rounded-[3.5rem] text-white"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 border-4 border-white/20 border-t-ml-yellow rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-ml-yellow" size={32} />
                </div>
                <h3 className="text-2xl font-black mb-2">{loadingMessages[loadingStep]}</h3>
                <p className="text-blue-100 font-medium max-w-xs">Aguarde enquanto nossa IA processa milhões de dados para você.</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Main Card */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <div className={cn(
                      "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                      result.difficulty === 'Baixa' ? "bg-green-100 text-green-700" :
                      result.difficulty === 'Média' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    )}>
                      <Activity size={12} />
                      Dificuldade: {result.difficulty}
                    </div>
                  </div>

                  <div className="mb-10">
                    <span className="text-ml-blue font-black text-xs uppercase tracking-[0.3em] mb-4 block">Produto Recomendado</span>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{result.name}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-50 p-6 rounded-3xl">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Preço Sugerido</span>
                      <span className="text-2xl font-black text-slate-900">{result.estimatedPrice}</span>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Margem Esperada</span>
                      <span className="text-2xl font-black text-emerald-600">{result.expectedMargin}</span>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Demanda Estimada</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-ml-blue">{result.demand}</span>
                        <TrendingUp size={18} className="text-ml-blue" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-ml-blue" />
                        Por que este produto?
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {result.reason}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Users size={18} className="text-orange-500" />
                        Análise da Concorrência
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed bg-orange-50/30 p-4 rounded-2xl border border-orange-100">
                        {result.competitionDetails}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Megaphone size={18} className="text-ml-blue" />
                        Estratégia de Ads (R$ {budget})
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        {result.adsStrategy}
                      </p>
                    </div>

                    <div className="pt-6">
                      <a 
                        href={result.mlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                      >
                        Ver no Mercado Livre <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Warning Card */}
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
                  <AlertCircle className="text-amber-600 shrink-0" size={24} />
                  <div>
                    <h5 className="text-amber-900 font-black text-sm mb-1 uppercase tracking-tight">Aviso de Risco</h5>
                    <p className="text-amber-700 text-xs font-medium leading-relaxed">
                      Esta análise é baseada em tendências atuais de mercado. O sucesso depende da qualidade do seu anúncio, atendimento e logística. Sempre valide o fornecedor antes de grandes compras.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedAnalysis;
