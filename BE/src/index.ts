import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectionDB } from "./dbconnection";

/******* CONNECTION ON DATABASE *******/
connectionDB()

/******* START SERVER *******/
dotenv.config();
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

/******* SET UP CONTROLLERS *******/
let balance = require('./controllers/balanceController');
app.use('/balance', balance);
let flow = require('./controllers/flowController');
app.use('/flow', flow);

/******* TEST SERVER NODE IF IS WORKING *******/
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});