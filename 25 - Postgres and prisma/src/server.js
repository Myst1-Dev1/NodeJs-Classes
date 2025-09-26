require('dotenv').config();
const express = require('express');
const authorRoutes = require('./routes/author-routes.js');
const bookRoutes = require('./routes/book-routes.js');

const app = express();
app.use(express.json());

app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log('Server is now running on port', PORT); });