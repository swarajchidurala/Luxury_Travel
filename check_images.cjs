const https = require('https');
const fs = require('fs');

const fileContents = [
  fs.readFileSync('./src/data/destinations.js', 'utf8'),
  fs.readFileSync('./src/data/experiences.js', 'utf8'),
  fs.readFileSync('./src/data/journal.js', 'utf8'),
  fs.readFileSync('./src/pages/Home.jsx', 'utf8'),
  fs.readFileSync('./src/pages/Destinations.jsx', 'utf8'),
  fs.readFileSync('./src/pages/Experiences.jsx', 'utf8'),
  fs.readFileSync('./src/pages/Journal.jsx', 'utf8'),
];

const urls = new Set();
const regex = /https:\/\/images\.unsplash\.com\/[^\s"'`)]+/g;

fileContents.forEach(content => {
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.add(match[0]);
  }
});

console.log(`Found ${urls.size} unique image URLs to check.`);

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      // Unsplash might redirect (302) to the actual CDN URL, or return 200.
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ url, status: 'OK' });
      } else {
        resolve({ url, status: `ERROR ${res.statusCode}` });
      }
    }).on('error', (e) => {
      resolve({ url, status: `ERROR ${e.message}` });
    });
  });
};

Promise.all(Array.from(urls).map(checkUrl)).then(results => {
  results.forEach(res => {
    if(res.status !== 'OK') {
        console.log(`Failed: ${res.url} - ${res.status}`);
    } else {
        console.log(`Working: ${res.url}`);
    }
  });
});
