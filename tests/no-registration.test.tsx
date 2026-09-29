import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { eventContent } from "@/data/event";

describe("informational-only scope", () => {
  it("does not define unsupported logistics or direct-registration fields", () => {
    const content = eventContent as unknown as Record<string, unknown>;
    const unsupportedFields = [
      "registrationUrl",
      "paymentUrl",
      "city",
      "campus",
      "speakers",
      "prizePool",
      "judgingCriteria",
      "tracks",
      "phoneNumber",
      "paymentAccount",
    ];

    for (const field of unsupportedFields) {
      expect(Object.prototype.hasOwnProperty.call(content, field)).toBe(false);
    }
  });

  it("renders no form, checkout, or direct registration control", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector('a[href*="payment"], a[href*="register"], a[href*="checkout"]')).not.toBeInTheDocument();
    expect(container.textContent?.toLowerCase()).not.toContain("register now");
    expect(container.textContent?.toLowerCase()).not.toContain("checkout");
  });
});
