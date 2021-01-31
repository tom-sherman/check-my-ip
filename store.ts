import { exists } from "https://deno.land/std@0.85.0/fs/mod.ts";

export interface Schema {
  ips: Array<{
    ip: string;
    timestamp: string;
  }>;
}

export function createStore(location: string) {
  return {
    async registerIp(ip: string) {
      const stat = await exists(location) && (await Deno.stat(location)).isFile


      const store: Schema = stat ? JSON.parse(await Deno.readTextFile(location)) : { ips: [] };

      const mostRecentIp = store.ips[store.ips.length - 1]?.ip ?? null;

      const newIps = mostRecentIp === ip ? store.ips : store.ips.concat({
        ip,
        timestamp: new Date().toJSON(),
      });

      await Deno.writeTextFile(
        location,
        JSON.stringify({
          ...store,
          ips: newIps,
        }),
      );
    },
  };
}
