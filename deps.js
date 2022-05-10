import { cryptoRandomString } from "https://deno.land/x/crypto_random_string/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
export const uuid = () =>
  cryptoRandomString({ length: 18, type: "alphanumeric" });


export const db = new DB("testDB.db")

export * as oak from "https://deno.land/x/oak/mod.ts";
export { default as randomInt } from "https://deno.land/std@0.136.0/node/_crypto/randomInt.ts";
export { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
