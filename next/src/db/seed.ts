import { revalidatePath } from "next/cache";
import { faker } from "@faker-js/faker";
import { db } from "./core";

export async function seedDB() {
  const created = await db.exec(
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT, email TEXT)"
  );

  const insert = db.prepare(
    "INSERT INTO user (id, name, email) VALUES (?, ?, ?)"
  );

  const doInsert = await db.transaction(() => {
    for (let i = 1; i < 1000; i++) {
      insert.run(i, faker.person.firstName(), faker.internet.email());
    }
  });

  doInsert();
  revalidatePath("/bash");
}
