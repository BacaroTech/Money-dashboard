//controllers/someController.js
import express, { Request, Response } from "express";
import { deleteFlow, getAllFlow, getAllFlowForMonth, getFlowById, insertFlow, updateFlow } from "../services/flowService";
import { createFlowTable } from "../models/flowModel";

let router = express.Router();
createFlowTable();

const cors = require('cors');
router.use(cors({
	origin: 'http://localhost:4200'
}));

router.get("/getAll", async (req: Request, res: Response) => {
    res.send(await getAllFlow());
});

router.post("/byID", async (req: Request, res: Response) => {
    res.send(await getFlowById(req.body.id));
});

router.post("/forMonth", async (req: Request, res: Response) => {
    res.send(await getAllFlowForMonth(req.body.date));
});

router.post("/insertFlow", async (req: Request, res: Response) => {
    if(req.body && req.body.length > 0)
        res.send(await insertFlow(req.body[0]));
    else    
        res.status(500).end("Il body della POST è vuoto");
});

router.post("/updateFlow", async (req: Request, res: Response) => {
    if(req.body && req.body.length > 0)
        res.send(await updateFlow(req.body[0]));
    else    
        res.status(500).end("Il body della POST è vuoto");
});

router.post("/deleteID", async (req: Request, res: Response) => {
    res.send(await deleteFlow(req.body));
});

module.exports = router;
