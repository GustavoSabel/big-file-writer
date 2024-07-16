import fs from "node:fs";
import { Repository } from "../repository";

const bigArray = Repository.getBigArray();

const file = await fs.promises.open("output-solucao3.txt", "w");

const highWaterMark = 1024 * 1024; // 1MB
const streamWriter = file.createWriteStream({ encoding: "utf-8", highWaterMark });

streamWriter.cork()
for (const line of bigArray) {
  streamWriter.write(line);
  if (streamWriter.writableNeedDrain) {
    streamWriter.uncork()
    await new Promise((resolve) => setTimeout(resolve, 0));
    streamWriter.cork()
    console.log(`Written ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(5)} MB`);
  }
}

streamWriter.uncork()
streamWriter.end()
await new Promise((resolve) => setTimeout(resolve, 100));
console.log(`End with ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(5)} MB`);