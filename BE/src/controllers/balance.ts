//controllers/someController.js
import express, { Request, Response } from "express";
let router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("balace");
});

module.exports = router;
