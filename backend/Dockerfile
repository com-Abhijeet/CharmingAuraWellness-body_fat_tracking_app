# Use a stable Node.js image with Debian base
FROM node:20-slim

# Set working directory inside container
WORKDIR /app

# Install Puppeteer dependencies (Chromium headless)
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Puppeteer environment variables
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copy package files separately to install dependencies first (improves build caching)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy rest of your backend files
COPY . .

# Expose the backend port (change this if your app uses a different port)
EXPOSE 3000

# Start app using native ES modules
CMD ["node", "index.mjs"]
