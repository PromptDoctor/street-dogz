export interface HoursEntry {
  days: string;
  hours: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  /** Relative URL, e.g. "/services/drain-cleaning" */
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MenuItem {
  name: string;
  description: string;
  /** Display-only price/label text, e.g. "$7" or "Ask when you book". Rendered as static HTML — Schema.astro must never emit this. */
  price: string;
}

export interface Audience {
  /** Single emoji, rendered directly as text — not an icon font/library. */
  icon: string;
  label: string;
}

export interface SocialLinks {
  /** Google Business Profile URL — strongest GEO cross-reference for local SEO */
  googleBusinessProfile?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface Business {
  /** Legal/display name — must be byte-identical in schema, copy, and footer */
  name: string;
  legalName?: string;

  // NAP
  phone: string;
  email: string;

  // Address
  /** OPTIONAL — omit for service-area businesses with no public storefront */
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  /** OPTIONAL — omit when streetAddress is omitted */
  postalCode?: string;
  addressCountry: string;

  /**
   * OPTIONAL — decimal lat/lon for schema.org GeoCoordinates.
   * Omit entirely for mobile / service-area businesses.
   * NEVER pass { latitude: 0, longitude: 0 } — that is a real location
   * in the Atlantic Ocean, not an "empty" value.
   */
  geo?: { latitude: number; longitude: number };

  /** Canonical site root — no trailing slash. Used for sitemap, OG, and schema @id */
  domain: string;

  /** ≤160 chars — meta description and schema description */
  description: string;
  tagline: string;

  /** schema.org LocalBusiness subtype, e.g. "Plumber", "Electrician", "AutoRepair" */
  businessType: string;

  /** "$" | "$$" | "$$$" */
  priceRange?: string;

  /** City/region names for schema.org areaServed */
  areaServed: string[];

  /** Human-readable hours for display in footer / contact section */
  hours: HoursEntry[];

  /** schema.org openingHours format — e.g. ["Mo-Fr 09:00-17:00", "Sa 09:00-13:00"] */
  openingHours?: string[];

  /** Four-digit year the business was founded, e.g. "1998" */
  foundingDate?: string;

  /** Owner / founder full names */
  founders?: string[];

  services: ServiceItem[];

  /** Priced menu for on-page display only — NEVER surface price in Schema.astro. */
  menu?: MenuItem[];

  /** Short icon+label callouts (e.g. a "Who We Serve" section). Display-only, independent of `services`. */
  audiences?: Audience[];

  faq: FAQItem[];
  social: SocialLinks;

  /** SVG or raster logo for HTML use — e.g. "/assets/logo.svg" */
  logo: string;

  /**
   * Raster (JPG/PNG) logo for schema.org — Google prefers raster over SVG.
   * Falls back to `logo` if omitted. Recommended: ≥112×112 px, rectangular.
   */
  logoRaster?: string;

  /**
   * Open Graph / Twitter Card share image.
   * Must be JPG or PNG — SVG does not render on social platforms.
   * Required dimensions: 1200×630 px.
   */
  ogImage: string;
}

// ---------------------------------------------------------------------------
// StreetDogz Hot Dog Food Truck — St. Louis, MO
//
// OPEN ITEMS (resolve before launch):
//   - domain: brand uses "Dogz" (Z) but registered domain appears to be
//     "streetdogsfoodtruck.com" (S). Confirm with client. A defensive
//     registration of the Z spelling is recommended.
//   - legalName: LLC name unknown. Field intentionally omitted, not blank.
//   - founders: Eric Tomlin is co-owner per public reporting. Confirm
//     whether he should be listed alongside Bridgette.
//   - addressLocality: set to "St. Louis" per client preference. Public
//     listings (Yelp/Facebook) show Florissant, MO. If GBP says Florissant,
//     switch — this field's job is to corroborate GBP, not to rank.
//
// DELIBERATE OMISSIONS:
//   - Nathan's Famous claim: the design referenced serving Nathan's Famous
//     franks, but the claim was never confirmed with the client and no
//     licensed Nathan's logo asset exists. Removed from FAQ; do not
//     reintroduce without client + trademark confirmation.
//   - streetAddress / postalCode: the only known address (Florissant) is
//     residential. Not published without explicit client approval.
//   - geo: service-area business, no fixed location. Google's own Maps
//     listing renders at 11z (metro-wide), confirming no pin.
//   - No logo.svg: the logo is a detailed raster illustration and is not
//     realistically vectorizable. Documented deviation from template norm.
// ---------------------------------------------------------------------------
export const BUSINESS: Business = {
  name: "StreetDogz Hot Dog Food Truck",
  // legalName: omitted — pending LLC name from client

  phone: "+1 314-782-5423",
  email: "streetdogz314@gmail.com",

  // Service-area business — streetAddress, postalCode and geo omitted by design.
  addressLocality: "St. Louis",
  addressRegion: "MO",
  addressCountry: "US",

  domain: "https://www.streetdogzfoodtruckstl.com",

  description:
    "St. Louis hot dog food truck serving Chicago dogs, brats, Polish sausage and nachos since 2015. Catering for corporate events, schools, churches and picnics.",
  tagline: "Best Dogs on the Streets",

  businessType: "FoodEstablishment",
  priceRange: "$",

  areaServed: [
    "St. Louis",
    "St. Louis County",
    "St. Charles",
    "Metro East Illinois",
  ],

  hours: [{ days: "Monday–Sunday", hours: "9:00 AM – 10:00 PM" }],
  openingHours: ["Mo-Su 09:00-22:00"],

  foundingDate: "2015",
  founders: ["Bridgette Tomlin"],

  services: [
    {
      name: "Food Truck Catering",
      description:
        "Full-service hot dog truck catering across the St. Louis metro — we bring the truck, the grill and the fixings to your location.",
    },
    {
      name: "Corporate & Office Events",
      description:
        "On-site lunch service for offices, employee appreciation days and company gatherings in St. Louis city and county.",
    },
    {
      name: "School & Daycare Events",
      description:
        "Kid-friendly hot dog service for school functions, field days, fundraisers and daycare celebrations.",
    },
    {
      name: "Church & Community Events",
      description:
        "Hot dog truck service for church picnics, block parties and neighborhood gatherings throughout the metro area.",
    },
    {
      name: "Private Events & Birthday Parties",
      description:
        "Book the truck for birthday parties, graduations, family reunions and private celebrations anywhere in the St. Louis area.",
    },
  ],

  // Special-order items (Chicken Nachos, etc.) are folded into this same array
  // with a non-numeric price so Menu.astro can render them without a second
  // config field — see the price value to distinguish "order ahead" items.
  menu: [
    { name: "Beef Hot Dog", description: "Plain beef frank", price: "$6" },
    { name: "Chicago Dog", description: "Onions, pickles, sports peppers, tomatoes", price: "$7" },
    { name: "Chili Cheese Dog", description: "Chili & cheese", price: "$7" },
    { name: "Pork Bratwurst", description: "Plain pork sausage", price: "$7" },
    { name: "Beef Polish", description: "Plain beef sausage", price: "$7" },
    { name: "Beef Hotlink", description: "Plain beef link", price: "$7" },
    { name: "Cheese Nachos", description: "Chips & cheese", price: "$7" },
    { name: "Chili Cheese Nachos", description: "Chips, chili & cheese", price: "$9" },
    { name: "Chips", description: "Frito Lay products", price: "$1" },
    { name: "Drinks", description: "Pepsi & Coke products", price: "$2 / $3" },
    { name: "Chicken Nachos", description: "Special order — ask when you book", price: "Ask when you book" },
    { name: "Beef Nachos", description: "Special order — ask when you book", price: "Ask when you book" },
    { name: "Ice Cream", description: "Special order — ask when you book", price: "Ask when you book" },
    { name: "Waffle Nachos", description: "Special order — ask when you book", price: "Ask when you book" },
  ],

  audiences: [
    { icon: "🏢", label: "Corporate Events" },
    { icon: "🎒", label: "Schools" },
    { icon: "🧺", label: "Picnics" },
    { icon: "⛪", label: "Churches" },
    { icon: "🧸", label: "Daycare" },
  ],

  faq: [
    {
      question: "Do you cater private events and birthday parties?",
      answer:
        "Yes. StreetDogz books private events including birthday parties, graduations, family reunions and company gatherings throughout the St. Louis metro area. Call (314) 782-5423 or email streetdogz314@gmail.com to check availability for your date.",
    },
    {
      question: "How do I book the food truck for my event?",
      answer:
        "Contact us with your date, location and estimated guest count. We'll send an invoice, and your date is confirmed once the invoice is paid.",
    },
    {
      question: "Is there a minimum charge to book StreetDogz?",
      answer:
        "Yes, there is a minimum fee for private and catered events. The exact minimum depends on your guest count, location and event length — reach out and we'll give you a quote.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "StreetDogz serves St. Louis city, St. Louis County, St. Charles and the Metro East area of Illinois.",
    },
    {
      question: "What's on the menu?",
      answer:
        "Beef hot dogs, Chicago-style dogs, chili cheese dogs, beef Polish sausage, beef hot links, pork bratwurst, cheese nachos, chili cheese nachos, chips and drinks.",
    },
    {
      question: "How long has StreetDogz been in business?",
      answer: "StreetDogz has been serving the St. Louis area since 2015.",
    },
  ],

  social: {
    googleBusinessProfile:
      // Canonical Maps place URL. Tracking params stripped.
      // Stable CID fallback: https://maps.google.com/?cid=15250853552196803255
      "https://www.google.com/maps/place/StreetDogz+Hot+Dog+Food+Truck/@38.6531501,-90.243616,11z/data=!3m1!4b1!4m6!3m5!1s0x48f88dd858459215:0xd3a5ea80d431dab7!8m2!3d38.6531501!4d-90.243616!16s%2Fg%2F11tp5wlkbd",
    facebook: "https://www.facebook.com/streetdogzfoodtruck/",
    instagram: "https://www.instagram.com/streetdogz_hotdog_truck",
  },

  logo: "/assets/logo.png",
  logoRaster: "/assets/logo.png",
  ogImage: "/assets/og-image.jpg",
};