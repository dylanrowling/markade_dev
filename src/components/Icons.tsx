/**
 * Icons.tsx
 * Inline SVG registry loaded from /src/icons at build time (Vite import.meta.glob).
 * - 2025-09-12: First version. Color-normalizes SVGs to use currentColor.
 */

 // Vite will inline the raw SVG text for all files in /src/icons
const files = import.meta.glob("../assets/icons/*.svg", { as: "raw", eager: true }) as Record<string, string>;

const registry: Record<string, string> = {};
for (const [path, raw] of Object.entries(files)) {
  const name = path.split("/").pop()!.replace(".svg", "");
  const trimmed = (raw || "").trim();
  if (!trimmed) continue; // skip empty SVGs

  const svg = trimmed
    // remove xml/doctype noise
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/g, "")
    // let CSS control size (w-*, h-*)
    .replace(/\swidth="[^"]*"/g, "")
    .replace(/\sheight="[^"]*"/g, "")
    // ensure crisp, non-antialiased edges (8-bit vibe)
    .replace(/<svg(\s+)/i, '<svg$1shape-rendering="crispEdges" ')
    // make fills/strokes inherit from CSS color (preserve explicit none)
    .replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"');

  registry[name] = svg;
}

export const availableIcons = Object.keys(registry).sort();
export type IconName = keyof typeof registry | string;

export default function Icon({
  name,
  className = "inline-block w-5 h-5",
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  const svg = registry[name as string];
  if (!svg) return <span className={className} aria-hidden="true" />;
  return (
    <span
      className={className}
      role="img"
      aria-label={title || (name as string)}
      title={title || (name as string)}
      style={{ color: "currentColor" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}