/*-
 * #%L
 * vrotsc
 * %%
 * Copyright (C) 2023 - 2024 VMware
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
import { StringBuilderClass } from "../utilities/stringBuilder";

describe("StringBuilderClass", () => {

    it("starts with empty content", () => {
        const sb = new StringBuilderClass();
        assert.strictEqual(sb.toString(), "");
    });

    it("append adds text to the builder", () => {
        const sb = new StringBuilderClass();
        sb.append("hello");
        assert.strictEqual(sb.toString(), "hello");
    });

    it("multiple appends concatenate text", () => {
        const sb = new StringBuilderClass();
        sb.append("hello").append(" ").append("world");
        assert.strictEqual(sb.toString(), "hello world");
    });

    it("appendLine adds a newline character", () => {
        const sb = new StringBuilderClass("\n");
        sb.append("line1").appendLine();
        assert.strictEqual(sb.toString(), "line1\n");
    });

    it("appendLine after content starts next append on a new line", () => {
        const sb = new StringBuilderClass("\n");
        sb.append("line1").appendLine().append("line2");
        assert.strictEqual(sb.toString(), "line1\nline2");
    });

    it("indent increases indentation level for subsequent appends", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.append("root").appendLine().indent().append("indented");
        assert.strictEqual(sb.toString(), "root\n\tindented");
    });

    it("unindent decreases indentation level", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.indent().append("level1").appendLine().unindent().append("level0");
        assert.strictEqual(sb.toString(), "\tlevel1\nlevel0");
    });

    it("double indent adds two indentation tokens per line", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.append("start").appendLine().indent().indent().append("deep");
        assert.strictEqual(sb.toString(), "start\n\t\tdeep");
    });

    it("indentation is only applied once per line start", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.append("root").appendLine().indent().append("a").append("b").append("c");
        assert.strictEqual(sb.toString(), "root\n\tabc");
    });

    it("custom newLine token is used by appendLine", () => {
        const sb = new StringBuilderClass("\r\n", "  ");
        sb.append("line1").appendLine().append("line2");
        assert.strictEqual(sb.toString(), "line1\r\nline2");
    });

    it("custom indent token is used when indented", () => {
        const sb = new StringBuilderClass("\n", "  ");
        sb.append("root").appendLine().indent().append("child");
        assert.strictEqual(sb.toString(), "root\n  child");
    });

    it("indent and unindent return this for chaining", () => {
        const sb = new StringBuilderClass();
        const indentResult = sb.indent();
        assert.strictEqual(indentResult, sb);
        const unindentResult = sb.unindent();
        assert.strictEqual(unindentResult, sb);
    });

    it("append returns this for chaining", () => {
        const sb = new StringBuilderClass();
        const result = sb.append("x");
        assert.strictEqual(result, sb);
    });

    it("appendLine returns this for chaining", () => {
        const sb = new StringBuilderClass();
        const result = sb.appendLine();
        assert.strictEqual(result, sb);
    });

    it("indentation is applied on first append after indent() is called", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.indent().append("first");
        assert.strictEqual(sb.toString(), "\tfirst");
    });

    it("appendContent adds text without triggering indentation", () => {
        const sb = new StringBuilderClass("\n", "\t");
        sb.appendLine().appendContent("raw");
        assert.strictEqual(sb.toString(), "\nraw");
    });
});
