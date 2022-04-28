#!/usr/bin/env bash

if [ ! -d '/tmp/sqleante' ]; then
  mkdir /tmp/sqleante
fi

/root/deno/sqleante /tmp/sqleante/sqleante.db
