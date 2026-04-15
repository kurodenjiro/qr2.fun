import { Suspense } from "react";
import OrderConfirmationClient from "./order-confirmation-client";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 px-12 text-zinc-100">Loading order...</div>}>
      <OrderConfirmationClient />
    </Suspense>
  );
}
