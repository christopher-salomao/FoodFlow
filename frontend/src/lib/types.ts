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

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  disabled: boolean;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
}

export interface OrderItemProps {
  id: string;
  amount: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
  };
}

export interface OrderProps {
  id: string;
  table: number;
  customer_name?: string;
  status: boolean; // false = in production, true = finished
  draft: boolean; // false = sended to kitchen, true = waiter is taking the order
  createdAt: string;
  order_items?: OrderItemProps[];
}
