import React from 'react';
import Link from 'next/link';
import { DemoItem } from '@/data/demos';

export default function DemoCard({ demo }: { demo: DemoItem }) {
  const isLive = demo.status === 'live';
  const isInProgress = demo.status === 'in-progress';

  return (
    <div style={{
      background: 'rgba(13, 13, 18, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      backdropFilter: 'blur(12px)',
    }}
    className="glass-panel-glow"
    >
      {/* Corner Red Accent for Featured */}
      {demo.featured && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle at top right, rgba(255, 42, 75, 0.35), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
          }}>
            {demo.category}
          </span>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: isLive || isInProgress ? 'rgba(255, 42, 75, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            color: isLive || isInProgress ? '#ff4766' : '#64748b',
            border: `1px solid ${isLive || isInProgress ? 'rgba(255, 42, 75, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: isLive || isInProgress ? '#ff2a4b' : '#64748b',
            }} />
            {demo.status === 'live' ? 'Live' : demo.status === 'in-progress' ? 'Ready for Spec' : 'Planned'}
          </span>
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.01em',
        }}>
          {demo.title}
        </h3>

        <p style={{
          fontSize: '0.88rem',
          color: '#94a3b8',
          lineHeight: '1.5',
          marginBottom: '1.25rem',
        }}>
          {demo.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {demo.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: '0.72rem',
              color: '#cbd5e1',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {demo.metrics?.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>{m.label}</span>
              <span style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{m.value}</span>
            </div>
          ))}
        </div>

        <Link
          href={demo.route}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '8px',
            background: demo.featured ? 'rgba(255, 42, 75, 0.15)' : 'rgba(255, 255, 255, 0.06)',
            border: demo.featured ? '1px solid rgba(255, 42, 75, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
            color: demo.featured ? '#ff4766' : '#e2e8f0',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          Open &rarr;
        </Link>
      </div>
    </div>
  );
}
