import { Signup } from "../../shared/types/auth.types.js";
import { db } from "../../db/index.js";

export class AuthService {
  async signup(userData: Signup) {
    const { email } = userData;
    const trimmedEmail = email.toLowerCase().trim();

    const isExistingUser = await db.query.usersSchema.findFirst({
      where: (us, { eq }) => eq(us.email, trimmedEmail),
      columns: { id: true, email: true },
    });

    if (isExistingUser) {
    }
  }
}
