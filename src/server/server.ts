import * as bodyParser from "body-parser";
import * as express from "express";
import * as pinoExpress from "express-pino-logger";
import * as pino from "pino";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { typeOrmConfig } from "../../config/orm.config";
import { RoutesBuilder } from "../router/routes";
import { constants } from "../utils/constants";

export const logger: pino.Logger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: constants.IS_DEVELOPMENT,
});

const appLogger: pinoExpress.HttpLogger = pinoExpress({ logger });

logger.debug(typeOrmConfig);

createConnection(typeOrmConfig)
  .then(async (connection) => {
    const app: express.Application = express();
    const port = process.env.EXPRESS_PORT || 3000;

    const routes: RoutesBuilder = new RoutesBuilder();
    routes.buildApiRoutes();

    app.use(appLogger);
    app.use(routes.router);
    app.use(bodyParser.json());

    app.listen(port, () => {
      logger.info(
        `server started at http://localhost:${port}\nwith db connection ${connection.name}`
      );
    });
  })
  .catch((connectionError) => {
    logger.error(
      `Could not connect to database, with error : ${connectionError}`
    );
  });
