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

ssh -i "$PEM_PATH" -o StrictHostKeyChecking=no "${REMOTE_USER}@${REMOTE_HOST}" "bash -s" <<EOF
set -euo pipefail
export PATH="\$HOME/.bun/bin:\$PATH"
if ! command -v bun >/dev/null 2>&1; then
  # bun 설치 스크립트는 unzip/curl이 필요함.
  # 서버에 깨진 패키지(예: nginx)가 있어도 배포가 멈추지 않도록 설치 실패는 허용하고,
  # 이후 실제로 unzip/curl이 존재하는지만 검증한다.
  if ! command -v unzip >/dev/null 2>&1 || ! command -v curl >/dev/null 2>&1; then
    if command -v apt-get >/dev/null 2>&1; then
      sudo apt-get install -y unzip curl || true
    elif command -v dnf >/dev/null 2>&1; then
      sudo dnf install -y unzip curl || true
    elif command -v yum >/dev/null 2>&1; then
      sudo yum install -y unzip curl || true
    fi
  fi
  if ! command -v unzip >/dev/null 2>&1 || ! command -v curl >/dev/null 2>&1; then
    echo "[ERROR] unzip/curl 설치 실패로 bun을 설치할 수 없습니다." >&2
    exit 1
  fi
  curl -fsSL https://bun.sh/install | bash
  export PATH="\$HOME/.bun/bin:\$PATH"
fi
cd "${REMOTE_DIR}"
bun install --frozen-lockfile
bun run build || true
EOF
