# SendGrid Simple Backend

Backend simple pour l'envoi d'emails avec SendGrid.

## Configuration

### Variables d'environnement

Copiez le fichier `.env.example` vers `.env` et configurez les variables suivantes :

```env
# Server Configuration
PORT=3000                                    # Port du serveur (optionnel, défaut: 3000)

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here  # Clé API SendGrid (requis)

# Email Configuration
SENDER_EMAIL=your-verified-sender@example.com # Email vérifié dans SendGrid (requis)
RECIPIENT_EMAIL=recipient@example.com         # Email qui recevra les messages (requis)
```

### SendGrid Setup

1. Créez un compte sur [SendGrid](https://sendgrid.com/)
2. Générez une clé API dans Settings > API Keys
3. Vérifiez votre domaine d'envoi dans Settings > Sender Authentication
4. Copiez la clé API dans votre fichier `.env`

## Installation

```bash
# Installation des dépendances
npm install

# Génération de la documentation Swagger
npm run swagger-autogen

# Démarrage en développement
npm run dev

# Démarrage en production
npm start
```

## Documentation API

La documentation Swagger est disponible à l'adresse :
http://localhost:3000/api-docs

## Endpoints

- `GET /api/health` - Vérification de l'état du serveur
- `POST /api/send-email` - Envoi d'un email
