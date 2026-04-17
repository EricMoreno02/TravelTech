const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let wishlist = [];

app.get('/wishlist', (req, res) => res.json(wishlist));

app.post('/wishlist', (req, res) => {
    const { country } = req.body;
    if (country && !wishlist.includes(country)) wishlist.push(country);
    res.json({ message: "Afegit a la llista de desitjos", wishlist });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Service Wishlist funcionant al port ${PORT}`));