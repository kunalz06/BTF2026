import type { Metadata } from "next";
import { eventContent } from "@/data/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `${eventContent.name} 2026`,
  description: `${eventContent.eventType} on ${eventContent.date.display}, jointly hosted by GitHub, GDG India, and Google Cloud, featuring a 36-hour hackathon, industry expert lectures, and networking for college students.`,
  applicationName: eventContent.name,
  keywords: ["hackathon", "college students", "GitHub", "GDG India", "Google Cloud", "36-hour hackathon"],
  openGraph: {
    title: `${eventContent.name} 2026`,
    description: `${eventContent.tagline} ${eventContent.date.display}.`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${eventContent.name} 2026`,
    description: `${eventContent.tagline} ${eventContent.date.display}.`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
