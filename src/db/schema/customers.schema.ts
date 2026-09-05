import { pgTable, serial, varchar, text, date, timestamp, check } from "drizzle-orm/pg-core";
import { CustomerSignupSource, CustomerStatusEnum } from "../../shared/enums/customers.js";
import { CustomContraints } from "../db.custom_constraints.js";
import { sql } from "drizzle-orm";

export const customersSchema = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 30 }),
  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }),
  dob: date("dob"),
  profilePic: text("profile_pic"),
  status: varchar("status", { enum: [CustomerStatusEnum.ACTIVE, CustomerStatusEnum.INACTIVE] }),
  source: varchar("source", { enum: [CustomerSignupSource.PLATFORM, CustomerSignupSource.GOOGLE] }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
},(table)=> ([
  check(CustomContraints.EMAIL_OR_PHONE_REQUIRED, sql`${table.email} IS NOT NULL AND ${table.email} !='' OR ${table.phoneNumber} IS NOT NULL AND ${table.phoneNumber} !=''`)
]));
