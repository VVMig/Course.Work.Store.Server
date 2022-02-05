import * as dotenv from 'dotenv';
import { ApiRoutes } from './constants/routes';
import apiErrorMiddleware from './middlewares/ApiErrorMiddleware';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';

const PORT = process.env.PORT ?? 3000;
const app = express();

dotenv.config();

//Routes
app.use(express.json());
app.use(ApiRoutes.USER, userRouter);
app.use(apiErrorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_STRING);

        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
