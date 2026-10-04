type Props = {
  progress: number;
};

export function SidebarProgress({ progress }: Props) {
  return (
    <div className="border-b border-white/[0.06] pb-6">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-slate-500">Progression</span>
        <span className="font-mono text-xs text-slate-300">{progress}%</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div className="h-full rounded-full bg-orange-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
