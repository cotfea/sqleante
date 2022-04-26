FROM \
  microdeb/bullseye

RUN set -eux \
; mkdir -p /root/deno \
; mkdir -p /root/deno-dir

ENV \
  DENO_DIR=/root/deno-dir

COPY \
  ./build/sqleante /root/deno/sqleante

ENV \
  DENO_DIR=/tmp/deno-dir

EXPOSE \
  9000

CMD \
  [ "/root/deno/sqleante" ]
