interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string[];
  avatar: string;
  [key: string]: unknown;
}
