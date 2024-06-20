import { client } from "../dbconnection";

const balance:string = "CREATE TABLE IF NOT EXISTS public.bilancio ( id int4 NOT NULL,	datainserimento timestamp NULL,	conto float8 NULL,	contante float8 NULL,	altro float8 NULL,	CONSTRAINT bilancio_pk PRIMARY KEY (id));";

export default async function createBalanceTable(){
    await client.query(
        (balance), 
        (err: any, res:any) => {
        console.log(err, res);
    });
}