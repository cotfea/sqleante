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

## build

```sh
rm -rf ./build
mkdir -p ./build
deno bundle ./src/main.js ./build/bundle.js
deno compile --allow-net --allow-read --allow-write \
  -o ./build/sqleante ./build/bundle.js
```

## build-image

```sh
buildah bud --no-cache -t mooxe/sqleante
```

## run-image

```sh
podman run --rm --name sqleante \
  -p 9000:9000 \
  -v ./build:/tmp/sqleante \
  --read-only -v /tmp:/tmp \
  localhost/mooxe/sqleante
```

## image-tag-push

```sh
podman tag localhost/mooxe/sqleante ccr.ccs.tencentyun.com/mooxe/sqleante
podman push ccr.ccs.tencentyun.com/mooxe/sqleante
podman tag localhost/mooxe/sqleante ccr.ccs.tencentyun.com/mooxe/sqleante:`date +%y%m%d%H%M`
podman push ccr.ccs.tencentyun.com/mooxe/sqleante:`date +%y%m%d%H%M`
```

----

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
