const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const bucket = process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET;
if (!projectUrl || !bucket) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_EVENT_ASSET_BUCKET");
  process.exit(1);
}
const url = `${projectUrl.replace(/\/+$/, "")}/storage/v1/object/public/${bucket.replace(/^\/+|\/+$/g, "")}/poster-2026.svg`;
const response = await fetch(url, { method: "GET" });
if (!response.ok) {
  console.error(`Public storage check failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}
console.log(`Public storage check PASS: ${response.status} ${url}`);
