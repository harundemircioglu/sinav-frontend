export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
  phone: string = "";
  userType: UserType = 0;
}

export enum UserType {
  Admin,
  User,
}
