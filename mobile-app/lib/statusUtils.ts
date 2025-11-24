/*
 * Utility functions for offer status handling
 */

export type OfferStatus = "pending" | "active" | "redeemed";

export const getStatusColor = (status: OfferStatus | string): string => {
  switch (status) {
    case "pending":
      return "#F59E0B";
    case "active":
      return "#10B981";
    case "redeemed":
      return "#6B7280";
    default:
      return "#6B7280";
  }
};


export const getStatusText = (status: OfferStatus | string): string => {
  switch (status) {
    case "pending":
      return "Pending Activation";
    case "active":
      return "Active - Show QR to Redeem";
    case "redeemed":
      return "Redeemed";
    default:
      return status;
  }
};
