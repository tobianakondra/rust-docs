import { ShieldCheck, Gauge, Users } from "lucide-react";

type Props = {
  title: string;
  text: string;
  icon: "shield" | "gauge" | "users";
};

export function BenefitCard({ title, text, icon }: Props) {
  return (
    <article className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5">
      <span className="inline-flex rounded-md border border-white/10 bg-white/[0.03] p-2 text-slate-300">
        {icon === "shield" ? <ShieldCheck size={17} /> : null}
        {icon === "gauge" ? <Gauge size={17} /> : null}
        {icon === "users" ? <Users size={17} /> : null}
      </span>
      <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-100">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{text}</p>
    </article>
  );
}
