/*-
 * #%L
 * ecmascript
 * %%
 * Copyright (C) 2023 VMware
 * %%
 * Build Tools for VMware Aria
 * Copyright 2023 VMware, Inc.
 * 
 * This product is licensed to you under the BSD-2 license (the "License"). You may not use this product except in compliance with the BSD-2 License.  
 * 
 * This product may include a number of subcomponents with separate copyright notices and license terms. Your use of these subcomponents is subject to the terms and conditions of the subcomponent's license, as noted in the LICENSE file.
 * #L%
 */
describe("Shims", () => {
    const Shims = System.getModule("com.vmware.pscoe.library.ecmascript").Shims().default;

    describe("stringStartsWith", () => {
        it("returns true when string starts with search", () => {
            expect(Shims.stringStartsWith("hello world", "hello")).toBe(true);
        });

        it("returns false when string does not start with search", () => {
            expect(Shims.stringStartsWith("hello world", "world")).toBe(false);
        });

        it("returns true for empty search string", () => {
            expect(Shims.stringStartsWith("hello", "")).toBe(true);
        });

        it("respects position parameter", () => {
            expect(Shims.stringStartsWith("hello world", "world", 6)).toBe(true);
        });

        it("returns false when position pushes past the start", () => {
            expect(Shims.stringStartsWith("hello", "hello", 1)).toBe(false);
        });
    });

    describe("stringEndsWith", () => {
        it("returns true when string ends with search", () => {
            expect(Shims.stringEndsWith("hello world", "world")).toBe(true);
        });

        it("returns false when string does not end with search", () => {
            expect(Shims.stringEndsWith("hello world", "hello")).toBe(false);
        });

        it("returns true for empty search string", () => {
            expect(Shims.stringEndsWith("hello", "")).toBe(true);
        });

        it("respects strLen parameter", () => {
            expect(Shims.stringEndsWith("hello world", "hello", 5)).toBe(true);
        });
    });

    describe("stringIncludes", () => {
        it("returns true when string contains search", () => {
            expect(Shims.stringIncludes("hello world", "world")).toBe(true);
        });

        it("returns false when string does not contain search", () => {
            expect(Shims.stringIncludes("hello world", "xyz")).toBe(false);
        });

        it("returns false when start pushes past the match", () => {
            expect(Shims.stringIncludes("hello world", "hello", 1)).toBe(false);
        });

        it("returns false when search is longer than remaining string", () => {
            expect(Shims.stringIncludes("hi", "hello", 0)).toBe(false);
        });

        it("returns true with start=0 by default", () => {
            expect(Shims.stringIncludes("abc", "b")).toBe(true);
        });
    });

    describe("stringRepeat", () => {
        it("repeats string the given number of times", () => {
            expect(Shims.stringRepeat("ab", 3)).toEqual("ababab");
        });

        it("returns empty string when count is 0", () => {
            expect(Shims.stringRepeat("ab", 0)).toEqual("");
        });

        it("returns the original string when count is 1", () => {
            expect(Shims.stringRepeat("x", 1)).toEqual("x");
        });

        it("throws TypeError for null input", () => {
            expect(() => Shims.stringRepeat(null, 1)).toThrowError(TypeError);
        });
    });

    describe("stringPadStart", () => {
        it("pads the start of string with spaces by default", () => {
            expect(Shims.stringPadStart("5", 3)).toEqual("  5");
        });

        it("pads the start of string with provided padString", () => {
            expect(Shims.stringPadStart("5", 4, "0")).toEqual("0005");
        });

        it("returns original string when targetLength is not greater than string length", () => {
            expect(Shims.stringPadStart("hello", 3)).toEqual("hello");
        });

        it("cycles through padString when it is shorter than needed padding", () => {
            expect(Shims.stringPadStart("9", 5, "01")).toEqual("0101" + "9");
        });
    });

    describe("stringPadEnd", () => {
        it("pads the end of string with spaces by default", () => {
            expect(Shims.stringPadEnd("5", 3)).toEqual("5  ");
        });

        it("pads the end of string with provided padString", () => {
            expect(Shims.stringPadEnd("5", 4, "0")).toEqual("5000");
        });

        it("returns original string when targetLength is not greater than string length", () => {
            expect(Shims.stringPadEnd("hello", 3)).toEqual("hello");
        });
    });

    describe("arrayFind", () => {
        it("returns first element matching predicate", () => {
            const result = Shims.arrayFind([1, 2, 3, 4], x => x > 2);
            expect(result).toEqual(3);
        });

        it("returns undefined when no element matches", () => {
            const result = Shims.arrayFind([1, 2, 3], x => x > 10);
            expect(result).toBeUndefined();
        });

        it("returns first match when multiple elements match", () => {
            const result = Shims.arrayFind([5, 10, 15], x => x >= 10);
            expect(result).toEqual(10);
        });
    });

    describe("arrayFindIndex", () => {
        it("returns index of first element matching predicate", () => {
            const result = Shims.arrayFindIndex([10, 20, 30], x => x === 20);
            expect(result).toEqual(1);
        });

        it("returns -1 when no element matches", () => {
            const result = Shims.arrayFindIndex([1, 2, 3], x => x > 100);
            expect(result).toEqual(-1);
        });
    });

    describe("arrayFill", () => {
        it("fills a range of array with the given value", () => {
            const arr = [1, 2, 3, 4, 5];
            Shims.arrayFill(arr, 0, 1, 3);
            expect(arr).toEqual([1, 0, 0, 4, 5]);
        });

        it("returns the modified array", () => {
            const arr = [1, 2, 3];
            const result = Shims.arrayFill(arr, 9, 0, 2);
            expect(result).toBe(arr);
        });
    });

    describe("arrayIncludes", () => {
        it("returns true when element is present", () => {
            expect(Shims.arrayIncludes([1, 2, 3], 2)).toBe(true);
        });

        it("returns false when element is not present", () => {
            expect(Shims.arrayIncludes([1, 2, 3], 5)).toBe(false);
        });

        it("returns false for empty array", () => {
            expect(Shims.arrayIncludes([], 1)).toBe(false);
        });

        it("handles NaN search element", () => {
            expect(Shims.arrayIncludes([1, NaN, 3], NaN)).toBe(true);
        });
    });

    describe("arrayFrom", () => {
        it("returns a copy of an array", () => {
            const original = [1, 2, 3];
            const result = Shims.arrayFrom(original);
            expect(result).toEqual([1, 2, 3]);
        });

        it("applies mapFunction when provided", () => {
            const result = Shims.arrayFrom([1, 2, 3], x => x * 2);
            expect(result).toEqual([2, 4, 6]);
        });

        it("converts a string to array of characters", () => {
            const result = Shims.arrayFrom("abc");
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    describe("arrayOf", () => {
        it("returns an array of the provided arguments", () => {
            const result = Shims.arrayOf(1, 2, 3);
            expect(result).toEqual([1, 2, 3]);
        });

        it("returns empty array when called with no arguments", () => {
            const result = Shims.arrayOf();
            expect(result).toEqual([]);
        });
    });

    describe("objectAssign", () => {
        it("copies properties from source to target", () => {
            const target = { a: 1 };
            const result = Shims.objectAssign(target, { b: 2 }, { c: 3 });
            expect(result.a).toEqual(1);
            expect(result.b).toEqual(2);
            expect(result.c).toEqual(3);
        });

        it("returns the target object", () => {
            const target = {};
            const result = Shims.objectAssign(target, { x: 1 });
            expect(result).toBe(target);
        });

        it("throws TypeError for null target", () => {
            expect(() => Shims.objectAssign(null, { a: 1 })).toThrowError(TypeError);
        });

        it("throws TypeError for undefined target", () => {
            expect(() => Shims.objectAssign(undefined, { a: 1 })).toThrowError(TypeError);
        });

        it("later sources overwrite earlier ones", () => {
            const result = Shims.objectAssign({}, { x: 1 }, { x: 2 });
            expect(result.x).toEqual(2);
        });
    });

    describe("objectEntries", () => {
        it("returns an array of key-value pairs", () => {
            const entries = Shims.objectEntries({ a: 1, b: 2 });
            expect(entries.length).toEqual(2);
            expect(entries).toContain(jasmine.arrayContaining(["a", 1]) as any);
        });

        it("returns empty array for empty object", () => {
            expect(Shims.objectEntries({})).toEqual([]);
        });
    });

    describe("objectValues", () => {
        it("returns all values of the object", () => {
            const values = Shims.objectValues({ a: 1, b: "two", c: true });
            expect(values.length).toEqual(3);
            expect(values.indexOf(1) >= 0).toBe(true);
            expect(values.indexOf("two") >= 0).toBe(true);
        });

        it("returns empty array for empty object", () => {
            expect(Shims.objectValues({})).toEqual([]);
        });
    });

    describe("spreadArrays", () => {
        it("merges multiple arrays into one", () => {
            const result = Shims.spreadArrays([1, 2], [3, 4], [5]);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it("returns empty array when no arguments provided", () => {
            const result = Shims.spreadArrays();
            expect(result).toEqual([]);
        });

        it("handles single array", () => {
            const result = Shims.spreadArrays([1, 2, 3]);
            expect(result).toEqual([1, 2, 3]);
        });
    });
});
