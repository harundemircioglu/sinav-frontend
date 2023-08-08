import { User } from "./user.model";

export class Tweet {
  id: number = 0;
  user_id: number = 0;
  tweet_header: string = "";
  tweet_detail: string = "";
  likes: number = 0;
  user: User = new User;
}
