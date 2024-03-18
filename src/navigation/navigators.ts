import { BillingData } from "../types/billing";

export type StackParamList = {
  SPLASH: undefined;
  HOME: undefined;
  Menu: undefined;
  Billing: undefined;
  Payment: {
    items: BillingData[]
  };
  Reports: undefined;
};
