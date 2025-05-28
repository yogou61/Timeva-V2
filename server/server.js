// server/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques de l'application React (après le build)
// Ajustez le chemin selon votre structure de projet
app.use(express.static(path.join(__dirname, '../dist')));

// Vous pouvez ajouter des routes API ici si nécessaire
// Par exemple:
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Route de fallback pour SPA - redirige toutes les requêtes non-API vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});