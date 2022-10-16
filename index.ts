#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import * as Login from "./src/commands/login.js";
import * as Clone from "./src/commands/clone.js";

yargs(hideBin(process.argv))
  .command(Login.command, Login.describe, Login.builder, Login.handler)
  .command(Clone.command, Clone.describe, Clone.builder, Clone.handler)
  .strict()
  .help()
  .alias({ h: "help" }).argv;
