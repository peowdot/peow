import { pgSchema } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const auth = pgSchema("auth");

// oxlint-disable-next-line sort-keys
export const users = auth.table("users", {
  id: t.text("id").primaryKey(),
  firstName: t.text("first_name"),
  lastName: t.text("first_name"),
  email: t.varchar("email", { length: 255 }).unique(),
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});
