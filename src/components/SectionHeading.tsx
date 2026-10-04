type Props = {
  index: string;
  kicker: string;
  title: string;
  description: string;
};

export function SectionHeading({ index, kicker, title, description }: Props) {
  return (
    <div className="border-b border-white/[0.06] pb-6">
      <p className="font-mono text-xs tracking-widest text-slate-500">
        {index} <span className="mx-1.5 text-slate-700">/</span>
        <span className="uppercase">{kicker}</span>
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{title}</h2>
      <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
