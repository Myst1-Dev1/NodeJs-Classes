require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./routes/product-routes.js');
const bookRoutes = require('./routes/book-routes.js');

//connect to our database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Mongodb connected successfully'))
.catch((e) => console.log(e));

//use middlewares
app.use(express.json());

app.use("/products", productRoutes);
app.use("/reference", bookRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is now running on', process.env.PORT);
});