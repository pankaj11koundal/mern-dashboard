import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import generalRoutes from './routes/general.js';
import visualsRoutes from './routes/visuals.js';
import dashboardRoutes from "./routes/dashboard.js";

/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */
app.use('/general', generalRoutes);
app.use('/visuals', visualsRoutes);
app.use('/dashboard', dashboardRoutes)

/*MONGOOSE SETUP*/
const port = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => console.log(`Listening at Port number: ${port}`) );
}).catch((e) => console.log(e))
