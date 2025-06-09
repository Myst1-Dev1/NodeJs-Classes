require('dotenv').config({ path:`${process.cwd()}/.env` });
const express = require('express');

const authRouter = require('./routes/authRoute.js');
const projectRouter = require('./routes/projectRoute.js');
const userRouter = require('./routes/userRoute.js');

const catchAsync = require('./utils/catchAsync.js');
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/user', userRouter);

app.use(
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is now listening on port', PORT);
});