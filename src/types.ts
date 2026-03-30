export interface Product {
  id: string | number;
  name: string;
  title?: string;
  price: number;
  demand: number;
  competition: number;
  margin: number;
  sellers?: number;
  rating?: number;
  sales?: number;
}

export interface TrendData {
  date: string;
  mlVolume: number;
  googleVolume: number;
}

export interface CalculationResult {
  netMargin: number;
  unitCost: number;
  totalProfit: number;
  roi: number;
}
