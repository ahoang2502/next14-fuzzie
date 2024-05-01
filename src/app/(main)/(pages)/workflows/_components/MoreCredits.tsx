"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useBilling } from "@/providers/BillingProvider";

export const MoreCredits = () => {
  const { credits } = useBilling();

  return credits !== "0" ? (
    <></>
  ) : (
    <Card>
      <CardContent className="p-6">
        <CardDescription>You are out of credits</CardDescription>
      </CardContent>
    </Card>
  );
};
