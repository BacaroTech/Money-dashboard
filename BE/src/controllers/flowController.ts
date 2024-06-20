//controllers/someController.js
import express, { Request, Response } from "express";
import { queryTest } from "../services/flowService";
import createFlowTable from "../models/flowModel";

let router = express.Router();
createFlowTable()

router.get("/", async (req: Request, res: Response) => {
    res.send("Test query: " + await queryTest())
});

module.exports = router;
