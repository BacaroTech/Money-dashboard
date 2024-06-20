import { client } from "../dbconnection";

async function queryTest(){
    const result = await client.query('SELECT * FROM flusso')
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return "no dati";
	}
}

export {queryTest}