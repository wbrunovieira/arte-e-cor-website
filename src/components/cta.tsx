import { NavigationArrowIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, SITE, whatsappLink } from "@/lib/site";

type ButtonProps = {
  message?: string;
  size?: "md" | "sm";
  className?: string;
};

const base =
  "group inline-flex items-center justify-between whitespace-nowrap rounded-full font-semibold transition-transform duration-500 ease-premium active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4";
const island =
  "grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-premium group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105";

export function WhatsAppButton({ message, size = "md", className = "" }: ButtonProps) {
  const md = size === "md";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-accent text-accent-ink shadow-[0_20px_40px_-20px_rgb(242_117_39/0.95),inset_0_1px_0_rgb(255_255_255/0.35)] focus-visible:ring-accent/40 ${
        md ? "gap-5 py-1.5 pl-6 pr-1.5 text-base" : "gap-3 py-1 pl-4 pr-1 text-sm"
      } ${className}`}
    >
      <span>{CTA.whatsapp}</span>
      <span aria-hidden className={`${island} bg-accent-ink text-accent ${md ? "size-11" : "size-8"}`}>
        <WhatsappLogoIcon weight="fill" className={md ? "size-5" : "size-4"} />
      </span>
    </a>
  );
}

export function DirectionsButton({
  size = "md",
  className = "",
  tone = "default",
}: Omit<ButtonProps, "message"> & { tone?: "default" | "onDark" }) {
  const md = size === "md";
  const tones =
    tone === "onDark"
      ? { shell: "bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md focus-visible:ring-white/40", island: "bg-white/15 text-white" }
      : { shell: "bg-surface text-ink ring-1 ring-inset ring-ink/10 focus-visible:ring-brand/30", island: "bg-ink/[0.06] text-brand" };
  return (
    <a
      href={SITE.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${tones.shell} ${md ? "gap-5 py-1.5 pl-6 pr-1.5 text-base" : "gap-3 py-1 pl-4 pr-1 text-sm"} ${className}`}
    >
      <span>{CTA.directions}</span>
      <span aria-hidden className={`${island} ${tones.island} ${md ? "size-11" : "size-8"}`}>
        <NavigationArrowIcon weight="regular" className={md ? "size-5" : "size-4"} />
      </span>
    </a>
  );
}
