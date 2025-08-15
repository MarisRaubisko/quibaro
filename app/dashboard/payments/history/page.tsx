import FarmsPage from "@/components/payments/payment-history";
import { fetchPaymentHistory } from "@/utils/server";

export default async function PaymentHistoryPage() {
  const patmentHistory = (await fetchPaymentHistory()) ?? [];

  return <FarmsPage patmentHistory={patmentHistory} />;
}
