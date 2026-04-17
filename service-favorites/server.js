const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Molt important pel multi-cloud!
app.use(express.json());

let favorites = [];

app.get('/favorites', (req, res) => res.json(favorites));

app.post('/favorites', (req, res) => {
    const { country } = req.body;
    if (country && !favorites.includes(country)) favorites.push(country);
    res.json({ message: "Afegit a preferits", favorites });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Service Favorites funcionant al port ${PORT}`));