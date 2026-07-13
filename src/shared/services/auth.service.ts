import { Signup } from "@/shared";
import { db } from "@/db";
import { usersSchema } from "@/db/schema";

export class AuthService {
  async signup(userData: Signup) {
    const { password, email, ...rest } = userData;
    const trimmedEmail = email.toLowerCase().trim();

    const isExistingUser = await db.query.usersSchema.findFirst({
      where: (us, { eq }) => eq(us.email, trimmedEmail),
      columns: { id: true, email: true },
    });

    if(isExistingUser){
        
    }
  }
}
