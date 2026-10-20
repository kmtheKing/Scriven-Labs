export interface DemoItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: 'live' | 'in-progress' | 'planned';
  category: string;
  route: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export const DEMOS: DemoItem[] = [
  {
    id: 'demo-1',
    slug: 'demo-1',
    title: 'Demo 01: Core Experience',
    description: 'Initial flagship showcase interface ready for rapid prototyping and interactive testing.',
    status: 'in-progress',
    category: 'Flagship UI',
    route: '/demos/demo-1',
    tags: ['Interactive', 'Showcase', 'Flagship'],
    featured: true,
    metrics: [
      { label: 'Latency', value: '<12ms' },
      { label: 'Status', value: 'Active' },
    ],
  },
  {
    id: 'demo-2',
    slug: 'demo-2',
    title: 'Demo 02: Scrivenlabs (Hirael)',
    description: 'Agency-style landing page with live WebGL canvas, typewriter problem section, spiderweb pin & reveal, and horizontal scroll hijack.',
    status: 'live',
    category: 'Agency Landing',
    route: '/demos/demo-2',
    tags: ['Hirael', 'Canvas', 'Pin-Scroll', 'Timeline'],
    featured: true,
    metrics: [
      { label: 'Theme', value: 'Light/Dark' },
      { label: 'Scroll', value: 'Interactive' },
    ],
  },
  {
    id: 'demo-3',
    slug: 'demo-3',
    title: 'Demo 03: Data & Visualization',
    description: 'Real-time telemetry, visual metrics, and analytics engine.',
    status: 'planned',
    category: 'Analytics',
    route: '/demos/demo-3',
    tags: ['Telemetry', 'Metrics'],
    featured: false,
  },
];
