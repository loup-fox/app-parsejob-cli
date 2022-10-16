import { z } from "zod";
import { IConfig } from "../config.js";

export const SignInResponse = z.object({
  token: z.string(),
});

export const makeSignIn =
  (config: IConfig) => async (email: string, password: string) => {
    const response = await fetch(`${config.baseUrl}/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const { token } = SignInResponse.parse(await response.json());
    await config.set({ token });
  };
