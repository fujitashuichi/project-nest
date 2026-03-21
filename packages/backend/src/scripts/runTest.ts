import * as dotenv from "dotenv"
import { spawnSync } from "node:child_process";
import path from "node:path";
import { styleText } from "node:util";


const envPath = path.join(import.meta.dirname, "../../.env.test");
dotenv.config({ path: envPath });


const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Could not start test because DATABASE_URL was undefined");
else process.stdout.write(styleText(["green"], "ENV>> DATABASE_URL successfully loaded"));


const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

// コマンド失敗時に強制throeする関数
const execute = (args: string[]) => {
  const result = spawnSync(npxCommand, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) throw new Error(`Command failed>> cleanUpDb failed with status ${result.status}`);
};


const runCommand = () => {
  try {
    // テスト前にDBをクリーンアップ
    execute(["prisma", "generate", ...process.argv.slice(3)]);
    execute(["prisma", "db", "push", "--config", "./src/prisma.config.ts", ...process.argv.slice(5)]);

    process.stdout.write(styleText(
      ["green"],
      "Init_DB>> successfully cleaned up"
    ));


    // vitest
    const vitest = spawnSync(npxCommand, ['vitest', ...process.argv.slice(2)], {
      shell: true,
      env: { ...process.env }
    });

    if (vitest.status !== 0) {
      process.exitCode = vitest.status ?? 1;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(styleText("red", e.message));
      process.exit(1);
    }
    throw e;
  } finally {
    // DBクリーンアップ
    console.info("Cleaning up database...");
    spawnSync(npxCommand, ["prisma", "migrate", "reset", "--force"], { stdio: "inherit" });
  }
}


runCommand();
