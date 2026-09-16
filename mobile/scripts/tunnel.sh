#!/bin/sh
# Dev server on a public URL (cloudflare quick tunnel) for Expo Go off-LAN.
# Expo's own --tunnel is broken: its shared ngrok account is at its session cap.
set -eu
PORT=8082
LOG=/tmp/cf.log

command -v cloudflared >/dev/null || { echo "cloudflared missing: brew install cloudflared" >&2; exit 1; }
# A stale Metro on the port makes expo ask "Use port 8083 instead?" and the tunnel then points at nothing.
lsof -ti:$PORT | xargs kill 2>/dev/null || true

: >"$LOG"
cloudflared tunnel --url "http://localhost:$PORT" --no-autoupdate >"$LOG" 2>&1 &
CF=$!; trap 'kill $CF 2>/dev/null' EXIT INT TERM

# Wait for the assigned hostname itself, not the "Requesting new quick Tunnel on trycloudflare.com" line.
for _ in $(seq 30); do
  HOST=$(grep -om1 'https://[a-z0-9-]*\.trycloudflare\.com' "$LOG" || true)
  [ -n "$HOST" ] && break
  sleep 1
done
[ -n "${HOST:-}" ] || { echo "cloudflared gave no URL in 30s:" >&2; cat "$LOG" >&2; exit 1; }

# Start expo only once the hostname is published: a phone that asks before
# that caches the miss and cannot reach the tunnel for minutes.
for _ in $(seq 60); do
  curl -sf -m 5 -H 'accept: application/dns-json' \
    "https://cloudflare-dns.com/dns-query?name=${HOST#https://}&type=A" | grep -q '"data"' && break
  sleep 1
done

echo "tunnel: $HOST  (exp://${HOST#https://}:443)"
# :443 is load-bearing: without it expo appends :$PORT, which the tunnel does not serve.
EXPO_PACKAGER_PROXY_URL="$HOST:443" npx expo start --go --port "$PORT"
