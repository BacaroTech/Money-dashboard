import { client } from "../dbconnection";
import { flow } from "../models/flowModel";

async function getAllFlow(){
    const result = await client.query('SELECT * FROM flusso')
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function getFlowById(id: number){
	const result = await client.query(
		'SELECT * FROM flusso WHERE id = $1',
		[id]
	)
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function getAllFlowForMonth(date: string){
	
	let piecesDate =  date.split('-');
	//return [piecesDate[0]+'-'+piecesDate[1]+'-01', date];
    const result = await client.query('SELECT * FROM flusso WHERE data_inserimento >= $1 AND data_inserimento <= $2',
		[piecesDate[0]+'-'+piecesDate[1]+'-01', date]
	)
	if(result.rows && result.rows.length > 0){
		return result.rows;
	}else{
		return [];
	}
}

async function insertFlow(flow: flow){
	flow.id = Math.floor(Math.random() * 1000000);
    const result = await client.query(
		'INSERT INTO public.flusso (data_inserimento, id, natura, categoria, importo) VALUES($1, $2, $3, $4, $5);',
		[flow.date, flow.id, flow.nature, flow.category, Math.ceil(flow.import)]
	)
	if(result.rowCount > 0){
		return getFlowById(flow.id);
	}else{
		return false;
	}
}

export {getAllFlow, insertFlow, getAllFlowForMonth, getFlowById}