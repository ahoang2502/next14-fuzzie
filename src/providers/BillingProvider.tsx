"use client";

import React, { useContext, useState } from "react";

type BillingProviderProps = {
  credits: string;
  tier: string;
  setCredits: React.Dispatch<React.SetStateAction<string>>;
  setTier: React.Dispatch<React.SetStateAction<string>>;
};

const initialValues: BillingProviderProps = {
  credits: "",
  setCredits: () => undefined,
  tier: "",
  setTier: () => undefined,
};

const context = React.createContext(initialValues);
const { Provider } = context;

export const BillingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [credits, setCredits] = useState(initialValues.credits);
  const [tier, setTier] = useState(initialValues.tier);

  const values = {
    credits,
    setCredits,
    tier,
    setTier,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useBilling = () => {
  const state = useContext(context);

  return state;
};
