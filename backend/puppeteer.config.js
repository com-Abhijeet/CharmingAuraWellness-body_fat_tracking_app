import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const puppeteerConfig = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};

export default puppeteerConfig;
