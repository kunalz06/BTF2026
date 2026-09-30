import { describe, expect, it } from "vitest";
import { eventContent } from "@/data/event";

describe("verified event content", () => {
  it("matches every supplied event fact", () => {
    expect(eventContent.name).toBe("BUILD THE FUTURE HACKATHON");
    expect(eventContent.date.display).toBe("1 November 2026");
    expect(eventContent.hosts.map((host) => host.name)).toEqual([
      "GitHub",
      "GDG India",
      "Google Cloud",
    ]);
    expect(eventContent.durationHours).toBe(36);
    expect(eventContent.eligibility).toBe("College students only");
    expect(eventContent.team.minMembers).toBe(2);
    expect(eventContent.team.maxMembers).toBe(6);
    expect(eventContent.team.leadRule).toBe("The participant who creates the team becomes the team lead by default");
    expect(eventContent.fee.display).toBe("₹4,500 per participant");
    expect(eventContent.paymentDeadline.display).toBe("2 October 2026");
    expect(eventContent.venue.displayName).toBe("ITC Royal Bengal, Kolkata");
    expect(eventContent.venue.address).toBe(
      "1 JBS Haldane Avenue, Kolkata 700046, West Bengal, India",
    );
    expect(eventContent.venue.mapsUrl).toContain("google.com/maps/search");
    expect(eventContent.participationGuidance).toContain("Participation portal");
    expect(eventContent.participationGuidance).toContain("campus GDG head");
  });

  it("contains the three promised experience pillars", () => {
    expect(eventContent.experiences).toEqual([
      "Industry expert lectures",
      "Networking opportunities",
      "36-hour hackathon",
    ]);
  });
});

import { metadata } from "@/app/layout";

describe("page metadata", () => {
  it("uses only confirmed event information", () => {
    expect(metadata.title).toBe("BUILD THE FUTURE HACKATHON 2026");
    expect(metadata.description).toContain("1 November 2026");
    expect(metadata.description).toContain("36-hour hackathon");
    expect(metadata.description).toContain("ITC Royal Bengal");
    const serialized = JSON.stringify(metadata).toLowerCase();
    for (const unsupported of ["speaker", "prize", "register now"]) {
      expect(serialized).not.toContain(unsupported);
    }
  });
});
