import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("single-page navigation", () => {
  it("renders every required anchor section", () => {
    const { container } = render(<HomePage />);
    for (const id of ["home", "about", "event", "timeline", "rules", "faq", "participate"]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("uses participation guidance rather than direct registration", () => {
    render(<HomePage />);
    const ctas = screen.getAllByRole("link", { name: /get involved/i });
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/#participate");
    }
    expect(screen.queryByRole("button", { name: /checkout|pay|register/i })).not.toBeInTheDocument();
  });

  it("links to the problem statements page", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("link", { name: "Problems" })[0]).toHaveAttribute(
      "href",
      "/problem-statements",
    );
  });

  it("links to the colleges page", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("link", { name: "Colleges" })[0]).toHaveAttribute(
      "href",
      "/colleges",
    );
  });

  it("renders partner logos throughout the site", () => {
    render(<HomePage />);
    for (const brand of ["GitHub", "GDG India", "Google Cloud"]) {
      expect(screen.getAllByLabelText(brand).length).toBeGreaterThanOrEqual(4);
    }
  });
});
