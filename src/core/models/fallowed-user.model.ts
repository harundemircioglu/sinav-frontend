import { User } from "./user.model";

export class FallowedUser {
  id: number = 0;
  user_id: number = 0;
  fallowed_user_id: number = 0;
  user: User = new User;
}
