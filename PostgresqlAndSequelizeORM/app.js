require('dotenv').config({ path:`${process.cwd()}/.env` });
const express = require('express');

const authRouter = require('./routes/authRoute.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Woohoo! REST APIS are working'
    });
});

app.use('/api/v1/auth', authRouter);

app.use((req, res) => {
    res.status(404).json({
        status: 'Failed',
        message: 'Route not found'
    });
});
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is now listening on port', PORT);
});