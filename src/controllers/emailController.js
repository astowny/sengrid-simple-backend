const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Ajout de logging pour la clé API (masquée)
const apiKey = process.env.SENDGRID_API_KEY;
console.log('API Key configurée:', apiKey ? `${apiKey.substring(0, 4)}...${apiKey.slice(-4)}` : 'non définie');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ 
      error: 'Les champs email, name et message sont requis' 
    });
  }

  // Logging des emails utilisés
  console.log('Configuration email:', {
    sender: process.env.SENDER_EMAIL,
    recipient: process.env.RECIPIENT_EMAIL
  });

  const msg = {
    to: process.env.RECIPIENT_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: `Nouveau message de ${name}`,
    replyTo: email,
    text: `De: ${email}\n\nNom: ${name}\n\nMessage: ${message}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>De:</strong> ${email}</p>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    // Logging détaillé de l'erreur
    console.error('Erreur SendGrid détaillée:', {
      code: error.code,
      message: error.message,
      errors: error.response?.body?.errors,
      details: JSON.stringify(error.response?.body, null, 2)
    });

    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.response?.body?.errors || error.message
    });
  }
}

module.exports = { sendEmail };
