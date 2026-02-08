const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const litePath = path.join(__dirname, "../public/lite.html");
const jsonPath = path.join(__dirname, "../public/static/schema.json");

try {
  // 1. Load data
  let indexHtml = fs.readFileSync(indexPath, "utf-8");
  const liteHtml = fs.readFileSync(litePath, "utf-8").trim();
  const jsonData = fs.readFileSync(jsonPath, "utf-8").trim();

  // 2. Prepare Tags
  const noscriptTag = liteHtml.startsWith("<noscript>")
    ? liteHtml
    : `<noscript>\n${liteHtml}\n</noscript>`;

  const scriptTag = `<script type="application/ld+json">\n${jsonData}\n</script>`;

  let indexModified = false;

  // 3. Inject <noscript> before </body>
  if (!indexHtml.includes(noscriptTag)) {
    if (indexHtml.includes("</body>")) {
      indexHtml = indexHtml.replace("</body>", `${noscriptTag}\n</body>`);
      console.log("✅ Injected <noscript> content.");
      indexModified = true;
    } else {
      console.warn("⚠️ Could not find </body> tag in index.html");
    }
  } else {
    console.log("ℹ️ <noscript> content already present.");
  }

  // 4. Inject JSON before </head>
  if (!indexHtml.includes(scriptTag)) {
    if (indexHtml.includes("</head>")) {
      indexHtml = indexHtml.replace("</head>", `${scriptTag}\n</head>`);
      console.log("✅ Injected structured data.");
      indexModified = true;
    } else {
      console.warn("⚠️ Could not find </head> tag in index.html");
    }
  } else {
    console.log("ℹ️ Structured data already present.");
  }

  // 5. Save index.html only if changed
  if (indexModified) {
    fs.writeFileSync(indexPath, indexHtml, "utf-8");
    console.log("✅ index.html updated successfully.");
  }

  // 6. Refined lite.html cleanup
  // Instead of chained replaces, we build a clean body from the content
  let liteBodyContent = liteHtml
    .replace("<noscript>", "")
    .replace("</noscript>", "")
    .replace("<h3>JavaScript is Disabled. Please enable JavaScript!</h3>", "")
    .trim();

  const finalLite = `<body>\n${liteBodyContent}\n</body>`;

  fs.writeFileSync(litePath, finalLite, "utf-8");
  console.log("✅ lite.html updated successfully.");
} catch (error) {
  console.error("❌ Error updating files:", error.message);
}
