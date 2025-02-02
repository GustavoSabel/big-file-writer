import fs from "node:fs";
import { Repository } from "../repository";

const bigArray = Repository.getBigArray();

const file = await fs.promises.open("output.txt", "w");

const streamWriter = file.createWriteStream({ encoding: "utf-8" });

let pendentLines = 0;
for (const line of bigArray) {
  streamWriter.write(line);
  if (pendentLines++ === 100_000) {
    pendentLines = 0;
    console.log(`Writing lines`);
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
