"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { BillingLoader } from "@/components/BillingLoader";
import { useBilling } from "@/providers/BillingProvider";
import { SubscriptionCard } from "./SubscriptionCard";
import { CreditTracker } from "./CreditTracker";

export const BillingDashboard = () => {
  const [stripeProducts, setStripeProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { credits, tier } = useBilling();

  const onStripeProducts = async () => {
    setLoading(true);

    const { data } = await axios.get("/api/payment");
    if (data) {
      setStripeProducts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    onStripeProducts();
  }, []);

  const onPayment = async (id: string) => {
    const { data } = await axios.post(
      "/api/payment",
      { priceId: id },
      { headers: { "Content-Type": "application/json" } }
    );

    window.location.assign(data);
  };

  return (
    <>
      {loading ? (
        <BillingLoader />
      ) : (
        <>
          <div className="flex gap-5 p-5">
            <SubscriptionCard
              tier={tier}
              products={stripeProducts}
              onPayment={onPayment}
            />
          </div>

          <CreditTracker tier={tier} credits={credits} />
        </>
      )}
    </>
  );
};
