import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-4xl">
      <Badge>{eyebrow}</Badge>
      <h2
        className={`font-display mt-5 text-4xl leading-[.95] font-black text-balance uppercase sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-8 ${
            light ? "text-white/60" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
