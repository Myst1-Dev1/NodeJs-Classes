require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/db.js');

const bookRoutes = require('./routes/book-routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDb();

//middleware -> express.json()
app.use(express.json());

//routes here
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log('Server is running on', PORT);
});