# check-my-ip

A Deno script to check if your IP is changed.

## Building

0. Ensure you have deno installed
1. `deno bundle --unstable ./main.ts > bundle.js`
2. That's it!

## Running

```
deno run --allow-net --allow-read=./log.json --allow-write=./log.json dist/bundle.js --file=./log.json
```

Replace `./log.json` with the path to which you wish to store the logs.

The script will enter a new entry in the JSON file if your IP has changed since the last time you ran the script.
