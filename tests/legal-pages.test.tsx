import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";

describe("legal pages", () => {
  it("publishes a privacy policy covering participant and submission data", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByRole("heading", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(
      screen.getByText(/Project presentations uploaded through the Participation portal/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/website does not process the ₹4,500 participation fee/i),
    ).toBeInTheDocument();
  });

  it("publishes participation terms with the presentation deadline", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getAllByText(/30 October 2026/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/latest successful team upload/i)).toBeInTheDocument();
  });
});
