require('dotenv').config();
const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', dataRoutes);

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});