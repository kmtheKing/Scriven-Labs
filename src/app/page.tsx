import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import DemoCard from '@/components/DemoCard';
import { DEMOS } from '@/data/demos';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '6rem 1.5rem 4rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(255, 42, 75, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: -1,
          }} />

          {/* Announcement Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(255, 42, 75, 0.08)',
            border: '1px solid rgba(255, 42, 75, 0.25)',
            boxShadow: '0 0 20px rgba(255, 42, 75, 0.12)',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ff2a4b',
              boxShadow: '0 0 10px #ff2a4b',
            }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc', letterSpacing: '0.02em' }}>
              SCRIVEN LABS EXPERIMENTAL WORKSPACE
            </span>
            <span style={{ fontSize: '0.75rem', color: '#ff4766', fontWeight: 700 }}>&bull; v1.0</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            maxWidth: '900px',
            marginBottom: '1.5rem',
          }}>
            Engineering Next-Gen <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #ff4766 85%, #ff2a4b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              High-Performance Interfaces
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#94a3b8',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}>
            A modular playground for high-fidelity frontend demos, stateful components, and design systems. Built on Next.js with deep obsidian tones and precision crimson accents.
          </p>

          {/* Hero CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/demos/demo-1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #ff2a4b 0%, #b80d2a 100%)',
                color: '#fff',
                padding: '0.85rem 1.75rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: '0 0 25px rgba(255, 42, 75, 0.45)',
                transition: 'all 0.2s',
              }}
            >
              <span>Launch Demo 1</span>
              <span>&rarr;</span>
            </Link>

            <a
              href="#demos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                padding: '0.85rem 1.75rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
              }}
            >
              Browse All Demos
            </a>
          </div>

          {/* Stats Bar */}
          <div style={{
            marginTop: '4rem',
            width: '100%',
            maxWidth: '750px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            padding: '1.25rem',
            borderRadius: '14px',
            background: 'rgba(13, 13, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>Next.js 15</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>App Router Foundation</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.06)', borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ff4766', fontFamily: 'var(--font-mono)' }}>Multi-Demo</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Isolated Sandbox Routes</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>0ms</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Config Friction</div>
            </div>
          </div>
        </section>

        {/* Demos Section */}
        <section id="demos" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem 1.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#ff4766',
              }}>
                Interactive Showcases
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
                marginTop: '0.25rem',
              }}>
                Demo Directory
              </h2>
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: '#94a3b8',
              maxWidth: '420px',
            }}>
              Each demo is architected as an autonomous module. Add new experiences by defining entries in the registry.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {DEMOS.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        </section>

        {/* Architecture & Extension Guide */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem 6rem 1.5rem',
        }}>
          <div style={{
            background: 'linear-gradient(180deg, rgba(18, 18, 25, 0.7) 0%, rgba(10, 10, 14, 0.7) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#ff4766',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Architecture
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                How to Add New Demos
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
                The folder structure has been designed specifically so you can build dozens of demos without collision or routing spaghetti.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
            }}>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#ff4766' }}>1.</span> Create route: <span style={{ color: '#38bdf8' }}>src/app/demos/demo-X/page.tsx</span>
              </div>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#ff4766' }}>2.</span> Register in: <span style={{ color: '#38bdf8' }}>src/data/demos.ts</span>
              </div>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#ff4766' }}>3.</span> Ready immediately on Hub & navigation switcher
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem 1.5rem',
        background: 'rgba(7, 7, 9, 0.95)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
          Scriven Labs &bull; Built with Next.js &bull; Designed in Obsidian Black & Crimson
        </p>
      </footer>
    </div>
  );
}
