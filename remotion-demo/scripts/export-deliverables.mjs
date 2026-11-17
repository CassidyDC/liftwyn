import { spawnSync } from "node:child_process";
import console from "node:console";
import { fileURLToPath, URL } from "node:url";

const media = fileURLToPath(new URL("../../docs/media/demo/", import.meta.url));
const run = (args) => {
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with ${result.status}`);
};

console.info("Exporting WebM...");
run([
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  `${media}liftwyn-demo.mp4`,
  "-c:v",
  "libvpx-vp9",
  "-b:v",
  "0",
  "-crf",
  "26",
  "-row-mt",
  "1",
  "-threads",
  "4",
  "-deadline",
  "good",
  "-cpu-used",
  "4",
  "-an",
  `${media}liftwyn-demo.webm`,
]);
console.info("Exporting the title-card poster...");
run([
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  `${media}liftwyn-demo.mp4`,
  "-ss",
  "1",
  "-frames:v",
  "1",
  "-update",
  "1",
  `${media}liftwyn-demo-poster.png`,
]);
console.info(`Demo deliverables saved in ${media}`);
