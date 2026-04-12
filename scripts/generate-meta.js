const fs = require("fs");
const path = require("path");

const CONTENTS_DIR = path.join(__dirname, "..", "contents");
const META_FILE = path.join(CONTENTS_DIR, "_meta.json");

function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const data = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  });

  return data;
}

function generateMeta() {
  const files = fs.readdirSync(CONTENTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const meta = [];

  mdxFiles.forEach((file) => {
    const filePath = path.join(CONTENTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.title && frontmatter.published) {
      meta.push({
        slug: file.replace(".mdx", ""),
        title: frontmatter.title,
        published: Number(frontmatter.published),
      });
    }
  });

  // Sort by published date descending (latest first)
  meta.sort((a, b) => b.published - a.published);

  // Remove published field before writing (not needed in _meta.json)
  const output = meta.map(({ slug, title }) => ({ slug, title }));

  fs.writeFileSync(META_FILE, JSON.stringify(output, null, 2) + "\n");
  console.log(
    `Generated _meta.json with ${output.length} entries (sorted by published date descending)`,
  );
}

generateMeta();
