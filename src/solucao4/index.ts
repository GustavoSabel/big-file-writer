import fs from "node:fs";
import { Repository } from "../repository";

const bigArray = Repository.getBigArray();

const file = await fs.promises.open("output-solucao4.txt", "w");

const highWaterMark = 1024 * 1024; // 1MB
const streamWriter = file.createWriteStream({ encoding: "utf-8", highWaterMark });

streamWriter.on('drain', () => {
  console.log(`Written ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(10)} MB`)
})
streamWriter.on('finish', () => {
  console.log(`End with ${(streamWriter.bytesWritten / 1024 / 1024).toFixed(10)} MB`)
})

for (const line of bigArray) {
  const ok = streamWriter.write(line);
  if (!ok) {
    await new Promise(resolve => streamWriter.once('drain', resolve))
  }
}

streamWriter.close();
await file.close();

