const fs = require("fs");
const path = require("path");

const TARGET_DIR = process.cwd(); // ruta del proyecto actual
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const REPLACEMENTS = [
  {
    find: /from ["']expo-secure-store["']/g,
    replace: `from "../utils/expo-web-patch"; // AUTO-PATCHED`
  },
  {
    find: /from ["']@react-native-google-signin\/google-signin["']/g,
    replace: `from "../utils/expo-web-patch"; // AUTO-PATCHED`
  },
  {
    find: /from ["']@react-native-community\/datetimepicker["']/g,
    replace: `from "../utils/expo-web-patch"; // AUTO-PATCHED`
  },
  {
    find: /from ["']expo-notifications["']/g,
    replace: `from "../utils/expo-web-patch"; // AUTO-PATCHED`
  },
  {
    find: /from ["']react-native-google-mobile-ads["']/g,
    replace: `from "../utils/expo-web-patch"; // AUTO-PATCHED`
  }
];

function scan(dir) {
  const entries = fs.readdirSync(dir);

  for (let entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        entry.includes("node_modules") ||
        entry.includes(".expo") ||
        entry.includes("dist")
      ) continue;
      scan(fullPath);
    }

    if (stat.isFile() && EXTENSIONS.includes(path.extname(entry))) {
      patchFile(fullPath);
    }
  }
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  REPLACEMENTS.forEach(({ find, replace }) => {
    content = content.replace(find, replace);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Parcheado:", filePath);
  }
}

console.log("🔍 Escaneando proyecto...");
scan(TARGET_DIR);
console.log("🏁 Parcheo completado.");
