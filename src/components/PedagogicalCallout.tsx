import { Lightbulb, OctagonAlert, Microscope } from "lucide-react";
import type { ReactNode } from "react";

type CalloutVariant = "intuition" | "piege" | "capot";

type Props = {
  variant: CalloutVariant;
  title: string;
  children: ReactNode;
};

const ACCENT: Record<CalloutVariant, string> = {
  intuition: "border-l-amber-500/70",
  piege: "border-l-red-500/70",
  capot: "border-l-sky-500/70",
};

const ICON_COLOR: Record<CalloutVariant, string> = {
  intuition: "text-amber-400/90",
  piege: "text-red-400/90",
  capot: "text-sky-400/90",
};

function CalloutIcon({ variant }: { variant: CalloutVariant }) {
  if (variant === "intuition") return <Lightbulb size={15} />;
  if (variant === "piege") return <OctagonAlert size={15} />;
  return <Microscope size={15} />;
}

export function PedagogicalCallout({ variant, title, children }: Props) {
  return (
    <aside className={`rounded-md border border-white/[0.07] border-l-2 bg-white/[0.02] px-4 py-3.5 ${ACCENT[variant]}`}>
      <p className={`flex items-center gap-2 text-[13px] font-semibold text-slate-200 ${ICON_COLOR[variant]}`}>
        <CalloutIcon variant={variant} />
        <span className="text-slate-200">{title}</span>
      </p>
      <div className="mt-1.5 text-sm leading-relaxed text-slate-400">{children}</div>
    </aside>
  );
}
