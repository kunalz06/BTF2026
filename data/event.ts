export type Host = {
  name: "GitHub" | "GDG India" | "Google Cloud";
  description: string;
};

export type Highlight = {
  title: string;
  subtitle: string;
  accent: "cyan" | "purple" | "blue" | "green";
};

export type TimelineItem = {
  title: string;
  value: string;
  detail: string;
};

export type Rule = {
  title: string;
  value: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type EventContent = {
  name: string;
  eventType: string;
  eyebrow: string;
  tagline: string;
  description: string;
  date: { iso: string; display: string };
  venue: {
    name: string;
    displayName: string;
    address: string;
    mapsUrl: string;
    hotelUrl: string;
  };
  paymentDeadline: { iso: string; display: string };
  durationHours: number;
  experiences: readonly string[];
  eligibility: string;
  team: {
    minMembers: number;
    maxMembers: number;
    leadRule: string;
  };
  fee: {
    amountInr: number;
    display: string;
  };
  participationGuidance: string;
  hosts: readonly Host[];
  highlights: readonly Highlight[];
  about: {
    heading: string;
    body: string;
    features: readonly { title: string; body: string }[];
  };
  keyInformation: readonly { label: string; value: string }[];
  timeline: readonly TimelineItem[];
  rules: readonly Rule[];
  faq: readonly FaqItem[];
  cta: {
    heading: string;
    body: string;
    actionLabel: string;
  };
};

export const eventContent = {
  name: "BUILD THE FUTURE HACKATHON",
  eventType: "Annual hackathon plus event",
  eyebrow: "Annual Hackathon Plus Event",
  tagline: "Innovate. Collaborate. Build what's next.",
  description:
    "An annual hackathon plus event jointly hosted by GitHub, GDG India, and Google Cloud, bringing college students together for expert lectures, networking, and 36 hours of collaborative building.",
  date: {
    iso: "2026-11-01",
    display: "1 November 2026",
  },
  venue: {
    name: "ITC Royal Bengal",
    displayName: "ITC Royal Bengal, Kolkata",
    address: "1 JBS Haldane Avenue, Kolkata 700046, West Bengal, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=ITC%20Royal%20Bengal%2C%201%20JBS%20Haldane%20Avenue%2C%20Kolkata%20700046%2C%20West%20Bengal%2C%20India",
    hotelUrl: "https://www.itchotels.com/in/en/itcroyalbengal-kolkata",
  },
  paymentDeadline: {
    iso: "2026-10-02",
    display: "2 October 2026",
  },
  durationHours: 36,
  experiences: [
    "Industry expert lectures",
    "Networking opportunities",
    "36-hour hackathon",
  ],
  eligibility: "College students only",
  team: {
    minMembers: 2,
    maxMembers: 6,
    leadRule: "The participant who creates the team becomes the team lead by default",
  },
  fee: {
    amountInr: 4500,
    display: "₹4,500 per participant",
  },
  participationGuidance:
    "Create your account and complete team formation through the Participation portal. Payment remains offline through your respective campus GDG head.",
  hosts: [
    {
      name: "GitHub",
      description: "Joint host supporting the developer community and collaborative building.",
    },
    {
      name: "GDG India",
      description: "Joint host connecting college developer communities across India.",
    },
    {
      name: "Google Cloud",
      description: "Joint host supporting cloud-powered learning and innovation.",
    },
  ],
  highlights: [
    { title: "36 Hours", subtitle: "Hackathon", accent: "cyan" },
    { title: "Industry Experts", subtitle: "Lectures & insights", accent: "purple" },
    { title: "Networking", subtitle: "Meet & collaborate", accent: "blue" },
    { title: "Build the Future", subtitle: "Real-world impact", accent: "green" },
  ],
  about: {
    heading: "A Hackathon Plus Experience",
    body:
      "More than a hackathon, the event combines a 36-hour build sprint with industry expert lectures, networking opportunities, and practical collaboration among college students.",
    features: [
      {
        title: "Industry Expert Lectures",
        body: "Learn from industry professionals and connect ideas to real-world practice.",
      },
      {
        title: "Networking Opportunities",
        body: "Meet fellow students, mentors, and members of the wider developer community.",
      },
      {
        title: "36-Hour Hackathon",
        body: "Collaborate intensively, turn ideas into working outcomes, and keep building through the full 36-hour format.",
      },
    ],
  },
  keyInformation: [
    { label: "Date", value: "1 November 2026" },
    { label: "Venue", value: "ITC Royal Bengal, Kolkata" },
    { label: "Format", value: "36-hour hackathon + industry lectures + networking" },
    { label: "Hosted by", value: "GitHub · GDG India · Google Cloud" },
  ],
  timeline: [
    {
      title: "Registration & Team Formation",
      value: "Participation Portal",
      detail: "Create your account, create or join one team, and select your team's problem statement through the website.",
    },
    {
      title: "Payment Deadline",
      value: "2 October 2026",
      detail: "Complete the ₹4,500 per-participant payment through your respective campus GDG head.",
    },
    {
      title: "Event Date",
      value: "1 November 2026",
      detail: "The hackathon plus event begins at ITC Royal Bengal, Kolkata.",
    },
  ],
  rules: [
    { title: "Eligibility", value: "College students only" },
    { title: "Account Registration", value: "Every participant creates an individual account through the Participation portal" },
    { title: "Team Formation", value: "Create a new team or join an existing team through the Participation portal using the 7-character team ID" },
    { title: "Team Size", value: "Minimum 2 members · Maximum 6 members" },
    { title: "Membership", value: "A participant can be part of only one team" },
    { title: "Team Lead", value: "The participant who creates the team becomes the team lead by default" },
    { title: "Problem Statement", value: "Each team must select exactly one problem statement through the portal" },
    { title: "Registration Fee", value: "₹4,500 per participant" },
    { title: "Payment", value: "Payment is completed through the respective campus GDG head, not through the web portal" },
    { title: "Payment Deadline", value: "2 October 2026" },
  ],
  faq: [
    {
      question: "Who can participate?",
      answer: "This event is only for college students.",
    },
    {
      question: "How many members can be in a team?",
      answer: "Each team must have at least 2 members and can have up to 6 members.",
    },
    {
      question: "How do I register for the hackathon?",
      answer: "Create your participant account on the Participation portal, then create a new team or join an existing team using its 7-character team ID.",
    },
    {
      question: "Does every team need a team lead?",
      answer: "Yes. The participant who creates the team becomes the team lead by default.",
    },
    {
      question: "Can one participant join more than one team?",
      answer: "No. Each participant account can belong to only one team.",
    },
    {
      question: "How is a problem statement selected?",
      answer: "Each team must select exactly one problem statement through the Participation portal. The team leader manages the team's problem selection.",
    },
    {
      question: "What is the registration fee?",
      answer: "The event registration fee is ₹4,500 per participant.",
    },
    {
      question: "What is the last date for payment?",
      answer: "The last date of payment is 2 October 2026.",
    },
    {
      question: "How is the registration fee paid?",
      answer: "The ₹4,500 per-participant payment is not collected through the web portal. Complete payment through your respective campus GDG head by 2 October 2026.",
    },
    {
      question: "What if my college does not have a GDG on Campus?",
      answer: "Complete registration and team formation through the Participation portal, then contact the nearest listed college GDG for payment coordination.",
    },
    {
      question: "Where is the event being held?",
      answer: "The event venue is ITC Royal Bengal, 1 JBS Haldane Avenue, Kolkata 700046, West Bengal, India.",
    },
    {
      question: "How long is the hackathon?",
      answer: "The hackathon runs for 36 hours.",
    },
  ],
  cta: {
    heading: "Are you ready to build the future?",
    body: "Create your account and form or join your team through the Participation portal. Complete the registration fee separately through your campus GDG head.",
    actionLabel: "Open Participation Portal",
  },
} as const satisfies EventContent;
