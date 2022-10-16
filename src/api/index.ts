import { IConfig } from "../config.js";
import { Authorizer } from "../helpers/makeAuthorizer.js";
import { makeGetParser } from "./makeGetParser.js";
import { makeSignIn } from "./makeSignIn.js";

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
  };
};
