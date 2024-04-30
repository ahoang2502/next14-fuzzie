import React from "react";

type Props = {
  onPayment: (id: string) => void;
  tier: any;
  products: any;
};

export const SubscriptionCard = ({ onPayment, tier, products }: Props) => {
  return <div>SubscriptionCard</div>;
};
