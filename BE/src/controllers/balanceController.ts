//controllers/someController.js
import express, { Request, Response } from "express";
import { queryTest } from "../services/balanceService";

let router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.send("Test query: " + await queryTest())
});

module.exports = router;
