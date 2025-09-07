const fetch = require("node-fetch");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

// Simple fetcher for JSON APIs
async function getJson(url, options = {}) {
  let res = await fetch(url, options);
  return await res.json();
}

// Download media from a URL
async function downloadFile(url, filename) {
  const res = await fetch(url);
  const buffer = await res.buffer();
  const filePath = path.join(__dirname, "..", "temp", filename);

  fs.writeFileSync(filePath, buffer);
  return filePath;
}

// Execute shell command
function execShell(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);
      resolve(stdout.trim());
    });
  });
}

// Format time
function formatDuration(ms) {
  let sec = Math.floor((ms / 1000) % 60);
  let min = Math.floor((ms / (1000 * 60)) % 60);
  let hr = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hr}h ${min}m ${sec}s`;
}

// Random choice from array
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
  getJson,
  downloadFile,
  execShell,
  formatDuration,
  pickRandom
};