// Shared display helpers for the dot-paper design.

export const fmtMonth = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toLowerCase();

// Kicker labels for resource types, as used in the Claude Design mockups.
export const typeLabel: Record<string, string> = {
  webapp: 'web app',
  landing: 'ebook',
};
