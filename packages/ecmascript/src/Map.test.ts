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
describe("Map", () => {
    const MapClass: typeof Map = System.getModule("com.vmware.pscoe.library.ecmascript").Map().default;

    it("empty map has size 0", () => {
        const map = new MapClass();
        expect(map.size).toEqual(0);
    });

    it("constructor initializes map from entries array", () => {
        const map = new MapClass([["a", 1], ["b", 2]]);
        expect(map.size).toEqual(2);
        expect(map.get("a")).toEqual(1);
        expect(map.get("b")).toEqual(2);
    });

    it("constructor with null does not throw and creates empty map", () => {
        const map = new MapClass(null);
        expect(map.size).toEqual(0);
    });

    it("set adds a new key-value pair and increments size", () => {
        const map = new MapClass();
        map.set("key1", "value1");
        expect(map.size).toEqual(1);
        expect(map.get("key1")).toEqual("value1");
    });

    it("set updates existing key without incrementing size", () => {
        const map = new MapClass();
        map.set("key1", "value1");
        map.set("key1", "updated");
        expect(map.size).toEqual(1);
        expect(map.get("key1")).toEqual("updated");
    });

    it("set returns the map for chaining", () => {
        const map = new MapClass();
        const result = map.set("key", "value");
        expect(result).toBe(map);
    });

    it("get returns undefined for missing key", () => {
        const map = new MapClass();
        expect(map.get("missing")).toBeUndefined();
    });

    it("has returns true for existing key", () => {
        const map = new MapClass();
        map.set("key1", "value1");
        expect(map.has("key1")).toBe(true);
    });

    it("has returns false for missing key", () => {
        const map = new MapClass();
        expect(map.has("missing")).toBe(false);
    });

    it("delete removes existing key and decrements size", () => {
        const map = new MapClass();
        map.set("key1", "value1");
        const result = map.delete("key1");
        expect(result).toBe(true);
        expect(map.size).toEqual(0);
        expect(map.has("key1")).toBe(false);
    });

    it("delete returns false for missing key", () => {
        const map = new MapClass();
        const result = map.delete("missing");
        expect(result).toBe(false);
    });

    it("clear removes all entries and resets size to 0", () => {
        const map = new MapClass([["a", 1], ["b", 2], ["c", 3]]);
        map.clear();
        expect(map.size).toEqual(0);
        expect(map.has("a")).toBe(false);
    });

    it("keys returns all keys", () => {
        const map = new MapClass([["a", 1], ["b", 2]]);
        const keys = map.keys();
        expect(keys.length).toEqual(2);
        expect(keys.indexOf("a") >= 0).toBe(true);
        expect(keys.indexOf("b") >= 0).toBe(true);
    });

    it("values returns all values", () => {
        const map = new MapClass([["a", 10], ["b", 20]]);
        const values = map.values();
        expect(values.length).toEqual(2);
        expect(values.indexOf(10) >= 0).toBe(true);
        expect(values.indexOf(20) >= 0).toBe(true);
    });

    it("entries returns all key-value pairs", () => {
        const map = new MapClass([["a", 1]]);
        const entries = map.entries();
        expect(entries.length).toEqual(1);
        expect(entries[0][0]).toEqual("a");
        expect(entries[0][1]).toEqual(1);
    });

    it("forEach iterates over all entries", () => {
        const map = new MapClass([["a", 1], ["b", 2]]);
        const collected: [string, number][] = [];
        map.forEach((value, key) => {
            collected.push([key, value]);
        });
        expect(collected.length).toEqual(2);
    });

    it("forEach passes map as third argument to callback", () => {
        const map = new MapClass([["x", 42]]);
        map.forEach((value, key, m) => {
            expect(m).toBe(map);
        });
    });

    it("numeric keys are supported", () => {
        const map = new MapClass([[1, "one"], [2, "two"]]);
        expect(map.get(1)).toEqual("one");
        expect(map.get(2)).toEqual("two");
        expect(map.has(1)).toBe(true);
        expect(map.size).toEqual(2);
    });

    it("set and get with numeric key", () => {
        const map = new MapClass<number, string>();
        map.set(42, "answer");
        expect(map.get(42)).toEqual("answer");
    });
});
