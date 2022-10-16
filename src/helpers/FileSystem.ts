import fs from "fs";

export interface IFileSystem {
  readFileSync(file: string): string;
  existsSync(path: string): boolean;
  mkdirSync(path: string, options?: fs.MakeDirectoryOptions): void;
  readFileIfExistsSync(
    path: string,
    defaultValue: string | (() => string)
  ): string;
  writeFileSync(
    path: fs.PathLike,
    data: any,
    options?: fs.WriteFileOptions
  ): void;
}

export class FileSystem implements IFileSystem {
  readFileSync(file: string): string {
    return fs.readFileSync(file, {
      encoding: "utf-8",
      flag: "r",
    });
  }
  writeFileSync(
    path: fs.PathLike,
    data: any,
    options?: fs.WriteFileOptions | undefined
  ): void {
    fs.writeFileSync(path, data, options);
  }
  existsSync(path: string): boolean {
    return fs.existsSync(path);
  }
  mkdirSync(path: string, options?: fs.MakeDirectoryOptions): void {
    fs.mkdirSync(path, options);
  }
  readFileIfExistsSync(name: string, _default: (() => string) | string) {
    if (fs.existsSync(name)) {
      return fs.readFileSync(name, "utf-8");
    }
    return typeof _default === "function" ? _default() : _default;
  }
}
