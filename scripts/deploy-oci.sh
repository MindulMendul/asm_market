#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="${1:-132.226.238.218}"
REMOTE_USER="${2:-ubuntu}"
REMOTE_DIR="${3:-/asm_market}"
PEM_PATH="${4:-./mindulBot_privateKey2.pem}"

if [ ! -f "$PEM_PATH" ]; then
  echo "PEM file not found: $PEM_PATH"
  exit 1
fi

chmod 600 "$PEM_PATH"

ssh -i "$PEM_PATH" -o StrictHostKeyChecking=no "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR}"

rsync -avz --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  -e "ssh -i $PEM_PATH -o StrictHostKeyChecking=no" \
  ./ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"

ssh -i "$PEM_PATH" -o StrictHostKeyChecking=no "${REMOTE_USER}@${REMOTE_HOST}" "bash -s" <<'EOF'
set -euo pipefail
cd /asm_market
if [ ! -d node_modules ]; then
  npm install
fi
npm run build || true
EOF
