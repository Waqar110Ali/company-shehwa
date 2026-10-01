export enum PaymentRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PaymentRequestType {
  // Paying to unlock a specific course.
  ENROLLMENT = "ENROLLMENT",

  // Paying to top up the wallet with coins.
  TOPUP = "TOPUP",
}
