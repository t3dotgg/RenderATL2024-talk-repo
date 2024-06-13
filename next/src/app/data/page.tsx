import sql from "@/db";
import { getMongo } from "@/db/mongo";
import { seedDB } from "@/db/seed";
import { revalidatePath } from "next/cache";

const minId = 5;

let values: { id: number; name: string; email: string }[] = [];

export default async function DataPage() {
  return (
    <div>
      {values.length > 0 && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.content = ${JSON.stringify(values)}`,
          }}
        />
      )}
      Rows is {values.length}
      <form className="flex flex-col gap-4 p-4 bg-gray-900 text-2xl font-bold">
        <button
          type="submit"
          formAction={async () => {
            "use server";

            const mongoClient = await getMongo();
            values = (await mongoClient
              .collection("users")
              .find({})
              .toArray()) as any[];

            revalidatePath("/data");
          }}
        >
          Fetch data
        </button>
        <button
          type="submit"
          formAction={async () => {
            "use server";

            await seedDB();

            revalidatePath("/data");
          }}
        >
          Reset db
        </button>
        <button
          type="submit"
          formAction={async () => {
            "use server";

            // port to MongoDB
            const results = await mongoClient
              .collection("users")
              .insertMany(values);

            console.log(results);

            revalidatePath("/data");
          }}
        >
          Port to MongoDB
        </button>
      </form>
    </div>
  );
}
