import { Signup } from "../../shared/types/auth.types.js";
import { db } from "../../db/index.js";

export class AuthService {
  async signup(customerData: Signup) {
    const { email } = customerData;
    const trimmedEmail = email.toLowerCase().trim();

    const isExistingCustomer = await db.query.customersSchema.findFirst({
      where: (us, { eq }) => eq(us.email, trimmedEmail),
      columns: { id: true, email: true },
    });

    if (isExistingCustomer) {
    }
  }
}
