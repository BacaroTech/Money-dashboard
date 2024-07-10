import { client } from "../dbconnection";
import { document } from "../models/balanceModel";

async function getAllDocuments(){
    const result = await client.query('SELECT * FROM bilancio order by data_inserimento ')
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function getDocumentById(id: any){
	const result = await client.query(
		'select b.conto, b2.conto as contoOld, b.contante, b2.contante as contanteold, b.altro, b2.altro as altroOld from bilancio b join bilancio b2 on EXTRACT(MONTH FROM b.data_inserimento)-1 = EXTRACT(MONTH FROM b2.data_inserimento) where b.id = $1 and b.id <> b2.id',
		[id]
	)
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return getDocumentBySingleId(id);
	}
}

async function getDocumentBySingleId(id: any){
	const result = await client.query(
		'select b.conto, b.contante, b.altro from bilancio b where b.id = $1',
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
    const result = await client.query('SELECT * FROM bilancio WHERE data_inserimento >= $1 AND data_inserimento <= $2',
		[piecesDate[0]+'-'+piecesDate[1]+'-01', date]
	)
	if(result.rows && result.rows.length > 0){
		return getDocumentById(result.rows[0].id);
	}else{
		return false;
	}
}

export {getAllDocuments, insertDocument, getAllDocumentByMonth, getDocumentById}