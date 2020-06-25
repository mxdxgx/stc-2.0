import * as express from "express";
import { getManager } from "typeorm";
import { configs } from "../../config/configs";

export class BaseController {
    public async getAll(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        req.log.info(`${new Date()}`);

        const series = await getManager().getRepository('Serie').find();
        res.status(200).send({ api: configs.api, serie: series });
    }
}

export const baseController: BaseController = new BaseController();
