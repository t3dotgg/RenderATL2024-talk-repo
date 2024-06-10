import fs from "fs/promises";

async function readHtmlFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, "utf8");
  return fileContent;
}

export async function GET() {
  const fileContent = await readHtmlFile("./public/angular/index.html");

  return new Response(fileContent, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
