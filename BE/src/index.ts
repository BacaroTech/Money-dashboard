import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const { Client } = require('pg');


/******* CONNECTION ON DATABASE *******/
const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: '5432',
	database: 'postgres',
});

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err: any) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

/******* START SERVER *******/
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

/******* SET UP CONTROLLERS *******/
let balance = require('./controllers/balance');
app.use('/balance', balance);

/******* TEST SERVER NODE IF IS WORKING *******/
app.get("/", (req: Request, res: Response) => {
	client.query('SELECT * FROM users', (err: any, result: any) => {
		if (err) {
			console.error('Error executing query', err);
		} else {
			console.log('Query result:', result.rows);
		}

		// Close the connection when done
		client
			.end()
			.then(() => {
				console.log('Connection to PostgreSQL closed');
			})
			.catch((err: any) => {
				console.error('Error closing connection', err);
			});
	})
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});