# Tasks For RetWutter

## hello

```sh
echo Hello World!!!
```

## run-dev

```sh
podman run --rm -ti \
  --name dev \
  -v $(pwd):/root/dev \
  -p 9000:9000 \
  mooxe/dev \
  /bin/bash
```

## run

```bash
deno run  -A ./src/main.js
```


## deno cache

```bash
export DENO_DIR=./.deno
deno cache ./src/dbsql/main.test.js
```

## install sqlite3

```bash
apt install -y sqlite3
export DENO_SQLITE_PATH=/usr/lib/x86_64-linux-gnu/libsqlite3.so.0
```
