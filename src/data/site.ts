export const site = {
  name: "KING CRAFT ARTS",
  artist: "Ronald Takunda Chaparadza",
  location: "Steelpoort, South Africa",
  description:
    "A portfolio and custom-inquiry space for the handcrafted work of Ronald Takunda Chaparadza.",
  url: import.meta.env.PUBLIC_SITE_URL || "",
  whatsappPhoneInput: import.meta.env.PUBLIC_WHATSAPP_PHONE || "",
  whatsappPhoneVerified: import.meta.env.PUBLIC_WHATSAPP_PHONE_VERIFIED === "true",
  emailInput: import.meta.env.PUBLIC_BUSINESS_EMAIL || "",
  emailVerified: import.meta.env.PUBLIC_BUSINESS_EMAIL_VERIFIED === "true",
  inquiryEndpoint: import.meta.env.PUBLIC_INQUIRY_ENDPOINT || "",
  inquiryProvider: import.meta.env.PUBLIC_INQUIRY_PROVIDER || "",
} as const;

function normaliseWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `27${digits.slice(1)}`;
  }

  return digits;
}

export function getWhatsAppUrl(message: string): string | undefined {
  if (!site.whatsappPhoneVerified || !site.whatsappPhoneInput) {
    return undefined;
  }

  return `https://wa.me/${normaliseWhatsAppPhone(site.whatsappPhoneInput)}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppMessage(): string {
  return "Hello KING CRAFT ARTS, I would like to enquire about a bag.";
}

export function getBagWhatsAppMessage(title: string): string {
  return `Hi KING CRAFT ARTS, I’m interested in the ${title}. Could you please confirm its current availability, price and any made-to-order options?`;
}

export function getMadeToOrderWhatsAppMessage(title: string): string {
  return `Hi KING CRAFT ARTS, I’m interested in a made-to-order ${title}. Could you please confirm the current price, availability and order details?`;
}
