const fs = require("fs");

const date = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Kolkata",
});

const file = "index.html";
let html = fs.readFileSync(file, "utf8");

html = html.replace(
  /(<span id="lastUpdated">)[^<]*(<\/span>)/,
  `$1${date}$2`
);

fs.writeFileSync(file, html);
console.log("Last updated set to:", date);