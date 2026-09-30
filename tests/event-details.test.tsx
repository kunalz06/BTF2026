import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EventDetailsPage from "@/app/event-details/page";
import { eventGuests } from "@/data/event-details";

describe("event details page", () => {
  it("shows reporting, main-event, food and prize information", () => {
    render(<EventDetailsPage />);

    expect(screen.getAllByText(/31 October 2026/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/4:00 PM/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1 November 2026/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Food included/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/₹1 Crore/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/₹4,50,000/i).length).toBeGreaterThan(0);
  });

  it("uses researched current professional designations", () => {
    expect(eventGuests.map((guest) => [guest.name, guest.designation])).toEqual([
      ["Sundar Pichai", "CEO of Google and Alphabet"],
      ["Preeti Lobana", "VP and Country Manager, India, Google"],
      ["Manojit Sengupta", "Delivery Centre Head – Eastern Region, TCS"],
      ["Thomas Dohmke", "Former CEO, GitHub (2021–2025) · Founder, Entire"],
    ]);
  });

  it("does not mislabel Thomas Dohmke as the current GitHub CEO", () => {
    render(<EventDetailsPage />);
    expect(screen.getAllByText(/GitHub does not currently list a CEO/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/^CEO, GitHub$/i)).not.toBeInTheDocument();
  });
});
