import { Authorizer } from "../helpers/makeAuthorizer.js";
import { Parser } from "./types/Parser.js";

export const makePutParser =
  (auth: Authorizer) => async (parserName: string, body: Partial<Parser>) => {
    const [token, config] = auth();
    const response = await fetch(`${config.baseUrl}/parser/${parserName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return Parser.parse(data);
  };
