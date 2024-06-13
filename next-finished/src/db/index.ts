import { db } from "./core";

export default async function sql(
  strings: TemplateStringsArray,
  ...values: any[]
) {
  if (strings[0].startsWith("SELECT") !== true) {
    throw new Error("Only SELECT queries are supported");
  }

  const queryString = strings.join("?");
  const queryRunner = db.prepare(queryString);

  const rows = await queryRunner.all(...values);

  return rows;
}
