const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const litePath = path.join(__dirname, "../public/lite.html");
const jsonPath = path.join(__dirname, "../public/static/schema.json");

// Helper for ANSI logging
const Log = {
  success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
  info: (msg) => console.log(`\x1b[36mℹ ${msg}\x1b[0m`),
  error: (msg) => console.error(`\x1b[31m❌ ${msg}\x1b[0m`),
};

async function postProcess() {
  try {
    // 1. Read files
    let indexHtml = fs.readFileSync(indexPath, "utf-8");
    const liteRaw = fs.readFileSync(litePath, "utf-8").trim();
    const jsonRaw = fs.readFileSync(jsonPath, "utf-8").trim();

    // 2. Prepare Injection Tags
    // Wrapping in markers allows the script to find and REPLACE instead of just APPENDING
    const noscriptContent = liteRaw.startsWith("<noscript>")
      ? liteRaw
      : `<noscript>\n${liteRaw}\n</noscript>`;
    const noscriptInjection = `\n${noscriptContent}\n`;

    const scriptInjection = `\n<script type="application/ld+json">\n${jsonRaw}\n</script>\n`;

    let modified = false;

    // 3. Inject/Update noscript (Before </body>)
    const noscriptRegex = /[\s\S]*?/;
    if (noscriptRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(noscriptRegex, noscriptInjection);
      Log.info("Updated existing <noscript> block.");
      modified = true;
    } else if (indexHtml.includes("</body>")) {
      indexHtml = indexHtml.replace("</body>", `${noscriptInjection}\n</body>`);
      Log.success("Injected new <noscript> block.");
      modified = true;
    }

    // 4. Inject/Update JSON-LD (Before </head>)
    const jsonRegex = /[\s\S]*?/;
    if (jsonRegex.test(indexHtml)) {
      indexHtml = indexHtml.replace(jsonRegex, scriptInjection);
      Log.info("Updated existing Structured Data.");
      modified = true;
    } else if (indexHtml.includes("</head>")) {
      indexHtml = indexHtml.replace("</head>", `${scriptInjection}\n</head>`);
      Log.success("Injected new Structured Data.");
      modified = true;
    }

    // 5. Write index.html if changed
    if (modified) {
      fs.writeFileSync(indexPath, indexHtml, "utf-8");
    } else {
      Log.info("No changes needed for index.html.");
    }

    // 6. Clean up lite.html for standalone use
    // Using Regex to handle tags more flexibly (case insensitive, whitespace)
    const cleanLite = liteRaw
      .replace(/<\/?noscript>/gi, "") // Remove <noscript> and </noscript>
      .replace(/<h3>JavaScript is Disabled.*?<\/h3>/gi, "") // Remove the warning
      .trim();

    const liteFinal = `<body>\n${cleanLite}\n</body>`;

    fs.writeFileSync(litePath, liteFinal, "utf-8");
    Log.success("lite.html cleaned and updated.");
  } catch (error) {
    Log.error(`Process failed: ${error.message}`);
  }
}

postProcess();
