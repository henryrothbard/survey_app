require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const index = require('./routes/index');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', dataRoutes);
app.use('', index);

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