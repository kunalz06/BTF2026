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
    leadRule: "One member must be selected as team lead",
  },
  fee: {
    amountInr: 4500,
    display: "₹4,500 per participant",
  },
  participationGuidance:
    "For payment and more details, contact your respective college GDG team leads.",
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
      title: "Payment Deadline",
      value: "2 October 2026",
      detail: "Complete payment through your respective college GDG team lead.",
    },
    {
      title: "Event Date",
      value: "1 November 2026",
      detail: "The hackathon plus event begins on this date.",
    },
    {
      title: "Contact College GDG Team Leads",
      value: "Payment and more details",
      detail: "Your respective college GDG team lead is the participation contact point.",
    },
  ],
  rules: [
    { title: "Eligibility", value: "College students only" },
    { title: "Team Size", value: "Minimum 2 members · Maximum 6 members" },
    { title: "Team Lead", value: "One member must be selected as team lead" },
    { title: "Registration Fee", value: "₹4,500 per participant" },
    { title: "Payment Deadline", value: "2 October 2026" },
    {
      title: "Payment & Details",
      value: "Contact your respective college GDG team leads",
    },
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
      question: "Does every team need a team lead?",
      answer: "Yes. One member of each team must be selected as the team lead.",
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
      question: "How do participants pay or get more details?",
      answer: "Contact your respective college GDG team leads for payment and more details.",
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
    body: "Contact your respective college GDG team lead for payment and participation details.",
    actionLabel: "Contact Your College GDG Team",
  },
} as const satisfies EventContent;
