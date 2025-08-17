import fs from "fs-extra";
import { CalmUiJson } from "../types/calmui-json.type";
import path from "path";

export const getCalmUiJson = (): {
  calmUiJson: CalmUiJson;
  fileExtension: "ts" | "js";
} => {
  const cwd = process.cwd();
  const calmUiJson: CalmUiJson = fs.readJsonSync(path.join(cwd, "calmui.json"));
  const fileExtension = calmUiJson.typescript ? "ts" : "js";
  return { calmUiJson, fileExtension };
};
