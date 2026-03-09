/**
 * Format a raw phone number (digits only or with formatting) for display.
 * US-style: (123) 456-7890
 */
export function formatPhoneNumber(number: string): string {
  if (!number) return "";
  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
}

/**
 * Strip non-digits and limit to 10 characters. Use for normalizing input before storing.
 */
export function cleanAndLimitPhoneInput(text: string): string {
  const cleaned = text.replace(/\D/g, "");
  return cleaned.slice(0, 10);
}
