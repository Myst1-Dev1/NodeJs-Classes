const express = require('express');
const app = express();

// root route
app.get('/', (req, res) => {
    res.send('Welcome to our home page');
});

//get all products

const products = [
    {
        id:1,
        label:'Product 1'
    },
    {
        id:2,
        label:'Product 2'
    },
    {
        id:3,
        label:'Product 3'
    },
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const getSingleProduct = products.find(product => product.id === id);

    if(getSingleProduct) {
        res.json(getSingleProduct);
    }else {
        res.status(404).json({message: 'Product is not found! Please try with a differente id'});
    }

})

const port = 3000;

app.listen(port, () => {
    console.log('Server listen on port', port);
});