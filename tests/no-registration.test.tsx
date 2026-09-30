import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { eventContent } from "@/data/event";

describe("participation and payment separation", () => {
  it("does not define a direct online payment destination", () => {
    const content = eventContent as unknown as Record<string, unknown>;
    const unsupportedFields = [
      "paymentUrl",
      "paymentAccount",
      "phoneNumber",
      "speakers",
      "prizePool",
      "judgingCriteria",
    ];

    for (const field of unsupportedFields) {
      expect(Object.prototype.hasOwnProperty.call(content, field)).toBe(false);
    }
  });

  it("routes registration to the Participation portal and keeps payment offline", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getAllByRole("link", { name: /participation|get involved/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(/payment is made through your campus gdg head/i),
    ).toBeInTheDocument();

    expect(
      container.querySelector('a[href*="payment"], a[href*="checkout"]'),
    ).not.toBeInTheDocument();
    expect(container.textContent?.toLowerCase()).not.toContain("checkout");
  });
});
