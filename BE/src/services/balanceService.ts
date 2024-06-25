import { client } from "../dbconnection";
import { document } from "../models/balanceModel";

async function getAllDocuments(){
    const result = await client.query('SELECT * FROM bilancio')
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function getFlowById(id: number){
	const result = await client.query(
		'SELECT * FROM bilancio WHERE id = $1',
		[id]
	)
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function insertDocument(document: document){
	document.id = Math.floor(Math.random() * 1000000);
    const result = await client.query(
		'INSERT INTO public.bilancio(id, data_inserimento, data_ultimo_aggiornamento, conto, contante, altro) VALUES($1, $2, $3, $4, $5, $6)',
		[document.id, document.data_inserimento, document.data_ultimo_aggiornamento, Math.ceil(document.conto), Math.ceil(document.contante), Math.ceil(document.altro)]
	)
	if(result.rowCount > 0){
		return getFlowById(document.id);
	}else{
		return false;
	}
}

export {getAllDocuments, insertDocument}