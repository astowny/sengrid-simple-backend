const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ 
      error: 'Les champs email, name et message sont requis' 
    });
  }

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
    console.error('Erreur SendGrid:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email' 
    });
  }
}

module.exports = { sendEmail };