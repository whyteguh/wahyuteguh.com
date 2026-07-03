// Shared display helpers for the dot-paper design.

export const fmtMonth = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toLowerCase();

// Kicker labels for resource types, as used in the Claude Design mockups.
export const typeLabel: Record<string, string> = {
  webapp: 'web app',
  landing: 'ebook',
};

export const socials = [
  { label: 'instagram', href: 'https://www.instagram.com/wahyuteguh/' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/wahyu-teguh/' },
  { label: 'threads', href: 'https://www.threads.com/@wahyuteguh' },
  { label: 'youtube', href: 'https://www.youtube.com/@whyteguh' },
  { label: 'facebook', href: 'https://www.facebook.com/why.dv' },
  { label: 'x', href: 'https://x.com/why_teguh' },
  { label: 'email', href: 'mailto:hello@wahyuteguh.com' },
];
