import { CustomerSignupSource } from "../../../shared/enums/customers.js";

type CreateCustomer = {
  email?: string;
  phoneNumber?: string;
  source?: CustomerSignupSource;
};

export type { CreateCustomer };
