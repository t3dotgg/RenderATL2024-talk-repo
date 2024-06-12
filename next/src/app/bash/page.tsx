import { revalidatePath } from "next/cache";
import sql from "../db";
import { seedDB } from "../db/seed";
import { getMongo } from "../db/mongo";

let content: unknown = null;

function ContentComponent() {
  if (!content) return null;

  return (
    <div>
      {(content as any[])?.length} rows
      {/* Script tag with content */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.content = ${JSON.stringify(content)};
    `,
        }}
      />
    </div>
  );
}

async function getContentsOfLegacyDB() {
  "use server";

  content = await sql`SELECT * FROM user;`;

  revalidatePath("/bash");
}

async function moveDataToMongo() {
  "use server";

  // const rows = await sql`SELECT * FROM user WHERE id > ${5} AND id <= ${10};`;
  // content = JSON.stringify(rows);

  const mongoClient = await getMongo();
  const results = await mongoClient
    .collection("users")
    .insertMany(content as any[]);

  console.log(results);

  revalidatePath("/bash");
}

const btnClass = "text-xl border bg-white text-black p-2 rounded-md";

export default async function BashPage() {
  const mongoClient = await getMongo();
  const results = await mongoClient.collection("users").find({}).toArray();

  console.log(results);

  return (
    <form className="flex flex-col gap-2 p-4">
      <ContentComponent />
      <button
        type="submit"
        formAction={getContentsOfLegacyDB}
        className={btnClass}
      >
        Run server code
      </button>
      <button type="submit" formAction={moveDataToMongo} className={btnClass}>
        Run Migration
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
