import { randomBytes } from "crypto";

// Generates a readable one-time password for the "welcome email"
// flow — enough entropy to be safe to email, short enough that a
// student can type it once before being forced to change it.
// Avoids visually ambiguous characters (0/O, 1/l/I).
const CHARSET =
  "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

export function generateTemporaryPassword(length = 10): string {
  const bytes = randomBytes(length);
  let password = "";

  for (let i = 0; i < length; i++) {
    password += CHARSET[bytes[i] % CHARSET.length];
  }

  // Guarantee at least one of each class so it never fails a
  // "must contain upper/lower/number" policy if one is added later.
  return `${password}9Aa`;
}
