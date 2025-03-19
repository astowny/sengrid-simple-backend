const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { configureRoutes } = require('./routes');
require('dotenv').config();

// Validation des variables d'environnement requises
const requiredEnvVars = ['SENDGRID_API_KEY', 'SENDER_EMAIL', 'RECIPIENT_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Load and modify Swagger document
const swaggerDocument = YAML.load('./swagger.yaml');
swaggerDocument.servers = [{
  url: `http://localhost:${port}`,
  description: 'Local development server'
}];

// Configuration CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 heures
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Headers additionnels pour la sécurité et CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Gestion explicite des requêtes OPTIONS (pre-flight)
app.options('*', cors(corsOptions));

// Swagger UI with dynamic port
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuration des routes
configureRoutes(app);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log(`Documentation API disponible sur http://localhost:${port}/api-docs`);
});
