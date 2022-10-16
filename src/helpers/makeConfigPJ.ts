import { z } from "zod";
import { IFileSystem } from "./FileSystem";

export const CONFIG_FILE_NAME = "config.pj.json";

export const ConfigPJ = z.object({
  parser: z.string(),
});
export type ConfigPJ = z.infer<typeof ConfigPJ>;
export const makeConfigPJ =
  ({ fs }: { fs: IFileSystem }) =>
  (): ConfigPJ => {
    try {
      const config = ConfigPJ.parse(
        JSON.parse(fs.readFileSync(`./${CONFIG_FILE_NAME}`))
      );
      return config;
    } catch (e) {
      console.error("This directory is not a ParseJob project directory.");
      throw e;
    }
  };
