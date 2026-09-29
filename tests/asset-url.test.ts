import { afterEach, describe, expect, it } from "vitest";
import { getEventAssetUrl } from "@/lib/asset-url";

const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalBucket = process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET;

afterEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
  process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET = originalBucket;
});

describe("getEventAssetUrl", () => {
  it("constructs a conventional Supabase public object URL", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co/";
    process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET = "event-assets";
    expect(getEventAssetUrl("/poster.svg")).toBe(
      "https://example.supabase.co/storage/v1/object/public/event-assets/poster.svg",
    );
  });

  it("returns null when public storage configuration is missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET;
    expect(getEventAssetUrl("poster.svg")).toBeNull();
  });

  it("normalizes extra slashes", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co///";
    process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET = "/event-assets/";
    expect(getEventAssetUrl("///folder/poster.svg")).toBe(
      "https://example.supabase.co/storage/v1/object/public/event-assets/folder/poster.svg",
    );
  });
});
