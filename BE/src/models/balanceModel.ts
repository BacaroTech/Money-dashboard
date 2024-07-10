import { client } from "../dbconnection";

type document = {
    id: number,
    data_inserimento: string,
    data_ultimo_aggiornamento: string,
    conto: number,
    contante: number
    altro: number
}

const balance:string = "CREATE TABLE IF NOT EXISTS public.bilancio ( id int NOT NULL, data_inserimento date NULL, data_ultimo_aggiornamento date NULL, conto float8 NULL,	contante float8 NULL, altro float8 NULL, CONSTRAINT bilancio_pk PRIMARY KEY (id));";

async function createBalanceTable(){
    await client.query((balance), (err: any, res:any) => {
        if(err){
            console.error(err);
        }else{
            console.log("CREAZIONE BILANCIO RIUSCITA", res);
        }
    });
}

export {document, createBalanceTable}

