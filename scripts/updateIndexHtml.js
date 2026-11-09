const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../public/index.html");
const litePath = path.join(__dirname, "../public/lite.html");
const jsonPath = path.join(__dirname, "../public/static/schema.json");

try {
  let indexHtml = fs.readFileSync(indexPath, "utf8");
  const liteHtml = fs.readFileSync(litePath, "utf8");
  const jsonRaw = fs.readFileSync(jsonPath, "utf8");

  const normalizedJson = JSON.stringify(JSON.parse(jsonRaw), null, 2);

  const noscriptContent = liteHtml
    .replace(/<\/?noscript>/gi, "")
    .trim();

  const noscriptTag = `<noscript>\n${noscriptContent}\n</noscript>`;

  const scriptTag =
    `<script type="application/ld+json">\n` +
    `${normalizedJson}\n` +
    `</script>`;

  let indexModified = false;

  // Detect existing JSON-LD script
  const jsonLdRegex =
    /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i;

  if (!jsonLdRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(
      /<\/head>/i,
      `${scriptTag}\n</head>`
    );
    indexModified = true;
    console.log("✅ Injected structured data.");
  } else {
    console.log("ℹ️ Structured data already exists.");
  }

  // Detect existing noscript
  const noscriptRegex = /<noscript[\s\S]*?<\/noscript>/i;

  if (!noscriptRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(
      /<\/body>/i,
      `${noscriptTag}\n</body>`
    );
    indexModified = true;
    console.log("✅ Injected noscript content.");
  } else {
    console.log("ℹ️ Noscript content already exists.");
  }

  if (indexModified) {
    fs.writeFileSync(indexPath, indexHtml, "utf8");
    console.log("✅ index.html updated.");
  }

  // Clean lite.html
  const liteBodyContent = liteHtml
    .replace(/<\/?noscript>/gi, "")
    .replace(
      /<h3>\s*JavaScript is Disabled\.?\s*Please enable JavaScript!?\s*<\/h3>/gi,
      ""
    )
    .replace(/<\/?body>/gi, "")
    .trim();

  const finalLite =
`<body>
${liteBodyContent}
</body>
`;

  if (finalLite.trim() !== liteHtml.trim()) {
    fs.writeFileSync(litePath, finalLite, "utf8");
    console.log("✅ lite.html updated.");
  } else {
    console.log("ℹ️ lite.html unchanged.");
  }

} catch (error) {
  console.error("❌ Error updating files:", error);
  process.exit(1);
}
