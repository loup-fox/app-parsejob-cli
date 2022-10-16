import { Authorizer } from "../helpers/makeAuthorizer.js";
import { Parser } from "./types/Parser.js";

export const makeGetParser =
  (auth: Authorizer) => async (parserName: string, sampleNum: number) => {
    const [token, config] = auth();
    const response = await fetch(
      `${config.baseUrl}/parser/${parserName}/sample/${sampleNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.dir(data);
    return Parser.parse(data);
  };
