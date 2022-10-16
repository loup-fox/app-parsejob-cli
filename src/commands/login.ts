import type { Arguments, Argv } from "yargs";
import I from "inquirer";
import { getApi } from "../inject/index.js";

export const command: string = "login";

export const describe: string = "Login to PJ.";

export async function handler(_: Arguments<{}>): Promise<void> {
  const api = getApi();
  const { email, password } = await I.prompt<{
    email: string;
    password: string;
  }>([
    {
      message: "Enter your username:",
      name: "email",
      type: "string",
    },
    {
      message: "Enter your password:",
      name: "password",
      type: "password",
    },
  ]);
  await api.signIn(email, password).catch(() => {
    process.exit(1);
  });
}

export function builder(yargs: Argv<{}>) {
  return yargs;
}
