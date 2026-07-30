/**
 * Moves focus to the first invalid field after a failed form submission.
 * Call once, after setting error state, with the field ids in visual order
 * and the same field-error map passed to setFieldErrors.
 */
export function focusFirstInvalidField(fieldIds: string[], fieldErrors: Record<string, string>): void {
  const firstInvalidId = fieldIds.find((id) => fieldErrors[id]);
  if (!firstInvalidId) return;
  const el = document.getElementById(firstInvalidId);
  if (el instanceof HTMLElement) {
    el.focus();
  }
}
