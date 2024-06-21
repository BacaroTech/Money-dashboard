import { client } from "../dbconnection";

//PG query = https://node-postgres.com/apis/result
async function queryTest(){
    const result = await client.query('SELECT * FROM bilancio')
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

export {queryTest}