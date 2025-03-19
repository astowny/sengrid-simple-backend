const { sendEmail } = require('./controllers/emailController');

function configureRoutes(app) {
  app.post('/api/send-email', sendEmail);
  
  // Route de test
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });
}

module.exports = { configureRoutes };