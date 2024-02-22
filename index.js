const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// Les routes
app.use('/api/titres/', require('./src/routes/titre.route.js'))

app.get('/api', (req, res) => {
    res.send('Message de bienvenue à l\'api de pokemon');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
