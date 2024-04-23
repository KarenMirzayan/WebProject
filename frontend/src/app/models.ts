export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  is_superuser: boolean;
}
