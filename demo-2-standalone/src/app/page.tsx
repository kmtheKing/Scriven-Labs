'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowUpRight,
  Sun,
  Moon,
  GitPullRequest,
  Mic,
  FileText,
  Sparkles,
  Check,
  Search,
  X,
  Lock,
  Laptop,
  EyeOff,
  Share2,
  Database,
} from 'lucide-react';

// ============================================================================
// 1. MINIMAL HIRAEL ROLLING BUTTON & SECTION BADGE
// ============================================================================

function HiraelButton({
  label,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'crimson';
  size?: 'sm' | 'md' | 'lg';
}) {
  const base =
    'group relative inline-flex items-center justify-between rounded-full font-medium tracking-tight transition-all duration-300 select-none overflow-hidden';

  const sizes = {
    sm: 'pl-4 pr-1.5 py-1.5 text-xs gap-2.5',
    md: 'pl-5 pr-2 py-2 text-sm gap-3.5',
    lg: 'pl-6 pr-2 py-2.5 text-sm sm:text-base gap-4',
  }[size];

  const variants = {
    primary:
      'bg-[#0B0B0E] text-[#F8F7F4] dark:bg-[#F4F4F1] dark:text-[#09090B]',
    crimson: 'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
    outline:
      'border border-black/10 dark:border-white/10 bg-transparent text-[#0B0B0E] dark:text-[#F4F4F1] hover:border-black/30 dark:hover:border-white/30',
  }[variant];

  const circleSize = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  }[size];

  const inner = (
    <>
      <span className="relative block overflow-hidden h-[1.25em] leading-[1.25em]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {label}
        </span>
      </span>

      <span
        className={`${circleSize} rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 ${
          variant === 'crimson'
            ? 'bg-white text-[#DC2626]'
            : 'bg-[#DC2626] text-white'
        }`}
      >
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${sizes} ${variants}`}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${sizes} ${variants}`}
    >
      {inner}
    </button>
  );
}

function MinimalBadge({ num, text }: { num: string; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-xs">
      <span className="font-mono text-[#DC2626]">[{num}]</span>
      <span className="text-black/70 dark:text-white/70 font-medium">
        {text}
      </span>
    </div>
  );
}

// ============================================================================
// 2. CALM SILK WAVE HERO CANVAS
// ============================================================================

function SilkCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.004;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const lines = 18;
      for (let i = 0; i < lines; i++) {
        const r = i / lines;
        ctx.beginPath();

        for (let x = 0; x <= w; x += 24) {
          const nx = x / w;
          const y =
            h * 0.45 +
            (r - 0.5) * 170 +
            Math.sin(nx * 3.4 + t + r * 2.1) * 44 +
            Math.cos(nx * 1.9 - t * 0.65 + r * 3.0) * 28;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        if (i === 9) {
          ctx.strokeStyle = isDark
            ? 'rgba(220, 38, 38, 0.26)'
            : 'rgba(220, 38, 38, 0.22)';
          ctx.lineWidth = 1.15;
        } else {
          ctx.strokeStyle = isDark
            ? `rgba(255, 255, 255, ${0.028 + r * 0.03})`
            : `rgba(11, 11, 14, ${0.028 + r * 0.03})`;
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ============================================================================
// 3. WORD-BY-WORD SCROLL REVEAL ("THE PROBLEM" SECTION)
// ============================================================================

const PROBLEM_COPY =
  "The person who knows the answer can't always recall it in the moment. You shipped it weeks ago—the PR, the ticket, the reason—and now you can't quite recall the detail you need for standup, the review, or the handoff. Every tool today summarises meetings after they're over; none hand you your own work the moment you need it.".split(
    ' '
  );

function ScrollWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: any;
}) {
  const start = (index / total) * 0.75;
  const end = start + 0.2;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const accent =
    word.includes('moment.') ||
    word.includes('shipped') ||
    word.includes('need') ||
    word.includes('it.');

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.26em] ${
        accent ? 'font-serif italic text-[#DC2626]' : ''
      }`}
    >
      {word}
    </motion.span>
  );
}

// ============================================================================
// 4. SCROLL-DRIVEN PRODUCT SHOWCASE & "THREE THINGS, QUIETLY" (SECTION 4)
// ============================================================================

const WORKBENCH_STATES = [
  {
    step: '01 / Your work, never lost',
    prompt: 'Ask your work anything, grounded in your PRs, issues, and decisions...',
    nudgeType: 'GROUNDED ANSWER • SOURCE ATTACHED',
    answer:
      'We moved from the Zoom plugin to a paired sub-15MB desktop app in Draft 2 so we could guarantee exact speaker attribution using only your local microphone.',
    source: 'Source: Architecture ADR • PR #142 • Ticket ENG-89',
    panelRightTitle: 'PRIVATE MEMORY CITATION',
    panelRightBody: `✓ Verified against current main branch
✓ Supersedes earlier Draft 1 plugin spec
✓ Ready to share as a Decision Card in one tap`,
  },
  {
    step: '02 / Private by default',
    prompt: 'Listening privately to your microphone during standup...',
    nudgeType: 'PRIVATE NUDGE • VISIBLE ONLY TO YOU',
    answer:
      'You touched the rate-limiter backoff in PR #219 twelve days ago. The cap was set to 4s because the upstream auth worker times out at 5s.',
    source: 'Source: PR #219 • Only you can see this nudge',
    panelRightTitle: 'LOCAL PRIVACY BOUNDARY',
    panelRightBody: `• Sub-15MB app sits on your laptop
• Nothing joins the call as a bot
• Captures your mic only—never the room's audio`,
  },
  {
    step: '03 / One source of truth',
    prompt: 'Share grounded decision card with the room in one tap...',
    nudgeType: 'SHARED DECISION CARD • THE ROOM CAN SEE',
    answer:
      'When a debate stalls, one grounded card settles it: the options considered, the evidence from your repo history, and where every claim came from.',
    source: 'Source: Decision Record #18 • Shared with room',
    panelRightTitle: 'DECISION CARD SUMMARY',
    panelRightBody: `Option A: Keep polling (rejected in PR #104)
Option B: Paired local listener (active spec)
Status: Grounded in 3 linked pull requests`,
  },
];

