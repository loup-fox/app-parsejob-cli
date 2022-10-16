import path from "path";
import { env } from "node:process";
import { IFileSystem } from "./helpers/FileSystem";
import { z } from "zod";

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

export const BareConfig = z.object({
  baseUrl: z.string(),
  token: z.string().optional(),
  configFile: z.string().optional(),
});
export type BareConfig = z.infer<typeof BareConfig>;

export interface IConfig extends BareConfig {
  set(data: Partial<IConfig>): Promise<void>;
}

export class Config implements IConfig {
  private _config?: BareConfig;

  private constructor(private fs: IFileSystem) {}

  private get config() {
    if (!this._config) {
      this._config = Config.load(this.fs);
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
    Config.write(this.fs, this._config);
    return Promise.resolve();
  }

  private static write(fs: IFileSystem, data?: BareConfig) {
    const json = JSON.stringify(data ?? DEFAULT_DATA, null, 2);
    fs.writeFileSync(CONFIG_FILE, json, "utf-8");
  }

  private static load(fs: IFileSystem): BareConfig {
    if (!fs.existsSync(CONFIG_FILE)) {
      Config.write(fs);
    }
    return BareConfig.parse(JSON.parse(fs.readFileSync(CONFIG_FILE)));
  }
}
