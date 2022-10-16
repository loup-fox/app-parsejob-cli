import fs from "fs";
import path from "path";
import { env } from "node:process";

const HOME = env.HOME;
if (!HOME) {
  throw new Error(
    "No home directory is set, please set the HOME environment variable in order to store local informations."
  );
}
const CONFIG_FILE = path.resolve(HOME, ".pj-config.json");
const DEFAULT_DATA = {
  baseUrl: "https://parsejobv4api.production.internal.foxapi.xyz/api",
};

export interface IConfig {
  token?: string;
  baseUrl?: string;
  configFile?: string;
  set(data: Partial<IConfig>): Promise<void>;
}

export class Config implements IConfig {
  private _config?: IConfig;

  private get config() {
    if (!this._config) {
      this._config = Config.load();
    }
    return this._config;
  }

  get token() {
    return this.config.token;
  }

  get baseUrl() {
    return this.config.baseUrl;
  }

  set(data: Partial<IConfig>) {
    this._config = Object.assign({}, this.config, data);
    Config.write(this._config);
    return Promise.resolve();
  }

  private static write(data?: IConfig) {
    const json = JSON.stringify(data ?? DEFAULT_DATA, null, 2);
    fs.writeFileSync(CONFIG_FILE, json, "utf-8");
  }

  private static load(): IConfig {
    if (!fs.existsSync(CONFIG_FILE)) {
      Config.write();
    }
    return JSON.parse(
      fs.readFileSync(CONFIG_FILE, {
        encoding: "utf-8",
        flag: "r",
      })
    );
  }
}
