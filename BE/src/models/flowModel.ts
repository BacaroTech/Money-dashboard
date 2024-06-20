import { client } from "../dbconnection";

const flow:string = "CREATE TABLE IF NOT EXISTS public.flusso (data_inserimento timestamp NULL, id integer NOT NULL, natura varchar NULL, categoria varchar NULL,	importo integer NULL, CONSTRAINT flusso_pk PRIMARY KEY (id));";

export default async function createFlowTable(){
    await client.query(
        (flow), 
        (err: any, res:any) => {
        console.log(err, res);
    });
}