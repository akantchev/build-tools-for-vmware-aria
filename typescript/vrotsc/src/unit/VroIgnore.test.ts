/*-
 * #%L
 * vrotsc
 * %%
 * Copyright (C) 2023 - 2025 VMware
 * %%
 * Build Tools for VMware Aria
 * Copyright 2023 VMware, Inc.
 *
 * This product is licensed to you under the BSD-2 license (the "License"). You may not use this product except in compliance with the BSD-2 License.
 *
 * This product may include a number of subcomponents with separate copyright notices and license terms. Your use of these subcomponents is subject to the terms and conditions of the subcomponent's license, as noted in the LICENSE file.
 * #L%
 */
import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import VroIgnore, { DEFAULT_CONTENT, VroIgnoreCategory } from "../utilities/VroIgnore";

function makeTempDir(): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), "vroignore-test-"));
}

function cleanTempDir(dir: string): void {
    try {
        fs.rmSync(dir, { recursive: true, force: true });
    } catch (_) {
        // ignore cleanup errors
    }
}

describe("VroIgnore", () => {

    describe("filePathMatchesGlob (static)", () => {

        it("returns false for empty patterns array", () => {
            assert.strictEqual(VroIgnore.filePathMatchesGlob("/some/path/file.ts", []), false);
        });

        it("returns true when file path matches a glob pattern", () => {
            const filePath = path.resolve("/some/path/file.ts");
            assert.strictEqual(VroIgnore.filePathMatchesGlob(filePath, ["**/*.ts"]), true);
        });

        it("returns false when file path does not match any pattern", () => {
            const filePath = path.resolve("/some/path/file.ts");
            assert.strictEqual(VroIgnore.filePathMatchesGlob(filePath, ["**/*.js"]), false);
        });

        it("negative pattern overrides a matching positive pattern", () => {
            const filePath = path.resolve("/some/path/file.ts");
            assert.strictEqual(VroIgnore.filePathMatchesGlob(filePath, ["**/*.ts", "!**/*.ts"]), false);
        });

        it("returns true when positive pattern matches and no negative pattern matches", () => {
            const filePath = path.resolve("/project/src/action.ts");
            assert.strictEqual(VroIgnore.filePathMatchesGlob(filePath, ["**/*.ts", "!**/test/**"]), true);
        });

        it("returns false when only a negative pattern is provided and it matches", () => {
            const filePath = path.resolve("/project/src/file.ts");
            assert.strictEqual(VroIgnore.filePathMatchesGlob(filePath, ["!**/*.ts"]), false);
        });
    });

    describe("constructor", () => {
        let tmpDir: string;

        beforeEach(() => {
            tmpDir = makeTempDir();
        });

        afterEach(() => {
            cleanTempDir(tmpDir);
        });

        it("resolves the path to an absolute path", () => {
            const relPath = "some/path/.vroignore";
            const instance = new VroIgnore(relPath);
            assert.ok(path.isAbsolute(instance.resolvedPath));
        });

        it("sets resolvedPath to the absolute version of the provided path", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            assert.strictEqual(instance.resolvedPath, path.resolve(filePath));
        });
    });

    describe("getPatterns", () => {
        let tmpDir: string;

        beforeEach(() => {
            tmpDir = makeTempDir();
        });

        afterEach(() => {
            cleanTempDir(tmpDir);
        });

        it("creates a default .vroignore file when none exists", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            instance.getPatterns();
            assert.ok(fs.existsSync(filePath), "default .vroignore file should be created");
        });

        it("returns non-empty patterns when called without category filter", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const patterns = instance.getPatterns();
            assert.ok(Array.isArray(patterns));
            assert.ok(patterns.length > 0, "default patterns should not be empty");
        });

        it("default patterns include TestHelpers entries from DEFAULT_CONTENT", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const patterns = instance.getPatterns("TestHelpers");
            assert.ok(patterns.includes("**/*_helper.js"), "should include default helper pattern");
        });

        it("returns patterns only for the specified category", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const allPatterns = instance.getPatterns();
            const testHelpersPatterns = instance.getPatterns("TestHelpers");
            assert.ok(testHelpersPatterns.length <= allPatterns.length);
        });

        it("returns no duplicate patterns", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const patterns = instance.getPatterns();
            const unique = Array.from(new Set(patterns));
            assert.deepStrictEqual(patterns.sort(), unique.sort());
        });

        it("reads existing .vroignore file and includes custom patterns", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const customContent = `# Testing\n**/custom-exclude/**`;
            fs.writeFileSync(filePath, customContent, "utf8");
            const instance = new VroIgnore(filePath);
            const patterns = instance.getPatterns("Testing");
            assert.ok(patterns.includes("**/custom-exclude/**"), "custom pattern should be present");
        });

        it("combines patterns from multiple categories", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const combined = instance.getPatterns("TestHelpers", "General");
            const testHelpers = instance.getPatterns("TestHelpers");
            const general = instance.getPatterns("General");
            testHelpers.forEach(p => {
                assert.ok(combined.includes(p), `pattern '${p}' from TestHelpers should be in combined`);
            });
            general.forEach(p => {
                assert.ok(combined.includes(p), `pattern '${p}' from General should be in combined`);
            });
        });
    });

    describe("shouldIgnore", () => {
        let tmpDir: string;

        beforeEach(() => {
            tmpDir = makeTempDir();
        });

        afterEach(() => {
            cleanTempDir(tmpDir);
        });

        it("returns true for a file matching a TestHelpers pattern", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const helperFile = path.resolve(tmpDir, "my_helper.js");
            assert.strictEqual(instance.shouldIgnore(helperFile, "TestHelpers"), true);
        });

        it("returns false for a file that does not match any pattern", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const instance = new VroIgnore(filePath);
            const regularFile = path.resolve(tmpDir, "regularAction.ts");
            assert.strictEqual(instance.shouldIgnore(regularFile, "Testing"), false);
        });

        it("returns true when file matches a custom General pattern", () => {
            const filePath = path.join(tmpDir, ".vroignore");
            const customContent = `# General\n**/ignored/**`;
            fs.writeFileSync(filePath, customContent, "utf8");
            const instance = new VroIgnore(filePath);
            const ignoredFile = path.resolve(tmpDir, "ignored", "file.ts");
            assert.strictEqual(instance.shouldIgnore(ignoredFile), true);
        });
    });

    describe("DEFAULT_CONTENT", () => {

        it("contains the General category header", () => {
            assert.ok(DEFAULT_CONTENT.includes("# General"));
        });

        it("contains the Packaging category header", () => {
            assert.ok(DEFAULT_CONTENT.includes("# Packaging"));
        });

        it("contains the Compilation category header", () => {
            assert.ok(DEFAULT_CONTENT.includes("# Compilation"));
        });

        it("contains the Testing category header", () => {
            assert.ok(DEFAULT_CONTENT.includes("# Testing"));
        });

        it("contains the TestHelpers category header", () => {
            assert.ok(DEFAULT_CONTENT.includes("# TestHelpers"));
        });

        it("includes the default helper pattern", () => {
            assert.ok(DEFAULT_CONTENT.includes("**/*_helper.js"));
        });
    });
});
