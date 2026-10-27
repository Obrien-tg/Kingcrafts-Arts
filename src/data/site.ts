export const site = {
  name: "KING CRAFT ARTS",
  artist: "Ronald Takunda Chaparadza",
  location: "Steelpoort, South Africa",
  description:
    "A portfolio and custom-inquiry space for the handcrafted work of Ronald Takunda Chaparadza.",
  url: import.meta.env.PUBLIC_SITE_URL || "",
  whatsappPhone: "",
} as const;

export function getWhatsAppUrl(message: string): string | undefined {
  if (!site.whatsappPhone) {
    return undefined;
  }

  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
