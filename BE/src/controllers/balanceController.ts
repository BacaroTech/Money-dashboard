//controllers/someController.js
import express, { Request, Response } from "express";
import { queryTest } from "../services/balanceService";
import createBalanceTable from "../models/balanceModel";

let router = express.Router();
createBalanceTable();

const cors = require('cors');
router.use(cors({
	origin: 'http://localhost:4200'
}));

router.get("/", async (req: Request, res: Response) => {
    res.send("Test query: " + await queryTest())
});

module.exports = router;
