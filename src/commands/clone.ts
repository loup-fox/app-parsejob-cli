import type { Arguments, Argv } from "yargs";
import { getApi, getFileSystem } from "../inject/index.js";

export const command: string = "clone <parser>";

export const describe: string =
  "Initialize a local parser workspace from ParseJob.";

export async function handler(
  args: Arguments<{
    parser: string;
  }>
): Promise<void> {
  const fs = getFileSystem();
  const api = getApi();
  const parserName = args.parser;
  if (fs.existsSync(`./${parserName}`)) {
    console.log(`Directory ${parserName} already exists.`);
    return;
  }
  const parser = await api.getParser(parserName);
  fs.mkdirSync(`./${parserName}/src`, { recursive: true });
  fs.mkdirSync(`./${parserName}/samples`, { recursive: true });
  fs.writeFileSync(`./${parserName}/src/code.js`, parser.sourceCode ?? "");
  fs.writeFileSync(
    `./${parserName}/src/postScript.js`,
    parser.sourceCodePostParser ?? ""
  );
  fs.writeFileSync(
    `./${parserName}/src/anonymization.js`,
    parser.sourceCodeAnonymization ?? ""
  );
  fs.writeFileSync(
    `./${parserName}/samples/config.pj.json`,
    JSON.stringify({
      parser: parserName,
    })
  );
}

export function builder(yargs: Argv<{}>) {
  return yargs.positional("parser", {
    type: "string",
    demandOption: true,
  });
}
