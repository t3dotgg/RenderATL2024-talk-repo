import fs from "fs/promises";

async function readHtmlFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, "utf8");
  return fileContent;
}

const forceAngularResolutionStr = `
  <script>
    document.write(
      \`<base href="\${location.pathname}\${
        location.pathname.endsWith("/") ? "" : "/"
      }"/>\`
    );
  </script>
`;

export async function GET() {
  const fileContent = await readHtmlFile("./public/angular/browser/index.html");

  // Insert forceAngularResolutionStr after closing </title> tag
  const indexOfClosingTitleTag = fileContent.lastIndexOf("</title>") + 8;
  const updatedFileContent =
    fileContent.slice(0, indexOfClosingTitleTag) +
    forceAngularResolutionStr +
    fileContent.slice(indexOfClosingTitleTag);

  return new Response(updatedFileContent, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
