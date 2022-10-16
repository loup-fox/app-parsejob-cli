import { Parser, StatusLog } from "../api/index.js";
import { Authorizer } from "./makeAuthorizer.js";

export const makeLogFactory = (auth: Authorizer) => async (parser: Parser) => {
  return (
    note: string,
    options: { status?: string; autolog?: boolean } = {}
  ): StatusLog => {
    const { email } = auth();
    return {
      date: new Date(),
      email,
      autolog: options.autolog === undefined ? false : options.autolog,
      status: options.status ?? parser.status,
      note,
    };
  };
};
