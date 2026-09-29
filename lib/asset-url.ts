const stripEdgeSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

export function getEventAssetUrl(path: string): string | null {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/g, "");
  const bucket = process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET
    ? stripEdgeSlashes(process.env.NEXT_PUBLIC_EVENT_ASSET_BUCKET)
    : "";
  const objectPath = stripEdgeSlashes(path);

  if (!projectUrl || !bucket || !objectPath) return null;
  return `${projectUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
}
