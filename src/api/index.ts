import { IConfig } from "../config.js";
import { Authorizer } from "../helpers/makeAuthorizer.js";
import { makeGetParser } from "./makeGetParser.js";
import { makePutParser } from "./makePutParser.js";
import { makeSignIn } from "./makeSignIn.js";

export * from "./types/index.js";

export const makeApi = ({
  config,
  auth,
}: {
  config: IConfig;
  auth: Authorizer;
}) => {
  return {
    signIn: makeSignIn(config),
    getParser: makeGetParser(auth),
    putParser: makePutParser(auth),
  };
};
