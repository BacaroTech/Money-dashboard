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

async function getDocumentById(id: any){
	console.log(id);
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
		return getDocumentById(document.id);
	}else{
		return false;
	}
}

async function getAllDocumentByMonth(date:string) {
	let piecesDate =  date.split('-');
	console.log(piecesDate)
    const result = await client.query('SELECT * FROM bilancio WHERE data_inserimento >= $1 AND data_inserimento <= $2',
		[piecesDate[0]+'-'+piecesDate[1]+'-01', date]
	)
	if(result.rows && result.rows.length > 0){
		console.log(result.rows[0].id)
		return getDocumentById(result.rows[0].id);
	}else{
		return false;
	}
}

export {getAllDocuments, insertDocument, getAllDocumentByMonth, getDocumentById}