/**
 * Icons.tsx
 * Inline SVG registry loaded from /src/icons at build time (Vite import.meta.glob).
 * - 2025-09-12: First version. Color-normalizes SVGs to use currentColor.
 */

 // Vite will inline the raw SVG text for all files in /src/icons
const files = import.meta.glob("../assets/icons/*.svg", { as: "raw", eager: true }) as Record<string, string>;

// name -> sanitized SVG string
const registry: Record<string, string> = {};
for (const [path, raw] of Object.entries(files)) {
  const name = path.split("/").pop()!.replace(".svg", "");
  const svg = (raw || "")
    // remove xml/doctype noise
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/g, "")
    // let CSS control size (w-*, h-*)
    .replace(/\swidth="[^"]*"/g, "")
    .replace(/\sheight="[^"]*"/g, "")
    // make fills/strokes inherit from currentColor (unless explicitly 'none')
    .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
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