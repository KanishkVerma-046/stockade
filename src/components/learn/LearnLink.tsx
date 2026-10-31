import type { LearnLink as LearnLinkData, LearnTopic } from '../../lib/learn-links';

// A small "?" link from a tool control to the Learning Center post that
// explains it. It opens a new tab because resting orders, the open position and
// the mode aren't persisted, so leaving the page would lose them. It sits next
// to its control, never inside a button, and has no key handling of its own:
// the islands' B/S/F and Space shortcuts listen on window and only skip inputs.
// The 24px hit area keeps a 16px footprint through the negative margin.
export default function LearnLink({ href, label, className = '' }: LearnLinkData & { className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      className={`group inline-flex items-center justify-center w-6 h-6 -m-1 shrink-0 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#f59e0b] ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[var(--c-border-strong)] text-[9px] font-mono leading-none text-[var(--c-text-subtle)] transition-colors group-hover:border-[#f59e0b] group-hover:text-[#f59e0b] group-focus-visible:border-[#f59e0b] group-focus-visible:text-[#f59e0b]"
      >
        ?
      </span>
    </a>
  );
}

// The lower pane both charts share (volume, RSI or MACD on the 'vol' price
// scale, whose top margin is 0.82 of the pane). Neither chart has a legend, so
// the pane gets a small label carrying its learn link, shown with the pane.
export type BottomIndicator = 'vol' | 'rsi' | 'macd';
export const BOTTOM_PANE_TOP = 0.82;

const PANES: Record<BottomIndicator, { name: string; topic: LearnTopic }> = {
  vol:  { name: 'VOL',          topic: 'volume' },
  rsi:  { name: 'RSI 14',       topic: 'rsi' },
  macd: { name: 'MACD 12 26 9', topic: 'macd' },
};

// `top` is the pane's top edge in px, measured once the chart has laid out;
// until then (and in the static HTML) a percentage stands in.
export function BottomPaneLabel({ indicator, top, learn }: {
  indicator: BottomIndicator;
  top: number | null;
  learn?: Partial<Record<LearnTopic, LearnLinkData>>;
}) {
  const pane = PANES[indicator];
  const link = learn?.[pane.topic];
  if (!link) return null;
  return (
    <div className="absolute left-2 z-10 flex items-center gap-1.5 pointer-events-none" style={{ top: top ?? '74%' }}>
      <span className="text-[10px] font-mono text-[var(--c-text-faint)]">{pane.name}</span>
      <LearnLink {...link} className="pointer-events-auto" />
    </div>
  );
}
