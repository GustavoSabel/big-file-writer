import fs from "node:fs";
import { Repository } from "../repository";

const bigArray = Repository.getBigArray();

const file = await fs.promises.open("output-solucao2.txt", "w");

const highWaterMark = 1024 * 1024; // 1MB
const streamWriter = file.createWriteStream({ encoding: "utf-8", highWaterMark });

for (const line of bigArray) {
  streamWriter.write(line);
  if (streamWriter.writableNeedDrain) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.log(`Writed ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(5)} MB`);
  }
}

streamWriter.end()
await new Promise((resolve) => setTimeout(resolve, 100));
console.log(`Writed ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(5)} MB`);