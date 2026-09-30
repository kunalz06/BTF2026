export type EventGuest = {
  name: string;
  designation: string;
  company: string;
  appearance: string;
  mode: "Online" | "In person";
  imageUrl: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const eventGuests: readonly EventGuest[] = [
  {
    name: "Sundar Pichai",
    designation: "CEO of Google and Alphabet",
    company: "Google & Alphabet",
    appearance: "Welcome Speech",
    mode: "Online",
    imageUrl: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/sundar-208x208.width-400.format-webp.webp",
    sourceUrl: "https://blog.google/authors/sundar-pichai/",
    sourceLabel: "Google",
  },
  {
    name: "Preeti Lobana",
    designation: "VP and Country Manager, India, Google",
    company: "Google India",
    appearance: "Industry Leadership Session",
    mode: "In person",
    imageUrl: "https://bsmedia.business-standard.com/_media/bs/img/article/2024-12/17/full/1734378070-0789.jpg?im=FitAndFill%3D%28382%2C233%29",
    sourceUrl: "https://blog.google/intl/en-in/company-news/from-seed-to-scale-partnering-with-indias-startups-to-build-the-ai-future/",
    sourceLabel: "Google India",
  },
  {
    name: "Manojit Sengupta",
    designation: "Delivery Centre Head – Eastern Region, TCS",
    company: "Tata Consultancy Services",
    appearance: "Industry Leadership Session",
    mode: "In person",
    imageUrl: "https://indianchamberofcommerce.glueup.com/resources/public/images/square/150/c8e0cf7a-8383-4c1a-af37-6498b0a8a7cb.png",
    sourceUrl: "https://www.linkedin.com/posts/cii4er_icteast2026-25yearsoficteast-easternindia-activity-7498960156618293248-Dn42",
    sourceLabel: "CII Eastern Region",
  },
  {
    name: "Thomas Dohmke",
    designation: "Former CEO, GitHub (2021–2025) · Founder, Entire",
    company: "Formerly GitHub",
    appearance: "Developer Leadership Address",
    mode: "Online",
    imageUrl: "https://github.com/ashtom.png?size=600",
    sourceUrl: "https://github.blog/news-insights/company-news/goodbye-github/",
    sourceLabel: "GitHub",
  },
];

export const guestAttendanceNote =
  "Attendance and appearance mode are event-organizer details. Public source links are provided to verify current professional designations.";
