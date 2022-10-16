import { makeApi } from "../api/index.js";
import { Config } from "../config.js";
import _ from "lodash";
import { makeAuthorizer } from "../helpers/makeAuthorizer.js";
import { IFileSystem, FileSystem } from "../helpers/FileSystem.js";

export const getConfig = _.memoize(() => {
  return new Config();
});
export const getAuthorizer = _.memoize(() => {
  const config = getConfig();
  return makeAuthorizer(config);
});
export const getApi = _.memoize(() => {
  return makeApi({ config: getConfig(), auth: getAuthorizer() });
});
export const getFileSystem = _.memoize((): IFileSystem => {
  return new FileSystem();
});
