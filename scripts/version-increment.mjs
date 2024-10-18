import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to package.json and .env
const packagePath = path.join(__dirname, '..', 'package.json');
const envPath = path.join(__dirname, '..', '.env');

// Update package.json version
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const versionParts = packageJson.version.split('.').map(Number);

// Increment version
if (versionParts[2] < 9) {
  versionParts[2] += 1; // Increment patch
} else if (versionParts[1] < 9) {
  versionParts[1] += 1; // Increment minor
  versionParts[2] = 0;
} else {
  versionParts[0] += 1; // Increment major
  versionParts[1] = 0;
  versionParts[2] = 0;
}

const newVersion = versionParts.join('.');
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log(`Version updated to ${newVersion}`);

// Update or append version in .env
let envContent = fs.readFileSync(envPath, 'utf8');

// Check if VERSION exists in .env
if (envContent.includes('VITE_APP_VERSION=')) {
  // Update existing version
  envContent = envContent.replace(/VITE_APP_VERSION=.*/g, `VITE_APP_VERSION=${newVersion}`);
} else {
  // Append new version
  envContent += `\nVITE_APP_VERSION=${newVersion}`;
}

fs.writeFileSync(envPath, envContent);
console.log(`.env updated with version ${newVersion}`);

// Automate Git commit and push
try {
  // Add changes to git
  execSync('git add package.json -f');
  
  // Commit changes with a message
  execSync(`git commit -m "chore: bump version to ${newVersion}"`);
  
  // Push changes to the remote repository
  execSync('git push');
  
  console.log('Changes committed and pushed to the repository.');
} catch (error) {
  console.error('Error during git operations:', error.message);
}
