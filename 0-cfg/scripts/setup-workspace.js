import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../');
const srcDir = path.join(projectRoot, '1-src');
const wellKnownDir = path.join(srcDir, '.well-known', 'appspecific');
const configPath = path.join(wellKnownDir, 'com.chrome.devtools.json');

// Ensure directory exists
if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
}

// Generate or Update Config
let uuid = 'e8a9d1c0-0000-0000-0000-123456789abc'; // Default/Fixed UUID for consistency

// Preserve UUID if file exists
if (fs.existsSync(configPath)) {
    try {
        const existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (existingConfig.workspace && existingConfig.workspace.uuid) {
            uuid = existingConfig.workspace.uuid;
        }
    } catch (e) {
        // ignore corrupt file
    }
} else {
    // Generate random UUID if newly creating? 
    // Actually, keeping a static UUID per project is often fine, 
    // but if you want unique ones: 
    // uuid = crypto.randomUUID();
}

const config = {
    workspace: {
        root: srcDir.split(path.sep).join('/'), // Ensure forward slashes for Chrome
        uuid: uuid
    }
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log(`[Chrome DevTools Workspace] Configured for absolute path: ${config.workspace.root}`);
