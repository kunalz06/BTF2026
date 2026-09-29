import type { ProblemStatement } from "@/data/problem-statements";

type PdfLine = {
  text: string;
  font: "regular" | "bold";
  size: number;
  leading: number;
  color?: [number, number, number];
  gapBefore?: number;
  pageBreakBefore?: boolean;
};

const encoder = new TextEncoder();

function normalizeAscii(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/…/g, "...")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdf(value: string) {
  return normalizeAscii(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(text: string, maxChars: number) {
  const words = normalizeAscii(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function addWrapped(
  lines: PdfLine[],
  text: string,
  options: Omit<PdfLine, "text"> & { maxChars: number },
) {
  for (const wrapped of wrapText(text, options.maxChars)) {
    lines.push({
      text: wrapped,
      font: options.font,
      size: options.size,
      leading: options.leading,
      color: options.color,
      gapBefore: options.gapBefore,
    });
  }
}

function addSection(
  lines: PdfLine[],
  title: string,
  body?: string,
  bullets?: readonly string[],
  pageBreakBefore = false,
) {
  lines.push({
    text: title,
    font: "bold",
    size: 12,
    leading: 17,
    color: [0.06, 0.09, 0.15],
    gapBefore: 8,
    pageBreakBefore,
  });

  if (body) {
    addWrapped(lines, body, {
      maxChars: 86,
      font: "regular",
      size: 9.5,
      leading: 14,
      color: [0.16, 0.21, 0.29],
    });
  }

  if (bullets) {
    for (const bullet of bullets) {
      const wrapped = wrapText(bullet, 78);
      wrapped.forEach((line, index) => {
        lines.push({
          text: index === 0 ? `- ${line}` : `  ${line}`,
          font: "regular",
          size: 9.2,
          leading: 13,
          color: [0.16, 0.21, 0.29],
        });
      });
    }
  }
}

function buildLines(problem: ProblemStatement) {
  const lines: PdfLine[] = [];
  lines.push({ text: `PROBLEM STATEMENT | ${problem.id}`, font: "bold", size: 8, leading: 24, color: [0.15, 0.51, 1] });

  for (const titleLine of wrapText(problem.title, 44)) {
    lines.push({ text: titleLine, font: "bold", size: 22, leading: 25, color: [0.06, 0.09, 0.15] });
  }

  lines.push({
    text: `${problem.track}  |  ${problem.type}  |  ${problem.difficulty}`,
    font: "bold",
    size: 8.5,
    leading: 15,
    color: [0.22, 0.32, 0.48],
    gapBefore: 3,
  });

  addWrapped(lines, problem.summary, {
    maxChars: 82,
    font: "regular",
    size: 10.5,
    leading: 15,
    color: [0.32, 0.38, 0.47],
    gapBefore: 5,
  });

  addSection(lines, "Problem Context", problem.problem);
  addSection(lines, "Objective", problem.objective);
  addSection(lines, "Functional Requirements", undefined, problem.requirements);
  addSection(lines, "Constraints and Safety Boundaries", undefined, problem.constraints);
  addSection(lines, "Expected Deliverables", undefined, problem.deliverables, true);
  addSection(lines, "Evaluation Criteria", undefined, problem.evaluation);

  addWrapped(
    lines,
    "Submission note: clearly state assumptions, limitations, test conditions, datasets, APIs, pretrained models, and hardware modules used.",
    {
      maxChars: 86,
      font: "regular",
      size: 8.5,
      leading: 13,
      color: [0.32, 0.38, 0.47],
      gapBefore: 8,
    },
  );

  return lines;
}

function rgb([r, g, b]: [number, number, number]) {
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`;
}

function textCommand(
  x: number,
  y: number,
  line: PdfLine,
) {
  const font = line.font === "bold" ? "F2" : "F1";
  return `BT /${font} ${line.size} Tf ${rgb(line.color ?? [0.1, 0.1, 0.1])} 1 0 0 1 ${x} ${y} Tm (${escapePdf(line.text)}) Tj ET`;
}

function pageStream(problem: ProblemStatement, pageLines: PdfLine[], pageNumber: number) {
  const parts: string[] = [];
  parts.push("0.027 0.063 0.102 rg 0 804 595 38 re f");
  parts.push("BT /F2 9 Tf 1 1 1 rg 1 0 0 1 50 820 Tm (BUILD THE FUTURE HACKATHON 2026) Tj ET");

  const accent: [number, number, number] =
    problem.track === "Drones"
      ? [0.15, 0.51, 1]
      : problem.track === "AI Software"
        ? [0.53, 0.34, 1]
        : [0.13, 0.86, 0.56];

  parts.push(`${rgb(accent)} 526 818 9 9 re f`);

  let y = 777;
  for (const line of pageLines) {
    y -= line.gapBefore ?? 0;
    parts.push(textCommand(50, y, line));
    y -= line.leading;
  }

  parts.push("0.42 0.47 0.56 rg");
  parts.push(`BT /F1 7.5 Tf 1 0 0 1 50 31 Tm (${escapePdf(problem.id + " | " + problem.track + " | " + problem.type)}) Tj ET`);
  parts.push(`BT /F1 7.5 Tf 1 0 0 1 510 31 Tm (Page ${pageNumber}) Tj ET`);
  return parts.join("\n");
}

function paginate(lines: PdfLine[]) {
  const pages: PdfLine[][] = [];
  let current: PdfLine[] = [];
  let used = 0;
  const capacity = 690;

  for (const line of lines) {
    const cost = line.leading + (line.gapBefore ?? 0);
    if (current.length > 0 && (line.pageBreakBefore || used + cost > capacity)) {
      pages.push(current);
      current = [];
      used = 0;
    }

    current.push(line);
    used += cost;
  }

  if (current.length) pages.push(current);
  return pages;
}

function byteLength(value: string) {
  return encoder.encode(value).length;
}

export function generateProblemPdf(problem: ProblemStatement) {
  const pageGroups = paginate(buildLines(problem));
  const pageCount = pageGroups.length;
  const regularFontId = 3 + pageCount * 2;
  const boldFontId = regularFontId + 1;
  const objects: string[] = [];

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";

  const kids = pageGroups.map((_, index) => `${3 + index * 2} 0 R`).join(" ");
  objects[2] = `<< /Type /Pages /Count ${pageCount} /Kids [${kids}] >>`;

  pageGroups.forEach((group, index) => {
    const pageId = 3 + index * 2;
    const contentId = pageId + 1;
    const stream = pageStream(problem, group, index + 1);

    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${byteLength(stream)} >>\nstream\n${stream}\nendstream`;
  });

  objects[regularFontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[boldFontId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  let pdf = "%PDF-1.4\n% BTF2026\n";
  const offsets: number[] = [0];

  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = byteLength(pdf);
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = byteLength(pdf);
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return encoder.encode(pdf);
}
