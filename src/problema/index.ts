import fs from "node:fs";
import { Repository } from "../repository";

const bigArray = Repository.getBigArray();

const file = await fs.promises.open("output-problema.txt", "w");

const streamWriter = file.createWriteStream({ encoding: "utf-8" });

for (const line of bigArray) {
  streamWriter.write(line);
}
