import express, { Express, NextFunction, Request, Response } from "express";

const app : Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
    startTime? : number;
}

//middleware -> add startTime to request object
app.use((req : CustomRequest, res : Response, next : NextFunction) => {
    req.startTime = Date.now();
    next();
});

interface User {
    name : string;
    email : string;
}

app.get('/', (req : Request, res : Response) => {
    res.send('Hello. Typescript with express');
});

app.post('/user', (req : Request<{}, {}, User>, res : Response ) => {
    const { name, email } = req.body;
    res.json({
        message: `User created ${name} ${email}`,
    });
});

//users based on id
app.get('/users/:id', (req:Request<{ id: string | any }> , res:Response) => {
    const {id} = req.params.id;
    res.json({
        userId : id
    })
})

app.listen(port, () => {
    console.log('Server is now running on', port);
});