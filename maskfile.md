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
