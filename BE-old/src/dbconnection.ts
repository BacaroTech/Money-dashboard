const { Client } = require('pg');
const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'moneydashboard_postgres_db',
	port: '5432',
	database: 'postgres',
});

function connectionDB(){
client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err: any) => {
		console.error('Error connecting to PostgreSQL database', err);
	});
}

export {client, connectionDB}