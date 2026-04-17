const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let visited = [];

app.get('/visited', (req, res) => res.json(visited));

app.post('/visited', (req, res) => {
    const { country } = req.body;
    if (country && !visited.includes(country)) visited.push(country);
    res.json({ message: "Marcat com a visitat", visited });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Service Visited funcionant al port ${PORT}`));