import { getProblemBySlug, problemStatements } from "@/data/problem-statements";
import { generateProblemPdf } from "@/lib/problem-pdf";

export function generateStaticParams() {
  return problemStatements.map((problem) => ({ slug: problem.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return new Response("Problem statement not found", { status: 404 });
  }

  const pdf = generateProblemPdf(problem);

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${problem.id.toLowerCase()}-${problem.slug}.pdf"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
