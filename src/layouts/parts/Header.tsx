import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* Contato atualizado para @KLORDMALWARE */
const TELEGRAM_URL = 'https://t.me/KLORDMALWARE';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#modulos', label: 'Módulos' },
    { href: '#orcamento', label: 'Orçamento' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(5,8,20,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #0f1a35',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '0.04em',
              color: '#e0e0e0',
            }}>
              INFINIX{' '}
              <span style={{
                background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                APIs
              </span>
            </span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              color: '#22c55e',
              backgroundColor: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '999px',
              padding: '2px 8px',
              letterSpacing: '0.05em',
            }}>
              ● Online
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex" style={{ gap: '28px' }}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              borderRadius: '8px',
              padding: '7px 18px',
              textDecoration: 'none',
              transition: 'box-shadow 0.25s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.5)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Falar no Telegram
          </a>

          {/* Hamburguer mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md"
            style={{ color: '#e0e0e0', background: 'transparent', border: 'none', cursor: 'pointer' }}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu mobile animado */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
              className="md:hidden"
            >
              <div style={{ borderTop: '1px solid #0f1a35', paddingTop: '12px', paddingBottom: '16px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#6b7280',
                        textDecoration: 'none',
                        padding: '8px 4px',
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: '8px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      borderRadius: '8px',
                      padding: '9px 16px',
                      textDecoration: 'none',
                      textAlign: 'center',
                    }}
                  >
                    Falar no Telegram
                  </a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
