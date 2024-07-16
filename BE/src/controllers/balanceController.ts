//controllers/someController.js
import express, { Request, Response } from "express";
import { getAllDocumentByMonth, getAllDocuments, getDocumentById, insertDocument, updateDocument } from "../services/balanceService";
import { createBalanceTable } from "../models/balanceModel";

let router = express.Router();
createBalanceTable();

const cors = require('cors');
router.use(cors({
	origin: 'http://localhost:4200'
}));

router.get("/getAll", async (req: Request, res: Response) => {
    res.send(await getAllDocuments());
});

router.post("/insertDocument", async (req: Request, res: Response) => {
    if(req.body && req.body.length > 0)
        res.send(await insertDocument(req.body[0]));
    else    
        res.status(500).end("Il body della POST è vuoto");
});

router.post("/byID", async (req: Request, res: Response) => {
    res.send(await getDocumentById(req.body.id));
});

router.put("/updateID", async (req: Request, res: Response) => {
    res.send(await updateDocument(req.body));
});

router.post("/byMonth", async (req: Request, res: Response) => {
    res.send(await getAllDocumentByMonth(req.body.date));
});

module.exports = router;
