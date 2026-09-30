import type { Metadata } from "next";
import { eventContent } from "@/data/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `${eventContent.name} 2026`,
  description: `${eventContent.eventType} with project presentations due ${eventContent.presentationDeadline.display}, team reporting on ${eventContent.reporting.display} by ${eventContent.reporting.time}, the main event on ${eventContent.date.display} at ${eventContent.venue.displayName}, a 36-hour hackathon, food included, and a ${eventContent.prizes.totalPrizePoolDisplay} total prize pool.`,
  applicationName: eventContent.name,
  keywords: ["hackathon", "college students", "GitHub", "GDG India", "Google Cloud", "36-hour hackathon"],
  openGraph: {
    title: `${eventContent.name} 2026`,
    description: `${eventContent.tagline} Teams report ${eventContent.reporting.fullDisplay}; main event ${eventContent.date.display} at ${eventContent.venue.displayName}.`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${eventContent.name} 2026`,
    description: `${eventContent.tagline} ${eventContent.date.display} at ${eventContent.venue.displayName}.`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
