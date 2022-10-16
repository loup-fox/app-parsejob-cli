import { IConfig } from "../config.js";

export const makeAuthorizer =
  (config: IConfig) => (): [token: string, config: IConfig] => {
    const token = config.token;
    if (!token) {
      throw new Error("Not authorized");
    }
    return [token, config];
  };
export type Authorizer = ReturnType<typeof makeAuthorizer>;
