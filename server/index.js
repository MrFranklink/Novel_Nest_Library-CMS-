const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./src/db/db');
const bookRoutes = require('./src/routes/bookRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', bookRoutes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
