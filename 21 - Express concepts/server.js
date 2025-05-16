require('dotenv').config();
const express = require('express');
const { configureCors } = require('./config/corsConfig.js');
const { requestLogged ,addTimeStamp } = require('./middleware/customMiddleware.js');
const { globalErrorHandler } = require('./middleware/errorHandler.js')
const { urlVersioning } = require('./middleware/apiVersioning.js');
const { createBasicLimiter } = require('./middleware/rateLimiting.js');

const itemRoutes = require('./routes/items-routes.js');

const app = express();
const PORT = process.env.PORT;

//express json middleware
app.use(requestLogged);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use(express.json());

app.use(urlVersioning('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log('Server is running on', PORT);
});