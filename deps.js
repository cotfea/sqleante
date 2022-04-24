export { DB } from "https://deno.land/x/sqlite/mod.ts";
import * as oak from "https://deno.land/x/oak/mod.ts";
import randomInt from "https://deno.land/std@0.136.0/node/_crypto/randomInt.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string/mod.ts";
export const uuid = () =>
  cryptoRandomString({ length: 18, type: "alphanumeric" });

export { oak, randomInt };