const THREE_THINGS_CARDS = [
  {
    num: '01',
    title: 'Your work, never lost',
    description:
      'Your PRs, issues, and decisions become a memory you can question. Ask anything; the answer comes back with its source.',
    detail:
      'When a decision gets reversed later, Scriven updates the lineage so it never serves stale rules as if they still held.',
  },
  {
    num: '02',
    title: 'Private by default',
    description:
      'Every nudge is yours alone. Nothing reaches the room until you decide to share it.',
    detail:
      'A sub-15MB app sits on your laptop and captures only your microphone—never the room’s audio, and no bot ever joins your call.',
  },
  {
    num: '03',
    title: 'One source of truth',
    description:
      'When a debate stalls, one grounded card settles it: the options, the evidence, and where every claim came from.',
    detail:
      'Built to be read in three seconds mid-meeting—turning private recall into shared team alignment in one tap.',
  },
];

function ScrollProductShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const [step, setStep] = useState(0);
  const [openCard, setOpenCard] = useState<number | null>(null);

  useMotionValueEvent(smooth, 'change', (v) => {
    if (v < 0.34) setStep(0);
    else if (v < 0.67) setStep(1);
    else setStep(2);
  });

  const current = WORKBENCH_STATES[step];

  return (
    <section
      id="features"
      className="border-b border-black/[0.07] dark:border-white/[0.08]"
    >
      {/* Scroll-Driven Workbench */}
      <div ref={containerRef} className="relative h-[220vh]">
        <div className="sticky top-0 min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <MinimalBadge num="2" text="What Scriven Labs does" />
              <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight leading-[1.08]">
                Three things,{' '}
                <span className="font-serif italic text-[#DC2626]">
                  quietly.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {WORKBENCH_STATES.map((q, idx) => (
                <button
                  key={q.step}
                  type="button"
                  onClick={() => setStep(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    step === idx
                      ? 'bg-[#0B0B0E] text-white dark:bg-white dark:text-[#09090B]'
                      : 'border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.09] bg-white dark:bg-[#111114] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="h-[2px] w-full bg-black/[0.04] dark:bg-white/[0.04]">
              <motion.div
                style={{ scaleX: smooth }}
                className="h-full origin-left bg-[#DC2626]"
              />
            </div>

            <div className="px-6 sm:px-10 py-5 border-b border-black/[0.06] dark:border-white/[0.07] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Search className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-black/80 dark:text-white/80">
                  {current.prompt}
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-black/40 dark:text-white/40">
                &lt;15MB LOCAL APP
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.06] dark:divide-white/[0.07]"
              >
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#DC2626]">
                      {current.nudgeType}
                    </span>
                    <p className="mt-3 text-lg sm:text-xl leading-relaxed text-black/85 dark:text-white/85">
                      {current.answer}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] font-mono text-xs text-black/45 dark:text-white/45">
                    {current.source}
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAF9F6] dark:bg-[#0C0C0E] flex flex-col justify-center">
                  <span className="font-mono text-[11px] text-black/40 dark:text-white/40 mb-3">
                    {current.panelRightTitle}
                  </span>
                  <pre className="font-mono text-xs leading-relaxed text-black/75 dark:text-white/75 whitespace-pre-wrap">
                    {current.panelRightBody}
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3 Expandable Cards ("Three things, quietly") */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {THREE_THINGS_CARDS.map((card, i) => {
            const isOpen = openCard === i;
            return (
              <div
                key={card.num}
                onClick={() => setOpenCard(isOpen ? null : i)}
                className="group cursor-pointer rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-8 flex flex-col justify-between transition-colors hover:border-black/25 dark:hover:border-white/25"
              >
                <div>
                  <span className="font-mono text-xs text-[#DC2626]">
                    [{card.num}]
                  </span>
                  <h3 className="mt-4 text-xl font-medium tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60 dark:text-white/60">
                    {card.description}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-xs font-mono text-black/70 dark:text-white/70 overflow-hidden"
                      >
                        {card.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-black/40 dark:text-white/40">
                    {isOpen ? 'Less' : 'Learn more'}
                  </span>
                  <div className="h-9 w-9 group-hover:w-[130px] rounded-full bg-[#0B0B0E] dark:bg-[#F4F4F1] text-white dark:text-[#09090B] group-hover:bg-[#DC2626] dark:group-hover:bg-[#DC2626] group-hover:text-white flex items-center justify-end px-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden">
                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap font-mono text-[11px] mr-2 transition-opacity duration-300">
                      {isOpen ? 'Close' : 'Learn more'}
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. SYMMETRICAL SCROLL-DRIVEN SPIDERWEB ("HOW IT WORKS: LOCAL, PRIVATE, GROUNDED")
// ============================================================================

interface WebNode {
  id: string;
  title: string;
  caption: string;
  cx: number;
  cy: number;
  cpx: number;
  cpy: number;
  align: 'left' | 'right';
  icon: any;
}

const WEB_NODES: WebNode[] = [
  {
    id: '01',
    title: 'Connect your work',
    caption: 'Repos & trackers so Scriven knows what you built',
    cx: 230,
    cy: 130,
    cpx: 410,
    cpy: 130,
    align: 'right',
    icon: GitPullRequest,
  },
  {
    id: '02',
    title: 'Listen privately',
    caption: 'Your mic only—never the room’s audio',
    cx: 970,
    cy: 130,
    cpx: 790,
    cpy: 130,
    align: 'left',
    icon: Mic,
  },
  {
    id: '03',
    title: '<15MB Local App',
    caption: 'Sits on your laptop; nothing joins the call',
    cx: 180,
    cy: 330,
    cpx: 390,
    cpy: 330,
    align: 'right',
    icon: Laptop,
  },
  {
    id: '04',
    title: 'Get the private nudge',
    caption: 'Surfaces privately with the source attached',
    cx: 1020,
    cy: 330,
    cpx: 810,
    cpy: 330,
    align: 'left',
    icon: EyeOff,
  },
  {
    id: '05',
    title: 'Grounded answers',
    caption: 'Every claim backed by PRs, tickets & decisions',
    cx: 230,
    cy: 530,
    cpx: 410,
    cpy: 530,
    align: 'right',
    icon: Database,
  },
  {
    id: '06',
    title: 'Share in one tap',
    caption: 'Turns into a grounded card the room can see',
    cx: 970,
    cy: 530,
    cpx: 790,
    cpy: 530,
    align: 'left',
    icon: Share2,
  },
];

function SymmetricalWebNode({
  node,
  index,
  progress,
}: {
  node: WebNode;
  index: number;
  progress: any;
}) {
  const start = 0.08 + index * 0.12;
  const end = start + 0.18;

  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  const pathData = `M 600 330 Q ${node.cpx} ${node.cpy} ${node.cx} ${node.cy}`;
  const Icon = node.icon;

  return (
    <>
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
        className="text-black/10 dark:text-white/10"
      />

      <motion.path
        d={pathData}
        fill="none"
        stroke="#DC2626"
        strokeWidth="1.5"
        style={{ pathLength }}
        strokeLinecap="round"
      />

      <motion.circle
        cx={node.cx}
        cy={node.cy}
        r="4.5"
        style={{ opacity }}
        className="fill-[#F8F7F4] dark:fill-[#09090B] stroke-[#DC2626]"
        strokeWidth="2"
      />

      <foreignObject
        x={node.align === 'right' ? node.cx - 215 : node.cx + 15}
        y={node.cy - 44}
        width="200"
        height="88"
        className="overflow-visible"
      >
        <motion.div
          style={{ opacity, scale }}
          className="rounded-2xl border border-black/[0.08] dark:border-white/[0.09] bg-white/95 dark:bg-[#111114]/95 backdrop-blur-md px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <Icon className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
            <span className="text-xs font-medium tracking-tight">
              {node.title}
            </span>
          </div>
          <p className="text-[11px] text-black/55 dark:text-white/55 leading-snug">
            {node.caption}
          </p>
        </motion.div>
      </foreignObject>
    </>
  );
}

function CleanSymmetricalSpiderweb() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative h-[280vh] border-b border-black/[0.07] dark:border-white/[0.08]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-6">
          <MinimalBadge num="3" text="How it works" />
          <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
            Local, private,{' '}
            <span className="font-serif italic text-[#DC2626]">grounded.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-black/55 dark:text-white/55">
            Note-takers hand you a summary after the meeting. Scriven hands you
            your own work, the moment you need it.
          </p>
        </div>

        <div className="hidden lg:block w-full">
          <svg
            viewBox="0 0 1200 660"
            className="w-full h-[500px] overflow-visible select-none"
          >
            <polygon
              points="230,130 970,130 1020,330 970,530 230,530 180,330"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 6"
              className="text-black/[0.08] dark:text-white/[0.08]"
            />

            <circle
              cx="600"
              cy="330"
              r="140"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-black/[0.06] dark:text-white/[0.06]"
            />

            {WEB_NODES.map((node, i) => (
              <SymmetricalWebNode
                key={node.id}
                node={node}
                index={i}
                progress={smooth}
              />
            ))}

            <g>
              <circle
                cx="600"
                cy="330"
                r="54"
                className="fill-white dark:fill-[#111114] stroke-black/10 dark:stroke-white/10"
                strokeWidth="1"
              />
              <circle
                cx="600"
                cy="330"
                r="44"
                className="fill-[#0B0B0E] dark:fill-[#F4F4F1]"
              />
              <text
                x="600"
                y="334"
                textAnchor="middle"
                className="fill-white dark:fill-[#09090B] font-serif italic text-base"
              >
                Scriven
              </text>
            </g>
          </svg>
        </div>

        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {WEB_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-5"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Icon className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-sm font-medium">{node.title}</h3>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {node.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. HORIZONTAL SCROLL MILESTONES ("PERSONAL TODAY; THE WHOLE ROOM AS YOU PAIR IN")
// ============================================================================

const STAGES = [
  {
    num: '01',
    name: 'Solo',
    subtitle: 'Personal Scriven Labs · Phase 1 & 2 Shipped',
    description:
      'Your personal AI teammate that remembers the work you have done, grounded with real sources. Private nudges visible only to you.',
    highlights: [
      'Your own AI agent sitting locally (<15MB)',
      'GitHub & issue tracker context indexed privately',
      'Your microphone only—nothing joins the call',
    ],
  },
  {
    num: '02',
    name: 'Paired',
    subtitle: 'Pairing & Mediation · Real-User Testing',
    description:
      'When your past work is relevant in a meeting, it surfaces privately with the source attached. One tap turns it into a grounded card your paired teammates can see.',
    highlights: [
      'Paired sessions & live mediation cards',
      'Shared decision records built in three seconds',
      'Automatic lineage when decisions get reversed',
    ],
  },
  {
    num: '03',
    name: 'The whole room',
    subtitle: 'Org Decision Index · Scaling Teams',
    description:
      'From helping individual engineers to connecting the whole room live during architectural debates, standups, and handoffs.',
    highlights: [
      'Organization-wide Decision Index',
      'Slack & Notion export + Zoom no-install path',
      'SSO, SCIM, retention controls & SOC2',
    ],
  },
];

function HorizontalStagesSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 75, damping: 24 });
  const x = useTransform(smooth, [0, 1], ['0%', '-66.666%']);

  return (
    <section
      ref={ref}
      className="relative h-[250vh] border-b border-black/[0.07] dark:border-white/[0.08]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-between py-20 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <MinimalBadge num="4" text="Grows into the room" />
              <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight">
                Personal today;{' '}
                <span className="font-serif italic text-[#DC2626]">
                  the whole room
                </span>{' '}
                as your team pairs in.
              </h2>
            </div>
          </div>

          <div className="h-[2px] w-full bg-black/[0.06] dark:bg-white/[0.06]">
            <motion.div
              style={{ scaleX: smooth }}
              className="h-full origin-left bg-[#DC2626]"
            />
          </div>
        </div>

        <div className="my-auto overflow-hidden">
          <motion.div style={{ x }} className="flex w-[300vw]">
            {STAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="w-screen px-6 flex items-center justify-center"
              >
                <div className="max-w-4xl w-full rounded-3xl border border-black/[0.08] dark:border-white/[0.09] bg-white dark:bg-[#111114] p-8 sm:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <span className="font-mono text-xs text-[#DC2626]">
                      [{pkg.num}]
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-medium tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-black/45 dark:text-white/45">
                      {pkg.subtitle}
                    </p>
                    <p className="text-base text-black/65 dark:text-white/65 leading-relaxed pt-2">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-black/[0.07] dark:border-white/[0.08] pt-6 md:pt-0 md:pl-8 space-y-3">
                    {pkg.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-black/75 dark:text-white/75"
                      >
                        <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between font-mono text-xs text-black/40 dark:text-white/40">
          <span>01 / Solo</span>
          <span>02 / Paired</span>
          <span>03 / The whole room</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. MAIN PAGE WITH EXACT SCRIVENLABS.COM PRICING, FOUNDER STORY & PRIVACY
// ============================================================================

export default function ScrivenlabsPage() {
  const [isDark, setIsDark] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Plus ($15/mo)');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  const problemRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: problemScroll } = useScroll({
    target: problemRef,
    offset: ['start 0.8', 'end 0.35'],
  });

  const openWaitlist = (tierName = 'Plus ($15/mo)') => {
    setSelectedTier(tierName);
    setSubmitted(false);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* =====================================================================
          1. FLOATING PILL NAVIGATION
      ===================================================================== */}
      <header className="fixed top-6 inset-x-0 z-40 px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto rounded-full border border-black/[0.08] dark:border-white/[0.09] bg-[#F8F7F4]/85 dark:bg-[#09090B]/85 backdrop-blur-xl px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#0B0B0E] dark:bg-[#F4F4F1] text-white dark:text-[#09090B] flex items-center justify-center font-serif italic text-sm">
              S
            </div>
            <span className="font-medium tracking-tight text-sm">
              Scriven Labs
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs text-black/65 dark:text-white/65">
            <a
              href="#how-it-works"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] text-black/55 dark:text-white/55">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              <span>Onboarding first 5–9 teams</span>
            </div>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setIsDark(!isDark)}
              className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-black/70 dark:text-white/70 hover:border-black/30 dark:hover:border-white/30 transition-colors"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>

            <HiraelButton
              label="Join waitlist"
              size="sm"
              variant="primary"
              onClick={() => openWaitlist('Early Access')}
            />
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. FULL-VIEWPORT HERO (EXACT SCRIVENLABS.COM HEADLINE)
      ===================================================================== */}
      <section className="relative h-dvh min-h-[660px] flex flex-col justify-end pb-16 sm:pb-24 px-6 border-b border-black/[0.07] dark:border-white/[0.08] overflow-hidden">
        <SilkCanvas isDark={isDark} />

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.3rem,5.5vw,4.4rem)] font-medium tracking-tight leading-[1.03] mb-6">
              An AI that remembers everything you&apos;ve{' '}
              <span className="font-serif italic font-normal text-[#DC2626]">
                shipped.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-black/60 dark:text-white/60 max-w-2xl leading-relaxed mb-10">
              Scriven Labs reads your PRs, issues, and decisions, then hands you
              the exact context the moment you need it, grounded in the real
              source. Personal today; the whole room as your team pairs in.
            </p>
          </div>

          <div className="pt-8 border-t border-black/[0.07] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <HiraelButton
                label="Join the waitlist"
                size="lg"
                variant="crimson"
                onClick={() => openWaitlist('Founding Team Waitlist')}
              />
              <HiraelButton
                label="See how it works"
                size="lg"
                variant="outline"
                href="#how-it-works"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-black/50 dark:text-white/50 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>Supported by Dabtong House</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THE PROBLEM SECTION
      ===================================================================== */}
      <section
        ref={problemRef}
        className="py-28 sm:py-36 px-6 border-b border-black/[0.07] dark:border-white/[0.08]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <MinimalBadge num="1" text="The problem" />

            <div className="text-2xl sm:text-4xl font-normal tracking-tight leading-[1.3]">
              {PROBLEM_COPY.map((word, i) => (
                <ScrollWord
                  key={`${word}-${i}`}
                  word={word}
                  index={i}
                  total={PROBLEM_COPY.length}
                  progress={problemScroll}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.09] bg-white dark:bg-[#111114] p-7 shadow-sm font-mono text-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.06] text-black/45 dark:text-white/45">
                <span>scriven // private nudge</span>
                <span className="text-[#DC2626]">● visible only to you</span>
              </div>

              <div className="space-y-2">
                <div className="text-black/40 dark:text-white/40">
                  PR #219 • Shipped 3 weeks ago
                </div>
                <div className="text-sm font-sans font-medium text-black dark:text-white">
                  Why did we cap webhook retries at 4 attempts?
                </div>
                <p className="font-sans text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  You set `MAX_RETRIES = 4` because downstream settlement locks
                  expire after 90 seconds.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F7F4] dark:bg-[#09090B] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between text-[11px]">
                <span className="text-black/65 dark:text-white/65 font-sans">
                  Grounded in PR #219 &amp; Ticket ENG-104
                </span>
                <span className="text-[#DC2626] font-medium">
                  Share card →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SCROLL-DRIVEN PRODUCT SHOWCASE ("THREE THINGS, QUIETLY")
      ===================================================================== */}
      <ScrollProductShowcase />

      {/* =====================================================================
          5. SYMMETRICAL SPIDERWEB ("LOCAL, PRIVATE, GROUNDED")
      ===================================================================== */}
      <CleanSymmetricalSpiderweb />

      {/* =====================================================================
          6. HORIZONTAL TIMELINE (SOLO / PAIRED / THE WHOLE ROOM)
      ===================================================================== */}
      <HorizontalStagesSection />

      {/* =====================================================================
          7. AUTHENTIC PRICING TIERS (FREE FOR EARLY TEAMS NOW)
      ===================================================================== */}
      <section
        id="pricing"
        className="py-28 sm:py-36 px-6 border-b border-black/[0.07] dark:border-white/[0.08]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <MinimalBadge num="5" text="Pricing" />
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">
              Free for early teams{' '}
              <span className="font-serif italic text-[#DC2626]">now.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-black/60 dark:text-white/60">
              Here&apos;s what pricing becomes at launch. Join now and it stays
              free while we build, with founding rates locked in for good.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Solo */}
            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-black/45 dark:text-white/45">
                  [01]
                </span>
                <h3 className="mt-2 text-xl font-medium">Solo</h3>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-medium tracking-tight">
                    Free
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-6">
                  For one person. Private nudges, no coordination; useful on
                  your own.
                </p>

                <ul className="space-y-2.5 text-xs text-black/75 dark:text-white/75 border-t border-black/[0.06] dark:border-white/[0.06] pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Your own AI agent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>GitHub &amp; tracker context</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Private nudges only</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>1 workspace</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <HiraelButton
                  label="Join waitlist"
                  size="sm"
                  variant="outline"
                  onClick={() => openWaitlist('Solo (Free)')}
                />
              </div>
            </div>

            {/* Plus (Most teams) */}
            <div className="relative rounded-3xl border border-[#DC2626] bg-white dark:bg-[#111114] p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(220,38,38,0.08)]">
              <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#DC2626] text-white font-mono text-[10px] uppercase tracking-wider">
                Most teams
              </div>

              <div>
                <span className="font-mono text-xs text-[#DC2626]">[02]</span>
                <h3 className="mt-2 text-xl font-medium">Plus</h3>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-medium tracking-tight">
                    $15
                  </span>
                  <span className="text-xs text-black/45 dark:text-white/45 font-mono">
                    / user / mo
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-6">
                  The full product. Paired sessions, mediation cards, decision
                  records.
                </p>

                <ul className="space-y-2.5 text-xs text-black/75 dark:text-white/75 border-t border-black/[0.06] dark:border-white/[0.06] pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Everything in Solo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Paired sessions &amp; mediation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Shared decision records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Org Decision Index</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Slack &amp; Notion export</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <HiraelButton
                  label="Join waitlist"
                  size="sm"
                  variant="crimson"
                  onClick={() => openWaitlist('Plus ($15/user/mo)')}
                />
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-black/45 dark:text-white/45">
                  [03]
                </span>
                <h3 className="mt-2 text-xl font-medium">Pro</h3>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-medium tracking-tight">
                    $35
                  </span>
                  <span className="text-xs text-black/45 dark:text-white/45 font-mono">
                    / user / mo
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-6">
                  For teams that need admin controls, analytics, and priority
                  support.
                </p>

                <ul className="space-y-2.5 text-xs text-black/75 dark:text-white/75 border-t border-black/[0.06] dark:border-white/[0.06] pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Everything in Plus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Admin &amp; role controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Usage analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Advanced integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <HiraelButton
                  label="Join waitlist"
                  size="sm"
                  variant="outline"
                  onClick={() => openWaitlist('Pro ($35/user/mo)')}
                />
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-black/45 dark:text-white/45">
                  [04]
                </span>
                <h3 className="mt-2 text-xl font-medium">Enterprise</h3>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-3xl font-medium tracking-tight">
                    Custom
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-6">
                  For orgs that need the no-install path, SSO, and controls.
                </p>

                <ul className="space-y-2.5 text-xs text-black/75 dark:text-white/75 border-t border-black/[0.06] dark:border-white/[0.06] pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Zoom no-install path</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>SSO &amp; SCIM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Retention controls &amp; SOC2</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <HiraelButton
                  label="Contact us"
                  size="sm"
                  variant="primary"
                  onClick={() => openWaitlist('Enterprise')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FOUNDER QUOTE & BUILDING IN PUBLIC
      ===================================================================== */}
      <section className="py-24 px-6 border-b border-black/[0.07] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <MinimalBadge num="6" text="Why we're building Scriven Labs" />
            <blockquote className="text-xl sm:text-3xl font-serif italic leading-relaxed text-black/85 dark:text-white/85">
              “The person who knew the answer was always in the room. They just
              couldn&apos;t recall it fast enough. I watched good decisions get
              made on incomplete information, meeting after meeting; so I built
              the teammate I wished we&apos;d had.”
            </blockquote>
            <div className="text-xs font-mono text-black/55 dark:text-white/55">
              <strong className="text-black dark:text-white">
                Guru Wangchuk
              </strong>{' '}
              · Founder, building in Bhutan
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111114] p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#DC2626]">
                BUILDING IN PUBLIC
              </span>
              <span className="font-mono text-[11px] text-black/45 dark:text-white/45">
                PRD v2.7
              </span>
            </div>
            <h3 className="text-lg font-medium">
              Be first in the room.
            </h3>
            <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
              Teams who join early get Scriven Labs free while we build, shape
              what we make, and lock in founding-team pricing for good. No spam.
              One email when your spot opens, and nothing else.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <HiraelButton
                label="Join waitlist"
                size="sm"
                variant="crimson"
                onClick={() => openWaitlist('Founding Team')}
              />
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-xs font-mono text-black/55 dark:text-white/55 hover:underline"
              >
                Privacy &amp; Security →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. GIANT TYPOGRAPHY WATERMARK FOOTER
      ===================================================================== */}
      <footer id="connect" className="pt-20 pb-10 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-16 border-b border-black/[0.07] dark:border-white/[0.08]">
            <div>
              <span className="font-medium text-lg tracking-tight">
                Scriven Labs
              </span>
              <p className="text-xs text-black/50 dark:text-white/50 mt-1">
                A personal AI that remembers your work. Grounded context for
                engineering teams.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-black/60 dark:text-white/60">
              <a
                href="#how-it-works"
                className="hover:text-black dark:hover:text-white"
              >
                How it works
              </a>
              <a
                href="#features"
                className="hover:text-black dark:hover:text-white"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-black dark:hover:text-white"
              >
                Pricing
              </a>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-black dark:hover:text-white"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => openWaitlist('Footer Waitlist')}
                className="text-[#DC2626] font-medium"
              >
                Join waitlist →
              </button>
            </div>
          </div>

          <div className="py-6 select-none overflow-hidden">
            <div className="text-[17.5vw] font-semibold tracking-tighter leading-[0.82] text-center text-black/[0.04] dark:text-white/[0.04]">
              Scrivenlabs
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 font-mono text-[11px] text-black/40 dark:text-white/40">
            <span>© 2026 Scriven Labs. All rights reserved.</span>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:underline"
            >
              Privacy Policy · Terms · Security
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: PRIVACY POLICY & LOCAL-FIRST SECURITY
      ===================================================================== */}
      <AnimatePresence>
        {privacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="relative w-full max-w-2xl max-h-[82vh] overflow-y-auto rounded-3xl border border-black/10 dark:border-white/10 bg-[#F8F7F4] dark:bg-[#111114] p-8 sm:p-10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-black/[0.07] dark:border-white/[0.08] pb-4">
                <div>
                  <span className="font-mono text-xs text-[#DC2626]">
                    TRUST &amp; PRIVACY
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight mt-1">
                    Scriven Labs Privacy Policy
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(false)}
                  className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-black/70 dark:text-white/70 leading-relaxed">
                <p>
                  <strong>1. Private by Default (Your Microphone Only):</strong>{' '}
                  Scriven Labs runs as a sub-15MB desktop application on your
                  laptop. Nothing joins your call as a meeting bot, and Scriven
                  captures only your microphone—never the room&apos;s audio.
                </p>
                <p>
                  <strong>2. Private Nudges vs. Shared Cards:</strong> Every
                  nudge surfaced from your PRs, issues, and decisions is visible
                  only to you. Nothing reaches the room or your teammates until
                  you explicitly tap to share a grounded decision card.
                </p>
                <p>
                  <strong>3. Zero Training on Your Work:</strong> Your
                  repositories, issue trackers, and decision records are used
                  exclusively to serve your workspace memory. We never train
                  public or third-party foundation models on your data.
                </p>
                <p>
                  <strong>4. Analytics &amp; Cookies:</strong> We use Google
                  Analytics to understand how our site is used, and it only runs
                  if you accept. Waitlist emails are used strictly to notify you
                  when your spot opens—no spam.
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.07] dark:border-white/[0.08] flex justify-end">
                <HiraelButton
                  label="Close"
                  variant="primary"
                  size="sm"
                  onClick={() => setPrivacyOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 2: WAITLIST MODAL
      ===================================================================== */}
      <AnimatePresence>
        {waitlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              className="relative w-full max-w-md rounded-3xl border border-black/10 dark:border-white/10 bg-[#F8F7F4] dark:bg-[#111114] p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setWaitlistOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <MinimalBadge num="Early Access" text={selectedTier} />
                  <h3 className="text-2xl font-medium tracking-tight">
                    Be first in the room.
                  </h3>
                  <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                    Teams who join early get Scriven Labs free while we build
                    and lock in founding-team pricing for good. No spam—one
                    email when your spot opens.
                  </p>

                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/12 dark:border-white/12 bg-white dark:bg-[#09090B] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <HiraelButton
                      label="Join waitlist"
                      variant="crimson"
                      size="md"
                    />
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-medium">You&apos;re on the list</h4>
                  <p className="text-xs text-black/60 dark:text-white/60">
                    We&apos;ll send one email to{' '}
                    <span className="font-mono">{email}</span> when your spot
                    opens.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
