export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  createdAt: string;
}

export interface AuthResponseProps {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  token: string;
}

export interface CategoryProps {
  id: string;
  name: string;
  createdAt: string;
}
