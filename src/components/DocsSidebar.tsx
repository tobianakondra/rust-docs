"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function DocsSidebar({ open, onClose, children }: Props) {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-white/[0.06] py-8 pr-6 lg:block">
        <SidebarShell>{children}</SidebarShell>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Fermer" onClick={() => onClose()} className="absolute inset-0 bg-black/60" />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto border-r border-white/10 bg-[#0d1320] p-6">
            <div className="mb-6 flex justify-end">
              <button
                type="button"
                onClick={() => onClose()}
                className="rounded-md border border-white/10 p-1.5 text-slate-400"
                aria-label="Fermer la navigation"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarShell>{children}</SidebarShell>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function SidebarShell({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Sommaire</p>
        <p className="mt-1 text-sm font-medium text-slate-200">Partie 1 — Introduction</p>
      </div>
      {children}
    </div>
  );
}
