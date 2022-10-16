import { Parser, StatusLog } from "../api/index.js";
import { Authorizer } from "./makeAuthorizer.js";
import jwt from "jwt-decode";
import { TokenData } from "./TokenData.js";

export const makeLogFactory = (auth: Authorizer) => async (parser: Parser) => {
  return (
    note: string,
    options: { status?: string; autolog?: boolean } = {}
  ): StatusLog => {
    const [token] = auth();
    const { email } = TokenData.parse(jwt(token));
    return {
      date: new Date(),
      email,
      autolog: options.autolog === undefined ? false : options.autolog,
      status: options.status ?? parser.status,
      note,
    };
  };
};
