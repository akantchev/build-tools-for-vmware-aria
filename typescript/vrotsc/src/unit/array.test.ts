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
import { copyArray } from "../utilities/array";

describe("copyArray", () => {

    it("copies all elements from source to destination by default", () => {
        const src = [1, 2, 3];
        const dest: number[] = [];
        const result = copyArray(dest, src);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    it("returns the destination array", () => {
        const dest: number[] = [];
        const result = copyArray(dest, [1, 2]);
        assert.strictEqual(result, dest);
    });

    it("appends to an existing destination array", () => {
        const dest = [10];
        copyArray(dest, [20, 30]);
        assert.deepStrictEqual(dest, [10, 20, 30]);
    });

    it("copies from start index to end of array when only start is specified", () => {
        const dest: number[] = [];
        copyArray(dest, [1, 2, 3, 4], 2);
        assert.deepStrictEqual(dest, [3, 4]);
    });

    it("copies from start index to end index (exclusive)", () => {
        const dest: number[] = [];
        copyArray(dest, [1, 2, 3, 4, 5], 1, 4);
        assert.deepStrictEqual(dest, [2, 3, 4]);
    });

    it("copies nothing when start equals end", () => {
        const dest: number[] = [];
        copyArray(dest, [1, 2, 3], 2, 2);
        assert.deepStrictEqual(dest, []);
    });

    it("copies nothing when start equals source length", () => {
        const dest: number[] = [];
        copyArray(dest, [1, 2, 3], 3);
        assert.deepStrictEqual(dest, []);
    });

    it("handles empty source array", () => {
        const dest: number[] = [];
        copyArray(dest, []);
        assert.deepStrictEqual(dest, []);
    });

    it("skips undefined elements in source", () => {
        const src: (number | undefined)[] = [1, undefined, 3];
        const dest: number[] = [];
        copyArray(dest, src as number[]);
        assert.deepStrictEqual(dest, [1, 3]);
    });

    it("end is capped at source length when end exceeds it", () => {
        const dest: number[] = [];
        copyArray(dest, [1, 2, 3], 0, 100);
        assert.deepStrictEqual(dest, [1, 2, 3]);
    });

    it("handles single-element array", () => {
        const dest: number[] = [];
        copyArray(dest, [42]);
        assert.deepStrictEqual(dest, [42]);
    });

    it("copies string elements", () => {
        const dest: string[] = [];
        copyArray(dest, ["a", "b", "c"]);
        assert.deepStrictEqual(dest, ["a", "b", "c"]);
    });
});
