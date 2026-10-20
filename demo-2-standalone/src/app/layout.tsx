import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scrivenlabs — Architectural Memory & Engineering Synthesis',
  description:
    'Swiss editorial engineering intelligence. Scriven synthesizes pull requests, ADRs, and incident threads into a living institutional graph.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[#F7F5F0] dark:bg-[#0A0A0C] text-[#0A0A0C] dark:text-[#F5F5F3] transition-colors duration-500 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
