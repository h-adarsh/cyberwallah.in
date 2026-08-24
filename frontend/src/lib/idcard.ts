import { toPng } from "html-to-image";

/** 101 → "CW-101" (dash, no padding — matches the verify URL). */
export function formatCardNumber(n: number): string {
  return `CW-${n}`;
}

/** "CW-101" | "cw-101" | "101" → 101; anything unparseable → null. */
export function parseCardNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : null;
}

/** Public verify URL for a card, e.g. https://cyberwallah.in/id/CW-101 */
export function cardUrl(n: number): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://cyberwallah.in";
  return `${origin}/id/${formatCardNumber(n)}`;
}

/** Render a DOM node to a PNG and trigger a download. */
export async function downloadCardPng(
  node: HTMLElement,
  cardNumber: number,
): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#030706",
  });
  const link = document.createElement("a");
  link.download = `cyberwallah-${formatCardNumber(cardNumber).toLowerCase()}.png`;
  link.href = dataUrl;
  link.click();
}

const shareText = (cardNumber: number) =>
  `I'm a verified CyberWallah member — ${formatCardNumber(cardNumber)} 🛡️`;

/**
 * Share via the Web Share API where available, else copy the link to the
 * clipboard. Returns what actually happened so the UI can show feedback.
 */
export async function shareCard(
  cardNumber: number,
): Promise<"shared" | "copied" | "unsupported"> {
  const url = cardUrl(cardNumber);
  const text = shareText(cardNumber);

  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({ title: "CyberWallah Member", text, url });
      return "shared";
    } catch {
      // user cancelled or share failed — fall through to clipboard
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      return "copied";
    } catch {
      return "unsupported";
    }
  }
  return "unsupported";
}

export function whatsappShareUrl(cardNumber: number): string {
  return `https://wa.me/?text=${encodeURIComponent(
    `${shareText(cardNumber)} ${cardUrl(cardNumber)}`,
  )}`;
}

export function linkedinShareUrl(cardNumber: number): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    cardUrl(cardNumber),
  )}`;
}
