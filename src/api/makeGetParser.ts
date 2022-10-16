import { Authorizer } from "../helpers/makeAuthorizer.js";
import { Parser } from "./types/Parser.js";

export const makeGetParser =
  (auth: Authorizer) => async (parserName: string) => {
    const [token, config] = auth();
    const response = await fetch(`${config.baseUrl}/parser/${parserName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return Parser.parse(data);
  };
