import type { Arguments, Argv } from "yargs";
import { getApi, getFileSystem } from "../inject/index.js";
import { Parser } from "../api/index.js";

export const command: string = "clone <parser>";

export const describe: string =
  "Initialize a local parser workspace from ParseJob.";

export async function handler(
  args: Arguments<{
    parser: string;
  }>
): Promise<void> {
  const api = getApi();
  const fs = getFileSystem();
  const body: Partial<Parser> = {};
  body.sourceCode = fs.readFileIfExistsSync(`./src/code.js`, "");
  body.sourceCodeAnonymization = fs.readFileIfExistsSync(
    "./src/anonymization.js",
    ""
  );
  body.sourceCodePostParser = fs.readFileIfExistsSync("./postScript.js", "");
  await api.putParser(args.parser, body);
}

export function builder(yargs: Argv<{}>) {
  return yargs.positional("parser", {
    type: "string",
    demandOption: true,
  });
}
