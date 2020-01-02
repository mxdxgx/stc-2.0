import * as config from "config";

export class Configuration {
  private readonly apiVersion: string;

  constructor() {
    this.apiVersion = <string>config.get("api.version");
  }

  get api(): any {
    return {
      version: this.apiVersion,
    };
  }
}

export let configs: Configuration = new Configuration();
