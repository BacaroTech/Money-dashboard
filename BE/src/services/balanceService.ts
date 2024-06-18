import { client } from "../dbconnection";

async function queryTest(){
    const result = await client.query('SELECT * FROM users')
	console.log(result.rows)
	if(result.rows && result.rows.lenght > 0){
		return result.rows;
	}else{
		return "nessuna informazione";
	}
}

export {queryTest}