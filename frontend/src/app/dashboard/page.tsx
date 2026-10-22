import { getToken } from "@/lib/auth";
import { ContentOrders } from "./contentOrders";

export default async function Dashboard() {
  const token = await getToken();

  return <ContentOrders token={token!} />;
}
