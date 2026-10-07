// ─────────────────────────────────────────────────────────────
// LITTLE RIPPER ESPRESSO: everything on the website lives here.
// Change a word, a price, a colour or a photo in this file and the
// whole site updates. You never need to touch the components.
//
// Empty lists ([]) or empty text ("") hide that part of the page.
// ─────────────────────────────────────────────────────────────

const business = {
  name: "Little Ripper Espresso",
  shortName: "Little Ripper",
  type: "Café",
  area: "Marcoola",

  address: {
    line1: "Shop 4A, 25 Seaside Blvd",
    line2: "Marcoola QLD 4564",
    short: "Shop 4A, 25 Seaside Blvd",
  },

  // The phone number takes calls and text orders.
  phone: {
    display: "0422 434 130",
    international: "+61422434130", // used for the call and text links
  },
  whatsapp: "", // e.g. "61422434130". Leave empty to hide WhatsApp.
  email: "littleripperespresso@gmail.com",

  links: {
    directions: "https://share.google/p34yD2CDDUHBMSm1F",
    instagram: "https://www.instagram.com/littleripperespresso/",
    instagramHandle: "@littleripperespresso",
    uberEats: "https://www.ubereats.com/au/store/little-ripper-espresso/t0PelG4yUkugTwIQhzQJ-w",
  },

  // Opening hours. Add rows like { days: "Mon to Fri", time: "6am to 2pm" }.
  // While this is empty, the site links to Google Maps for today's hours.
  hours: [],
  hoursFallback: "Today's hours on Google Maps",

  seo: {
    title: "Little Ripper Espresso",
    description:
      "Coffee, breakfast and lunch at Shop 4A, 25 Seaside Blvd, Marcoola QLD. Text your coffee order ahead and pick it up on the way to the beach.",
  },

  // Brand colours. The dark set is used when a visitor's phone is in dark mode.
  colors: {
    apricot: "#f9ab6a",
    cream: "#fff9ee",
    toast: "#4a230d",
    onApricot: "#3d1d0b",
    inkSoft: "#7a4325",
    dark: {
      paper: "#21140c",
      ink: "#fff9ee",
      inkSoft: "#e9cfb6",
      deep: "#3a2112",
    },
  },

  nav: {
    links: [
      { label: "Menu", href: "#menu" },
      { label: "Find us", href: "#find" },
    ],
    cta: { label: "Text your order", href: "#text" },
    menuLabel: "Menu",
    closeLabel: "Close",
    callLabel: "Call",
  },

  hero: {
    wordmark: ["Little", "Ripper"],
    wordmarkSuffix: "Espresso, Marcoola",
    lede: "Espresso, breakfast and lunch on Seaside Boulevard, Marcoola. Steps from the beach.",
    sticker: "Text your order",
    links: [
      { label: "Breakfast and lunch", href: "#menu" },
      { label: "Shop 4A, 25 Seaside Blvd", href: "directions" },
      { label: "Call 0422 434 130", href: "call" },
    ],
  },

  // The four tiles under the hero. href can be "#section", "call",
  // "directions", "uberEats" or a full web address.
  services: [
    {
      title: "Text your order",
      text: "Send it from the car park. It's on the counter when you walk in.",
      href: "#text",
    },
    {
      title: "Dine in",
      text: "Grab a table, order at the counter, stay as long as the coffee lasts.",
      href: "#find",
    },
    {
      title: "Delivery",
      text: "On Uber Eats for the days you'd rather stay put.",
      note: "Opens Uber Eats",
      href: "uberEats",
    },
    {
      title: "Find us",
      text: "Shop 4A, 25 Seaside Blvd, Marcoola. Directions in Google Maps.",
      href: "directions",
    },
  ],

  marquee: ["Flat white", "Mocha", "Matcha", "Mango smoothie", "Breakfast", "Long black"],
  marqueePause: "Pause",
  marqueePlay: "Play",

  about: {
    label: "About the café",
    statement:
      "A small espresso bar on Seaside Boulevard. Coffee made properly, ceremonial matcha, fruit smoothies, and breakfast and lunch when you're hungry. Come in sandy. Nobody minds.",
  },

  order: {
    title: "Text your order. Grab it on the way past.",
    intro:
      "Pick your coffee, add your name and a pick-up time, then send it as a text. We'll have it made when you get here.",
    numberLabel: "Text us on",
    drinksLegend: "Your order",
    drinksHelp: "Tap a drink to add it and set how many. Tap it again to take it off.",
    qtyAria: "How many",
    maxQty: 20,
    drinks: [
      "Flat white",
      "Cappuccino",
      "Latte",
      "Long black",
      "Mocha",
      "Hot chocolate",
      { label: "Matcha", value: "Ceremonial matcha" },
      { label: "Mango smoothie", value: "Dreamy mango smoothie" },
      { label: "Strawberry smoothie", value: "Strawberries and cream smoothie" },
      { label: "Banana smoothie", value: "Banana cinnamon smoothie" },
    ],
    nameLabel: "Your name",
    namePlaceholder: "Name for the cup…",
    extrasLabel: "Anything else",
    extrasPlaceholder: "Can I get oat milk and an extra shot…",
    extrasHelp: "Milk, sugar, an extra shot or a smoothie swap. Write it how you'd say it at the counter.",
    pickupLegend: "Pick-up",
    pickup: [
      { label: "About 10 min", value: "in about 10 minutes" },
      { label: "About 20 min", value: "in about 20 minutes" },
      { label: "About 30 min", value: "in about 30 minutes" },
    ],
    previewLabel: "Your text",
    message: {
      greeting: "Hi Little Ripper,",
      please: "please.",
      and: "and",
      noItems: "(pick a drink)",
      name: "Name:",
      noName: "(your name)",
      pickup: "Picking up",
      thanks: "Thanks!",
    },
    sendLabel: "Text your order",
    copyLabel: "Copy message",
    copied: "Copied. Paste it into a text to the shop.",
    selected: "Message selected. Copy it and paste it into a text.",
    needName: "Add your name so we know whose cup it is.",
    needDrink: "Pick at least one drink first.",
  },

  menu: {
    title: "What people come back for",
    feature: {
      title: "The mocha",
      text: "Espresso and chocolate, smooth and rich. The one regulars order without looking at the board.",
    },
    hotDrinks: {
      title: "Hot drinks",
      items: [
        { name: "Flat white", price: "$5.30" },
        { name: "Cappuccino", price: "$5.30", tag: "Popular" },
        { name: "Latte", price: "$5.50" },
        { name: "Long black", price: "$5.00" },
        { name: "Hot chocolate", price: "$5.30" },
      ],
    },
    matcha: {
      title: "Ceremonial matcha",
      price: "$6.00",
      text: "First-harvest, ceremonial-grade matcha from Shizuoka, Japan. Served in an 8oz cup.",
    },
    smoothies: {
      title: "Smoothies",
      price: "$12.00",
      items: [
        { name: "Dreamy mango", tag: "Popular" },
        { name: "Strawberries and cream" },
        { name: "Banana cinnamon" },
      ],
      text: "Pure fruit, blended with your choice of dairy, plant-based milk or Coco Coast coconut water.",
    },
    food: {
      title: "Breakfast and lunch",
      text: "Simple plates that sit well next to a coffee, then something more filling once the morning crowd thins out. Mornings get busy, so text ahead.",
      // Photos live in public/images/. "aspect" sets the frame shape (width / height)
      // and "focus" which part stays in view if the photo is cropped.
      image: {
        src: "/images/flat-white-and-muffin.webp",
        alt: "Flat white with heart latte art beside a muffin dusted with icing sugar",
        width: 781,
        height: 1020,
        aspect: "1 / 1",
        focus: "center",
      },
    },
    // Full-width spot under the menu for a new item. Set to null to hide it.
    newItem: {
      tag: "New",
      title: "Chicken caesar wrap",
      price: "", // add the counter price, e.g. "$16.00"
      text: "Grilled chicken, cos lettuce, shaved parmesan and caesar dressing, wrapped and toasted.",
      image: {
        src: "/images/chicken-caesar-wrap.webp",
        alt: "Chicken caesar wrap cut in half, filled with grilled chicken, cos lettuce and shaved parmesan",
        width: 617,
        height: 347,
        aspect: "16 / 9",
        focus: "center",
      },
    },
    priceNote: "Drink prices as listed on our Uber Eats menu. Prices at the counter may differ.",
  },

  // Real customer reviews only. Example:
  // { quote: "Best flat white in Marcoola.", name: "Sam", detail: "Google review" }
  testimonials: [],
  testimonialsTitle: "What people say",

  // Only add questions customers genuinely ask. Example:
  // { q: "Do you have oat milk?", a: "Yes, and almond and soy." }
  faq: [],
  faqTitle: "Good to know",

  contact: {
    title: "Find us on Seaside Boulevard",
    labels: {
      address: "Address",
      hours: "Hours",
      call: "Call",
      text: "Text orders",
      email: "Email",
      how: "How",
      instagram: "Instagram",
    },
    how: "Dine in, takeaway, text ahead, or",
    howLink: "delivery on Uber Eats",
    actions: {
      call: "Call 0422 434 130",
      email: "Email us",
      whatsapp: "WhatsApp",
      directions: "Get directions",
    },
    blockText: ["Marcoola", "QLD 4564"],
    form: {
      title: "Send us a message",
      nameLabel: "Your name",
      replyLabel: "Phone or email",
      replyHelp: "So we can get back to you.",
      messageLabel: "Message",
      messagePlaceholder: "Catering, a big order, a question…",
      submit: "Send message",
      subject: "Message from the website",
      sent: "Your email app should open with the message ready to send. If it doesn't, email us at littleripperespresso@gmail.com.",
      errors: {
        name: "Add your name.",
        reply: "Add a phone number or email so we can reply.",
        message: "Write a message.",
      },
    },
  },

  signoff: "Sandy feet welcome.",

  footer: {
    links: [
      { label: "Text your order", href: "#text" },
      { label: "Menu", href: "#menu" },
      { label: "Find us", href: "#find" },
      { label: "Instagram", href: "instagram" },
    ],
  },

  skipLink: "Skip to content",
};

export default business;
