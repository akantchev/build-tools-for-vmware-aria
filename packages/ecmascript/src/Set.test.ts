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
describe("Set", () => {
    const SetClass: typeof Set = System.getModule("com.vmware.pscoe.library.ecmascript").Set().default;

    it("empty set has size 0", () => {
        const set = new SetClass();
        expect(set.size).toEqual(0);
    });

    it("constructor initializes set from values array", () => {
        const set = new SetClass(["a", "b", "c"]);
        expect(set.size).toEqual(3);
        expect(set.has("a")).toBe(true);
        expect(set.has("b")).toBe(true);
        expect(set.has("c")).toBe(true);
    });

    it("constructor with null does not throw and creates empty set", () => {
        const set = new SetClass(null);
        expect(set.size).toEqual(0);
    });

    it("add inserts a new value and increments size", () => {
        const set = new SetClass();
        set.add("value1");
        expect(set.size).toEqual(1);
        expect(set.has("value1")).toBe(true);
    });

    it("add does not increment size for duplicate value", () => {
        const set = new SetClass();
        set.add("value1");
        set.add("value1");
        expect(set.size).toEqual(1);
    });

    it("add returns the set for chaining", () => {
        const set = new SetClass();
        const result = set.add("x");
        expect(result).toBe(set);
    });

    it("has returns true for existing value", () => {
        const set = new SetClass(["hello"]);
        expect(set.has("hello")).toBe(true);
    });

    it("has returns false for missing value", () => {
        const set = new SetClass();
        expect(set.has("missing")).toBe(false);
    });

    it("delete removes existing value and decrements size", () => {
        const set = new SetClass(["a", "b"]);
        const result = set.delete("a");
        expect(result).toBe(true);
        expect(set.size).toEqual(1);
        expect(set.has("a")).toBe(false);
    });

    it("delete returns false for missing value", () => {
        const set = new SetClass();
        const result = set.delete("missing");
        expect(result).toBe(false);
    });

    it("clear removes all values and resets size to 0", () => {
        const set = new SetClass(["a", "b", "c"]);
        set.clear();
        expect(set.size).toEqual(0);
        expect(set.has("a")).toBe(false);
    });

    it("values returns all values", () => {
        const set = new SetClass(["x", "y"]);
        const values = set.values();
        expect(values.length).toEqual(2);
        expect(values.indexOf("x") >= 0).toBe(true);
        expect(values.indexOf("y") >= 0).toBe(true);
    });

    it("keys returns the same as values", () => {
        const set = new SetClass(["a", "b"]);
        const keys = set.keys();
        const values = set.values();
        expect(keys).toEqual(values);
    });

    it("entries returns pairs where key equals value", () => {
        const set = new SetClass(["foo"]);
        const entries = set.entries();
        expect(entries.length).toEqual(1);
        expect(entries[0][0]).toEqual("foo");
        expect(entries[0][1]).toEqual("foo");
    });

    it("forEach iterates over all values", () => {
        const set = new SetClass(["a", "b", "c"]);
        const collected: string[] = [];
        set.forEach((value) => {
            collected.push(value);
        });
        expect(collected.length).toEqual(3);
    });

    it("forEach passes same value for both arguments and set as third argument", () => {
        const set = new SetClass(["z"]);
        set.forEach((value, value2, s) => {
            expect(value).toEqual(value2);
            expect(s).toBe(set);
        });
    });

    it("numeric values are supported", () => {
        const set = new SetClass([1, 2, 3]);
        expect(set.has(1)).toBe(true);
        expect(set.has(2)).toBe(true);
        expect(set.size).toEqual(3);
    });

    it("chaining add calls builds the set correctly", () => {
        const set = new SetClass();
        set.add("a").add("b").add("c");
        expect(set.size).toEqual(3);
    });
});
