export const customOptions = {
  bagStyles: [] as string[],
  materials: [] as string[],
  notes: "Customisation depends on the selected style and confirmed options.",
} as const;

export const customOrderSteps = [
  {
    title: "Conversation",
    description: "Start with an enquiry about the style you are considering.",
  },
  {
    title: "Design discussion",
    description: "Discuss the request and any options that are confirmed for that style.",
  },
  {
    title: "Confirmation",
    description: "Confirm the price, timeline and order terms before proceeding.",
  },
  {
    title: "Creation",
    description: "The order moves forward once the agreed details are confirmed.",
  },
  {
    title: "Delivery or collection",
    description: "Agree the delivery or collection arrangement directly before the order is completed.",
  },
] as const;
