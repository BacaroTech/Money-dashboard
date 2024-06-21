//controllers/someController.js
import express, { Request, Response } from "express";
import { getAllFlow, insertFlow } from "../services/flowService";
import { createFlowTable } from "../models/flowModel";

let router = express.Router();
createFlowTable()

router.get("/getAll", async (req: Request, res: Response) => {
    res.send(await getAllFlow());
});

router.post("/insertFlow", async (req: Request, res: Response) => {
    if(req.body && req.body.length > 0)
        res.send(await insertFlow(req.body[0]));
    else    
        res.status(500).end("Il body della POST è vuoto");
});

module.exports = router;
