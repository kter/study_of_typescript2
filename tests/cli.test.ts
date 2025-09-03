import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync } from "fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

function runCli(args: string[], cwd: string): Promise<{ code: number; stdout: string; stderr: string }> {
    return new Promise((resolve) => {
        const ps = spawn(
            "npx",
            ["ts-node", "--esm", "../cli.ts", ...args],
            { cwd, stdio: "pipe" }
          );
        let stdout = "", stderr = "";
        ps.stdout.on("data", (data) => {
            stdout += data.toString();
        });
        ps.stderr.on("data", (data) => {
            stderr += data;
        });
        ps.on("close", (code) => {
            resolve({ code: code ?? 0, stdout, stderr });
        });
    });
}

describe("cli", () => {
    it("should run", async () => {
        const { code, stdout, stderr } = await runCli(["list"], __dirname);
        expect(code).toBe(0);
    });
});