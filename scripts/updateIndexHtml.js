const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const noscriptPath = path.join(__dirname, "../public/text-only.html");

const indexHtml = fs.readFileSync(indexPath, "utf-8");
const noscriptHtml = fs.readFileSync(noscriptPath, "utf-8");

const jsonPath = path.join(__dirname, "../public/schema.json");
const jsonData = fs.readFileSync(jsonPath, "utf-8");

// Inject before </body>
let updatedHtml = indexHtml.replace("</body>", `\n${noscriptHtml}\n</body>`);

const scriptTag = `\n<script type="application/ld+json">\n${jsonData}\n</script>\n`;
// Inject before </head>
updatedHtml = indexHtml.replace("</head>", `${scriptTag}</head>`);

fs.writeFileSync(indexPath, updatedHtml, "utf-8");

console.log("✅ Schema data and noscript content updated in index.html");
