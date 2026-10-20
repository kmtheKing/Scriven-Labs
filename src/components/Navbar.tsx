'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(7, 7, 9, 0.75)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.85rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #ff2a4b 0%, #b80d2a 100%)',
            boxShadow: '0 0 15px rgba(255, 42, 75, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#fff',
            letterSpacing: '-0.5px'
          }}>
            S
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#fff' }}>SCRIVEN</span>
            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ff4766', letterSpacing: '0.05em' }}>LABS</span>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/#demos" style={{
            color: '#94a3b8',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}>
            Demo Directory
          </Link>
          <Link href="/demos/demo-1" style={{
            color: '#94a3b8',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}>
            Demo 01
          </Link>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.75rem',
          borderRadius: '9999px',
          background: 'rgba(255, 42, 75, 0.08)',
          border: '1px solid rgba(255, 42, 75, 0.25)',
          fontSize: '0.75rem',
          color: '#ff4766',
          fontWeight: 600
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#ff2a4b',
            boxShadow: '0 0 8px #ff2a4b'
          }} />
          Engine Ready
        </div>

        <Link
          href="/demos/demo-1"
          style={{
            background: 'linear-gradient(135deg, #ff2a4b 0%, #b80d2a 100%)',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 600,
            boxShadow: '0 0 15px rgba(255, 42, 75, 0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
            display: 'inline-block'
          }}
        >
          Launch Demo 1 &rarr;
        </Link>
      </div>
    </header>
  );
}
