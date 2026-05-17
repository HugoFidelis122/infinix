import { motion } from 'motion/react';

/* Contato atualizado para @KLORDMALWARE */
const TELEGRAM_URL = 'https://t.me/KLORDMALWARE';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#050814',
      borderTop: '1px solid #0f1a35',
      padding: '36px 0',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div className="container mx-auto px-4">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>

          {/* Logo */}
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#e0e0e0', letterSpacing: '0.04em' }}>
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

          <p style={{ fontSize: '0.78rem', color: '#374151', margin: 0 }}>
            © 2026 Infinix APIs. Todos os direitos reservados.
          </p>

          {/* Links */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              style={{
                fontSize: '0.8rem',
                color: '#3b82f6',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              ✈ Suporte: @KLORDMALWARE
            </motion.a>
            <motion.a
              href="#orcamento"
              whileHover={{ scale: 1.05 }}
              style={{
                fontSize: '0.8rem',
                color: '#6b7280',
                textDecoration: 'none',
              }}
            >
              Solicitar Orçamento
            </motion.a>
          </div>

          {/* Linha decorativa */}
          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
            borderRadius: '999px',
            marginTop: '4px',
          }} />
        </div>
      </div>
    </footer>
  );
}
