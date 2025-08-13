const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const litePath = path.join(__dirname, "../public/lite.html");
const jsonPath = path.join(__dirname, "../public/static/schema.json");

try {
  let indexHtml = fs.readFileSync(indexPath, "utf-8");
  const liteHtml = fs.readFileSync(litePath, "utf-8").trim();
  const jsonData = fs.readFileSync(jsonPath, "utf-8").trim();

  const noscriptTag = liteHtml.startsWith("<noscript>")
    ? liteHtml
    : `<noscript>\n${liteHtml}\n</noscript>`;

  const scriptTag = `<script type="application/ld+json">\n${jsonData}\n</script>`;

  // Inject <noscript> before </body> if not already present
  if (!indexHtml.includes(noscriptTag)) {
    indexHtml = indexHtml.replace("</body>", `${noscriptTag}\n</body>`);
    console.log("✅ Injected <noscript> content.");
  } else {
    console.log("ℹ️ <noscript> content already present. Skipping injection.");
  }

  // Inject JSON before </head> if not already present
  if (!indexHtml.includes(scriptTag)) {
    indexHtml = indexHtml.replace("</head>", `${scriptTag}\n</head>`);
    console.log("✅ Injected structured data.");
  } else {
    console.log("ℹ️ Structured data already present. Skipping injection.");
  }

  fs.writeFileSync(indexPath, indexHtml, "utf-8");
  console.log("✅ index.html updated successfully.");

  let noscript = liteHtml.replace("</noscript>", "</body>");
  noscript = noscript.replace("<noscript>", "<body>");
  noscript = noscript.replace("<h3>JavaScript is Disabled. Please enable JavaScript!</h3>", "");
  fs.writeFileSync(litePath, noscript, "utf-8");
  console.log("✅ lite.html updated successfully.");
} catch (error) {
  console.error("❌ Error updating index.html:", error.message);
}
