import * as config from "config";
import * as git from "git-rev-sync";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class Configuration {
  private readonly apiVersion: string;
  private readonly domainPath: string;
  private readonly ormConfig: PostgresConnectionOptions;
  private readonly revHash: string;
  private readonly revDate: string;

  constructor() {
    this.apiVersion = <string>config.get("api.version");
    this.revHash = git.long();
    this.revDate = new Date(git.date()).toISOString();
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

  get revision(): any {
    return {
      hash: this.revHash,
      date: this.revDate,
    };
  }
}

export let configs: Configuration = new Configuration();
