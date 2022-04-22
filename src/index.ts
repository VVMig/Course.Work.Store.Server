import * as dotenv from 'dotenv';
import { ApiRoutes } from './constants/Routes';
import apiErrorMiddleware from './middlewares/ApiErrorMiddleware';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/productRoutes';
import { swaggerApiOptions } from './configs/swagger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import userRouter from './routes/userRoutes';

const PORT = process.env.PORT ?? 3000;
const app = express();

dotenv.config();

const swaggerSpec = swaggerJSDoc(swaggerApiOptions);

app.use(cors());
app.use(express.json({
    limit: '25mb'
}));

//Routes
app.use(ApiRoutes.USER, userRouter);
app.use(ApiRoutes.PRODUCT, productRouter);
app.use(ApiRoutes.DOCS, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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
