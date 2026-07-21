/**
 * Builds a tel: href from a display phone number, idempotent regardless of
 * whether the input already carries a "+1" country code — strips to digits
 * first, then prepends "1" only if exactly 10 digits remain.
 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const withCountryCode = digits.length === 10 ? `1${digits}` : digits;
  return `tel:+${withCountryCode}`;
}
