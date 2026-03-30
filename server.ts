import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Mercado Livre API Proxy (In a real app, this would call the actual ML API)
  app.get("/api/ml/trends", (req, res) => {
    // Simulated data for top trends
    res.json([
      { id: 1, name: "Fone de Ouvido Bluetooth", demand: 95, competition: 20, margin: 35 },
      { id: 2, name: "Smartwatch Series 9", demand: 88, competition: 45, margin: 25 },
      { id: 3, name: "Cadeira Gamer Ergonômica", demand: 75, competition: 15, margin: 40 },
      { id: 4, name: "Teclado Mecânico RGB", demand: 82, competition: 30, margin: 30 },
      { id: 5, name: "Mochila Impermeável", demand: 90, competition: 10, margin: 50 },
    ]);
  });

  app.get("/api/ml/search", (req, res) => {
    const { q } = req.query;
    // Simulated search results
    res.json({
      query: q,
      results: [
        { id: 'ML1', title: `${q} Premium`, price: 150, sellers: 12, rating: 4.5, sales: 500 },
        { id: 'ML2', title: `${q} Econômico`, price: 80, sellers: 35, rating: 4.2, sales: 1200 },
        { id: 'ML3', title: `${q} Importado`, price: 210, sellers: 5, rating: 4.8, sales: 150 },
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
