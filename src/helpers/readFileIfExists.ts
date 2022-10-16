import fs from "fs";

export const readFileIfExists = async (
  name: string,
  _default: (() => string) | string
) => {
  if (fs.existsSync(name)) {
    return fs.readFileSync(name, "utf-8");
  }
  return typeof _default === "function" ? _default() : _default;
};
