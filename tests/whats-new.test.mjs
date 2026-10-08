import assert from "node:assert/strict";
import test from "node:test";
import { addUtcDays, isInsideWindow, stableHash } from "../scripts/whats-new-lib.mjs";

test("keeps an item for exactly fourteen calendar days", () => {
  assert.equal(isInsideWindow("2026-10-07", "2026-10-07", 14), true);
  assert.equal(isInsideWindow("2026-10-07", "2026-10-20", 14), true);
  assert.equal(isInsideWindow("2026-10-07", "2026-10-21", 14), false);
  assert.equal(addUtcDays("2026-10-07", 14), "2026-10-21");
});

test("does not display future-dated publication entries", () => {
  assert.equal(isInsideWindow("2026-10-08", "2026-10-07", 14), false);
});

test("hashes public records independently of object key order", () => {
  assert.equal(stableHash({ a: 1, b: { c: 2 } }), stableHash({ b: { c: 2 }, a: 1 }));
});
