const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const litePath = path.join(__dirname, "../public/lite.html");
const jsonPath = path.join(__dirname, "../public/static/schema.json");

const Log = {
  success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
  info: (msg) => console.log(`\x1b[36mℹ ${msg}\x1b[0m`),
  error: (msg) => console.error(`\x1b[31m❌ ${msg}\x1b[0m`),
};

async function postProcess() {
  try {
    let indexHtml = fs.readFileSync(indexPath, "utf-8");
    const liteRaw = fs.readFileSync(litePath, "utf-8").trim();
    const jsonRaw = fs.readFileSync(jsonPath, "utf-8").trim();

    // 1. Prepare Injection Blocks with UNIQUE MARKERS
    const noscriptInjection = `\n<noscript>\n${liteRaw.replace(/<\/?noscript>/gi, "")}\n</noscript>\n`;
    const jsonInjection = `\n<script type="application/ld+json">\n${jsonRaw}\n</script>\n`;

    let modified = false;

    // 2. Safely Update or Inject JSON-LD
    const jsonRegex = /[\s\S]*?/;
    if (jsonRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(jsonRegex, jsonInjection);
      Log.info("Updated existing JSON-LD block.");
      modified = true;
    } else if (indexHtml.includes("</head>")) {
      indexHtml = indexHtml.replace("</head>", `${jsonInjection}\n</head>`);
      Log.success("Injected new JSON-LD block.");
      modified = true;
    }

    // 3. Safely Update or Inject Noscript
    const noscriptRegex = /[\s\S]*?/;
    if (noscriptRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(noscriptRegex, noscriptInjection);
      Log.info("Updated existing noscript block.");
      modified = true;
    } else if (indexHtml.includes("</body>")) {
      indexHtml = indexHtml.replace("</body>", `${noscriptInjection}\n</body>`);
      Log.success("Injected new noscript block.");
      modified = true;
    }

    // 4. Save index.html
    if (modified) {
      fs.writeFileSync(indexPath, indexHtml, "utf-8");
      Log.success("index.html updated successfully.");
    }

    // 5. Cleanup lite.html
    const cleanLite = liteRaw
      .replace(/<\/?noscript>/gi, "")
      .replace(/<h3>JavaScript is Disabled.*?<\/h3>/gi, "")
      .trim();
    fs.writeFileSync(litePath, `<body>\n${cleanLite}\n</body>`, "utf-8");
    Log.success("lite.html cleaned.");
  } catch (error) {
    Log.error(`Process failed: ${error.message}`);
  }
}

postProcess();
