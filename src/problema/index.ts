import fs from "node:fs";
import { Repository } from "../repository";

const data = Repository.getBigArray();

const file = await fs.promises.open("output.txt", "w");

const streamWriter = file.createWriteStream({ encoding: "utf-8" });

for (const item of data) {
  streamWriter.write(item);
}
