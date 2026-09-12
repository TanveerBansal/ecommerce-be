import { Database, db } from "../../../db/index.js";
import { customersSchema } from "../../../db/schema/customers.schema.js";
import { CreateCustomer } from "./auth.type.js";

export class AuthRepository {
  private db: Database;

  constructor() {
    this.db = db;
  }

  async createCustomer(customer: CreateCustomer) {
    return await this.db.insert(customersSchema).values({
      email: customer.email?.trim()?.toLowerCase() ?? null,
      phoneNumber: customer.phoneNumber?.trim() ?? null,
      source: customer.source,
    });
  }
}
