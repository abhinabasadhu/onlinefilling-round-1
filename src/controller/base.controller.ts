

import { Request, Response } from "express";

export async function return200(re: Request, res: Response) {
    res.sendStatus(200);
}

export async function returnOk(req: Request, res: Response) {
    res.jsonp("OK");
}