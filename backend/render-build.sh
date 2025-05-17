#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install
# npx puppeteer browsers install chrome
# npm run build  # Uncomment if your project has a build step

# Puppeteer Chromium caching fix (optional and safe)
if [[ -d "$XDG_CACHE_HOME/puppeteer" ]]; then
  echo "...Copying Puppeteer Cache from Build Cache"
  mkdir -p "$PUPPETEER_CACHE_DIR"
  cp -R "$XDG_CACHE_HOME/puppeteer/"* "$PUPPETEER_CACHE_DIR" || true
else
  echo "...No Puppeteer cache found to copy"
fi
