import fs from "fs";
import type { Arguments, Argv } from "yargs";
import { getApi } from "../inject/index.js";
import { Parser } from "../api/index.js";
import { readFileIfExists } from "../helpers/readFileIfExists.js";

export const command: string = "clone <parser>";

export const describe: string =
  "Initialize a local parser workspace from ParseJob.";

export async function handler(
  args: Arguments<{
    parser: string;
  }>
): Promise<void> {
  const api = getApi();
  const body: Partial<Parser> = {};
  body.sourceCode = await readFileIfExists(`./src/code.js`, "");
  body.sourceCodeAnonymization = await readFileIfExists(
    "./src/anonymization.js",
    ""
  );
  body.sourceCodePostParser = await readFileIfExists("./postScript.js", "");
}

export function builder(yargs: Argv<{}>) {
  return yargs.positional("parser", {
    type: "string",
    demandOption: true,
  });
}
