import { pgTable, serial, varchar, text, date, timestamp } from "drizzle-orm/pg-core";
import { UserSignupSource, UserStatusEnum } from "../../shared/enums/users.js";

export const usersSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }),
  dob: date("dob"),
  profilePic: text("profile_pic"),
  status: varchar("status", { enum: [UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE] }),
  source: varchar("source", { enum: [UserSignupSource.PLATFORM, UserSignupSource.GOOGLE] }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
