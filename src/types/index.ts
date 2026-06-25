export type LeadType =
  | "demolition"
  | "estimate"
  | "callback"
  | "contact"
  | "calculator";

export type LeadResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
