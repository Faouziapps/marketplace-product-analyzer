import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  TrendingUp, 
  Calculator, 
  Bell, 
  BarChart3, 
  Menu, 
  X,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Search as SearchIcon,
  Plus,
  Zap,
  Target
} from 'lucide-react';
import { cn } from './lib/utils';
import Dashboard from './pages/Dashboard';
import ProductSearch from './pages/ProductSearch';
import TrendAnalysis from './pages/TrendAnalysis';
import ProfitCalculator from './pages/ProfitCalculator';
import Opportunities from './pages/Opportunities';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import PersonalizedAnalysis from './pages/PersonalizedAnalysis';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

interface SidebarItemProps {
  key?: string;
  to: string;
  icon: any;
  label: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem = ({ to, icon: Icon, label, active, collapsed }: SidebarItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
      active 
        ? "bg-ml-blue text-white shadow-lg shadow-blue-200/50" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
    {!collapsed && (
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-semibold text-sm whitespace-nowrap"
      >
        {label}
      </motion.span>
    )}
    {active && !collapsed && (
      <motion.div layoutId="active-pill" className="ml-auto">
        <ChevronRight size={14} />
      </motion.div>
    )}
    {collapsed && active && (
      <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
    )}
  </Link>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Início" },
    { to: "/opportunities", icon: Zap, label: "Oportunidades" },
    { to: "/trends", icon: TrendingUp, label: "Tendências" },
    { to: "/calculator", icon: Calculator, label: "Calculadora" },
    { to: "/reports", icon: BarChart3, label: "Relatórios" },
    { to: "/alerts", icon: Bell, label: "Alertas" },
    { to: "/analysis", icon: Target, label: "Análise IA" },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F5] overflow-hidden font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-500 ease-in-out z-30",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-20 flex items-center px-6 mb-4 bg-ml-yellow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ml-blue rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-100 shrink-0">
              <Zap size={22} />
            </div>
            {!isSidebarCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-black tracking-tight text-slate-900"
              >
                ML<span className="text-ml-blue">Expert</span>
              </motion.span>
            )}
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-hide">
          <div className={cn("px-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest", isSidebarCollapsed && "text-center")}>
            {isSidebarCollapsed ? "•••" : "Menu Principal"}
          </div>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to} 
              collapsed={isSidebarCollapsed} 
            />
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-ml-yellow border-b border-slate-200 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ml-blue rounded-lg flex items-center justify-center text-white">
            <Zap size={18} />
          </div>
          <span className="font-black text-lg tracking-tighter">ML<span className="text-ml-blue">Expert</span></span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-900"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-white z-30 p-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl font-bold text-lg",
                  location.pathname === item.to ? "bg-ml-blue text-white" : "bg-slate-50 text-slate-600"
                )}
              >
                <item.icon size={24} />
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
        <header className="hidden md:flex h-20 bg-ml-yellow border-b border-slate-200 items-center justify-between px-10 z-20">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-ml-blue transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Busca rápida..." 
                className="pl-10 pr-4 py-2 bg-white/50 border-transparent border focus:border-ml-blue focus:bg-white rounded-full text-sm outline-none w-64 transition-all"
              />
            </div>
          </div>
                    <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-600 hover:text-ml-blue transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-ml-yellow" />
            </button>
            <div className="h-8 w-px bg-slate-300" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 group-hover:text-ml-blue transition-colors">Faouzi M.</p>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Vendedor Platinum</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-ml-blue flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
                FM
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-[1400px] mx-auto p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Quick Action Button (Mobile) */}
      <button className="md:hidden fixed bottom-8 right-6 w-14 h-14 bg-ml-blue rounded-full text-white shadow-2xl shadow-blue-400 flex items-center justify-center z-40 active:scale-90 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/trends" element={<TrendAnalysis />} />
          <Route path="/calculator" element={<ProfitCalculator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analysis" element={<PersonalizedAnalysis />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
