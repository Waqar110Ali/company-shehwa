export enum EnrollmentStatus {
  // Payment proof submitted, waiting for an admin to review it.
  PENDING = "PENDING",

  // Admin approved the payment proof — student has full access.
  ACTIVE = "ACTIVE",

  // Admin rejected the payment proof.
  REJECTED = "REJECTED",
}
