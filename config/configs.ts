import * as config from "config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class Configuration {
  private readonly apiVersion: string;
  private readonly domainPath: string;
  private readonly ormConfig: PostgresConnectionOptions;

  constructor() {
    this.apiVersion = <string>config.get("api.version");
    this.domainPath = <string>config.get("api.domainPath");
    this.ormConfig = <PostgresConnectionOptions>config.get("typeorm");
  }

  get api(): any {
    return {
      version: this.apiVersion,
      domainPath: this.domainPath,
    };
  }

  get typeOrm(): PostgresConnectionOptions {
    return this.ormConfig;
  }
}

export let configs: Configuration = new Configuration();
