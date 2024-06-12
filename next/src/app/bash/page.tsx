import { revalidatePath } from "next/cache";
import sql from "../db";
import { seedDB } from "../db/seed";

let content = "null";

function ContentComponent() {
  if (content === "null") return null;

  return (
    <div>
      {JSON.parse(content).length} rows
      {/* Script tag with content */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.content = ${content};
    `,
        }}
      />
    </div>
  );
}

async function copyPrimary() {
  "use server";

  const rows = await sql`SELECT * FROM user WHERE id > ${5} AND id <= ${10};`;
  content = JSON.stringify(rows);

  revalidatePath("/bash");
}

const btnClass = "text-xl border bg-white text-black p-2 rounded-md";

export default function BashPage() {
  return (
    <form className="flex flex-col gap-2 p-4">
      <ContentComponent />
      <button type="submit" formAction={copyPrimary} className={btnClass}>
        Run server code
      </button>
      <button
        type="submit"
        formAction={async () => {
          "use server";
          await seedDB();
        }}
        className={btnClass}
      >
        Seed db
      </button>
    </form>
  );
}
