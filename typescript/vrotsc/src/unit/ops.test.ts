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
import { noop, returnUndefined, notImplemented } from "../utilities/ops";

describe("ops", () => {

    describe("noop", () => {
        it("can be called with no arguments", () => {
            assert.doesNotThrow(() => noop());
        });

        it("can be called with null argument", () => {
            assert.doesNotThrow(() => noop(null));
        });

        it("can be called with undefined argument", () => {
            assert.doesNotThrow(() => noop(undefined));
        });

        it("can be called with an object argument", () => {
            assert.doesNotThrow(() => noop({ key: "value" }));
        });

        it("returns undefined", () => {
            assert.strictEqual(noop(), undefined);
        });
    });

    describe("returnUndefined", () => {
        it("returns undefined", () => {
            assert.strictEqual(returnUndefined(), undefined);
        });

        it("can be called without throwing", () => {
            assert.doesNotThrow(() => returnUndefined());
        });
    });

    describe("notImplemented", () => {
        it("throws an Error", () => {
            assert.throws(() => notImplemented(), Error);
        });

        it("throws with message 'Not implemented'", () => {
            assert.throws(() => notImplemented(), (err: Error) => {
                assert.strictEqual(err.message, "Not implemented");
                return true;
            });
        });

        it("never returns (type assertion via throw)", () => {
            let reached = false;
            try {
                notImplemented();
                reached = true;
            } catch (_) {
                // expected
            }
            assert.strictEqual(reached, false);
        });
    });
});
