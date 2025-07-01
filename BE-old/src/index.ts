import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectionDB } from "./dbconnection";

/******* CONNECTION ON DATABASE *******/
connectionDB()

/******* CONFIGUARATION SERVER *******/
dotenv.config();
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

/******* SET UP CONTROLLERS *******/
let balance = require('./controllers/balanceController');
app.use('/balance', balance);
let flow = require('./controllers/flowController');
app.use('/flow', flow);

/******* SET UP CORS FOR LOCALHOST *******/
const cors = require('cors');
app.use(cors({
	origin: 'http://localhost:4200'
}));

/******* TEST SERVER NODE IF IS WORKING *******/
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});