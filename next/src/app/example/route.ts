export function GET() {
  return new Response(
    `<main>
      <div className="flex flex-col">A totally normal Next app</div>
    </main>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
