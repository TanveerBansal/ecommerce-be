import { AuthRepository } from "./auth.repository.js";

export class AuthService {
  private repo: AuthRepository;

  constructor() {
    this.repo = new AuthRepository();
  }

  
}
