import { parse } from "https://deno.land/std@0.85.0/flags/mod.ts";
import { createStore } from "./store.ts";

async function fetchIp() {
  const res = await fetch("https://icanhazip.com/");

  return (await res.text()).trim();
}

const args = parse(Deno.args);

if (typeof args.file !== "string") {
  throw new Error('Please specifiy a "file" output argument.');
}

const store = createStore(args.file);

const ip = await fetchIp();

await store.registerIp(ip);

console.log("Success");
