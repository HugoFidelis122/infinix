import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Constantes globais
───────────────────────────────────────────── */
const TELEGRAM_URL = 'https://t.me/KLORDMALWARE';

/* ─────────────────────────────────────────────
   Paleta de cores — dark azul + roxo
───────────────────────────────────────────── */
const C = {
  bg: '#050814',
  bgCard: '#080d1e',
  bgCardHover: '#0b1228',
  border: '#0f1a35',
  borderHover: '#1d3a6e',
  blue: '#3b82f6',
  purple: '#a855f7',
  blueDeep: '#2563eb',
  purpleDeep: '#7c3aed',
  text: '#e0e0e0',
  textMuted: '#6b7280',
  textDim: '#374151',
};

/* ─────────────────────────────────────────────
   Dados dos módulos de API
───────────────────────────────────────────── */
const modules = [
  {
    icon: '🪪',
    title: 'Consultas Cadastrais',
    color: C.blue,
    desc: 'Dados pessoais e documentais com retorno em JSON.',
    chips: ['CPF', 'CNPJ', 'Telefone', 'Email', 'CNS', 'RG', 'Vacinas', 'Benefícios'],
  },
  {
    icon: '🚗',
    title: 'Veiculares',
    color: C.purple,
    desc: 'Consultas de veículos com múltiplas fontes.',
    chips: ['Placa V1', 'Placa V2', 'Placa V3', 'Placa V4', 'Placa V5', 'Serpro', 'Chassi', 'Renavam'],
  },
  {
    icon: '📷',
    title: 'Fotos',
    color: C.blue,
    desc: 'Imagens de CNH e documentos por estado.',
    chips: ['BR Nacional', 'SP', 'RJ', 'RO', 'MA', 'ES', 'CE'],
  },
  {
    icon: '⚡',
    title: 'Recursos',
    color: C.purple,
    desc: 'Infraestrutura para quem precisa de volume.',
    chips: ['Token Privado', 'Baixa Latência', 'Alta Disponibilidade', 'Planos Escaláveis'],
  },
];

/* ─────────────────────────────────────────────
   APIs disponíveis para seleção no orçamento
───────────────────────────────────────────── */
const apiOptions = [
  { id: 'cpf', label: 'CPF', group: 'Cadastral' },
  { id: 'cnpj', label: 'CNPJ', group: 'Cadastral' },
  { id: 'telefone', label: 'Telefone', group: 'Cadastral' },
  { id: 'email', label: 'Email', group: 'Cadastral' },
  { id: 'cns', label: 'CNS', group: 'Cadastral' },
  { id: 'rg', label: 'RG', group: 'Cadastral' },
  { id: 'vacinas', label: 'Vacinas', group: 'Cadastral' },
  { id: 'beneficios', label: 'Benefícios', group: 'Cadastral' },
  { id: 'placa_v1', label: 'Placa V1', group: 'Veicular' },
  { id: 'placa_v2', label: 'Placa V2', group: 'Veicular' },
  { id: 'placa_v3', label: 'Placa V3', group: 'Veicular' },
  { id: 'placa_v4', label: 'Placa V4', group: 'Veicular' },
  { id: 'placa_v5', label: 'Placa V5', group: 'Veicular' },
  { id: 'serpro', label: 'Serpro', group: 'Veicular' },
  { id: 'chassi', label: 'Chassi', group: 'Veicular' },
  { id: 'renavam', label: 'Renavam', group: 'Veicular' },
  { id: 'foto_br', label: 'Foto BR', group: 'Fotos' },
  { id: 'foto_sp', label: 'Foto SP', group: 'Fotos' },
  { id: 'foto_rj', label: 'Foto RJ', group: 'Fotos' },
  { id: 'foto_ro', label: 'Foto RO', group: 'Fotos' },
  { id: 'foto_ma', label: 'Foto MA', group: 'Fotos' },
  { id: 'foto_es', label: 'Foto ES', group: 'Fotos' },
  { id: 'foto_ce', label: 'Foto CE', group: 'Fotos' },
];

const apiGroups = ['Cadastral', 'Veicular', 'Fotos'];

/* ─────────────────────────────────────────────
   Variantes de animação reutilizáveis
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   Componente: seção animada ao entrar na tela
───────────────────────────────────────────── */
function AnimSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Componente: card de módulo
───────────────────────────────────────────── */
function ModuleCard({ mod }: { mod: typeof modules[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? C.bgCardHover : C.bgCard,
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        borderRadius: '14px',
        padding: '24px',
        transition: 'background-color 0.25s, border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? `0 0 28px rgba(59,130,246,0.1)` : 'none',
        cursor: 'default',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Ícone com glow */}
      <div style={{
        fontSize: '1.8rem',
        marginBottom: '12px',
        filter: hovered ? `drop-shadow(0 0 8px ${mod.color}88)` : 'none',
        transition: 'filter 0.3s',
      }}>
        {mod.icon}
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: C.text, margin: '0 0 6px' }}>
        {mod.title}
      </h3>
      <p style={{ fontSize: '0.82rem', color: C.textMuted, margin: '0 0 14px', lineHeight: 1.55 }}>
        {mod.desc}
      </p>

      {/* Chips */}
      <div>
        {mod.chips.map((chip) => (
          <span key={chip} style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 500,
            color: mod.color,
            backgroundColor: `${mod.color}18`,
            border: `1px solid ${mod.color}30`,
            borderRadius: '6px',
            padding: '3px 8px',
            margin: '3px 3px 3px 0',
          }}>
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Componente: seção de orçamento personalizado
───────────────────────────────────────────── */
function OrcamentoSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeGroup, setActiveGroup] = useState('Cadastral');

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedLabels = apiOptions
    .filter((a) => selected.has(a.id))
    .map((a) => a.label)
    .join(', ');

  const telegramMsg = selected.size > 0
    ? `${TELEGRAM_URL}?start=orcamento_${encodeURIComponent(selectedLabels)}`
    : TELEGRAM_URL;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="orcamento" ref={ref} style={{
      padding: '80px 0',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '860px' }}>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            margin: '0 0 10px',
          }}>
            💬 Monte seu orçamento
          </h2>
          <p style={{ color: C.textMuted, fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
            Selecione as APIs que você precisa e fale com a gente no Telegram.
            <br />
            O preço é definido conforme o pacote — sem surpresas.
          </p>
        </motion.div>

        {/* Tabs de grupo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}
        >
          {apiGroups.map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '8px',
                border: `1px solid ${activeGroup === group ? C.blue : C.border}`,
                backgroundColor: activeGroup === group ? `${C.blue}18` : 'transparent',
                color: activeGroup === group ? C.blue : C.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {group}
            </button>
          ))}
        </motion.div>

        {/* Grid de APIs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          {apiOptions
            .filter((a) => a.group === activeGroup)
            .map((api) => {
              const isSelected = selected.has(api.id);
              return (
                <motion.button
                  key={api.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggle(api.id)}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${isSelected ? C.blue : C.border}`,
                    backgroundColor: isSelected ? `${C.blue}20` : C.bgCard,
                    color: isSelected ? C.blue : C.textMuted,
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    textAlign: 'center',
                    boxShadow: isSelected ? `0 0 12px ${C.blue}30` : 'none',
                  }}
                >
                  {isSelected ? '✓ ' : ''}{api.label}
                </motion.button>
              );
            })}
        </motion.div>

        {/* Resumo + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            backgroundColor: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: '14px',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: C.textMuted, marginBottom: '4px' }}>
              APIs selecionadas ({selected.size})
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: selected.size > 0 ? C.text : C.textDim,
              fontWeight: 500,
              maxWidth: '480px',
              lineHeight: 1.5,
            }}>
              {selected.size > 0 ? selectedLabels : 'Nenhuma API selecionada ainda.'}
            </div>
          </div>

          <motion.a
            href={telegramMsg}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${C.blue}55` }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#fff',
              background: selected.size > 0
                ? `linear-gradient(135deg, ${C.blueDeep}, ${C.purpleDeep})`
                : '#1f2937',
              borderRadius: '10px',
              padding: '11px 24px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s',
              cursor: selected.size > 0 ? 'pointer' : 'not-allowed',
              opacity: selected.size > 0 ? 1 : 0.5,
            }}
          >
            {selected.size > 0 ? '✈ Solicitar Orçamento' : 'Selecione as APIs'}
          </motion.a>
        </motion.div>

        {/* Nota */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: C.textDim,
          marginTop: '16px',
        }}>
          Após selecionar, você será direcionado ao Telegram com as APIs escolhidas já informadas.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Componente: seção de contato
───────────────────────────────────────────── */
function ContatoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contato" ref={ref} style={{
      padding: '80px 0',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: C.text,
            margin: '0 0 12px',
          }}>
            📡 Suporte e Contato
          </h2>
          <p style={{ color: C.textMuted, fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 36px' }}>
            Atendimento direto pelo Telegram. Resposta rápida, sem burocracia.
            <br />
            Fale com o admin para tirar dúvidas, solicitar acesso ou negociar volume.
          </p>

          {/* Card de contato */}
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${C.blue}25` }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              backgroundColor: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: '16px',
              padding: '24px 32px',
              textDecoration: 'none',
              transition: 'border-color 0.25s',
              marginBottom: '24px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.blue)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.blueDeep}, ${C.purpleDeep})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}>
              ✈
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: C.text, marginBottom: '2px' }}>
                @KLORDMALWARE
              </div>
              <div style={{ fontSize: '0.8rem', color: C.textMuted }}>
                Admin · Suporte · Vendas
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: C.blue,
              backgroundColor: `${C.blue}15`,
              border: `1px solid ${C.blue}30`,
              borderRadius: '999px',
              padding: '4px 12px',
            }}>
              Telegram
            </div>
          </motion.a>

          {/* Info adicional */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: '⚡', text: 'Resposta em minutos' },
              { icon: '🔒', text: 'Token entregue na hora' },
              { icon: '📦', text: 'Pacotes personalizados' },
            ].map((item) => (
              <div key={item.text} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: C.textMuted,
              }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Componente principal da página
───────────────────────────────────────────── */
export default function HomePage() {
  /* Referência para animação do hero */
  const heroRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Infinix APIs — Consultas em tempo real para sua aplicação</title>
        <meta
          name="description"
          content="API de consultas cadastrais, veiculares e fotos para desenvolvedores. CPF, CNPJ, Placa, Chassi, Renavam e muito mais. Orçamento personalizado."
        />
        <meta property="og:title" content="Infinix APIs — Consultas em tempo real" />
        <meta property="og:description" content="API de consultas cadastrais, veiculares e fotos. Orçamento sob medida." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main style={{
        backgroundColor: C.bg,
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflowX: 'hidden',
      }}>

        {/* ── PARTÍCULAS DE FUNDO (CSS puro, sem JS) ── */}
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          {/* Orbs de luz ambiente */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          }} />
        </div>

        {/* ── HERO ── */}
        <section ref={heroRef} style={{
          position: 'relative',
          zIndex: 1,
          padding: '96px 0 80px',
          textAlign: 'center',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '760px' }}>

            {/* Badge animado */}
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: C.blue,
                backgroundColor: `${C.blue}15`,
                border: `1px solid ${C.blue}30`,
                borderRadius: '999px',
                padding: '5px 16px',
                letterSpacing: '0.06em',
                marginBottom: '28px',
              }}
            >
              ⚡ API REST · JSON · Tempo Real
            </motion.span>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                margin: '0 0 22px',
                background: `linear-gradient(135deg, ${C.blue} 0%, #60a5fa 35%, #c084fc 70%, ${C.purple} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Consultas em tempo real para sua aplicação
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
              style={{
                fontSize: '1.05rem',
                color: C.textMuted,
                lineHeight: 1.75,
                margin: '0 0 40px',
                maxWidth: '580px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Integre CPF, CNPJ, veículos, fotos e muito mais com uma única API.
              Token privado, retorno em JSON e orçamento personalizado conforme seu volume.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.a
                href="#orcamento"
                whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${C.blue}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${C.blueDeep}, ${C.purpleDeep})`,
                  borderRadius: '10px',
                  padding: '13px 30px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Solicitar Orçamento
              </motion.a>
              <motion.a
                href="#modulos"
                whileHover={{ borderColor: C.blue, color: C.blue }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: C.textMuted,
                  backgroundColor: 'transparent',
                  border: `1px solid ${C.border}`,
                  borderRadius: '10px',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                Ver Módulos
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                marginTop: '56px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '15+', label: 'Endpoints' },
                { value: '99.9%', label: 'Uptime' },
                { value: '<200ms', label: 'Latência média' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: C.textDim, marginTop: '3px' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MÓDULOS ── */}
        <section id="modulos" style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 0',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div className="container mx-auto px-4">
            <AnimSection style={{ textAlign: 'center', marginBottom: '48px' }}>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: C.text,
                  margin: '0 0 10px',
                }}
              >
                🔌 Módulos disponíveis
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.45, delay: 0.05 }}
                style={{ color: C.textMuted, fontSize: '0.9rem', margin: 0 }}
              >
                Todos os endpoints acessíveis com o mesmo token.
              </motion.p>
            </AnimSection>

            <AnimSection style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              maxWidth: '920px',
              margin: '0 auto',
            }}>
              {modules.map((mod) => (
                <ModuleCard key={mod.title} mod={mod} />
              ))}
            </AnimSection>
          </div>
        </section>

        {/* ── ORÇAMENTO PERSONALIZADO ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <OrcamentoSection />
        </div>

        {/* ── CONTATO ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ContatoSection />
        </div>

        {/* ── CTA FINAL ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#060b1a',
          padding: '80px 0',
          textAlign: 'center',
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div className="container mx-auto px-4" style={{ maxWidth: '600px' }}>
            <AnimSection>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: C.text,
                  margin: '0 0 14px',
                }}
              >
                Pronto para automatizar suas consultas?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.08 }}
                style={{ color: C.textMuted, fontSize: '0.9rem', margin: '0 0 32px', lineHeight: 1.65 }}
              >
                Fale com <strong style={{ color: C.blue }}>@KLORDMALWARE</strong> no Telegram,
                informe as APIs que precisa e receba o token em minutos.
              </motion.p>
              <motion.a
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.14 }}
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${C.blue}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${C.blueDeep}, ${C.purpleDeep})`,
                  borderRadius: '12px',
                  padding: '14px 36px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                ✈ Falar com @KLORDMALWARE
              </motion.a>
            </AnimSection>
          </div>
        </section>

        {/* ── BOTÃO FLUTUANTE ── */}
        <motion.a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no Telegram com @KLORDMALWARE"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.blueDeep}, ${C.purpleDeep})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: `0 4px 24px ${C.blue}50`,
            textDecoration: 'none',
          }}
        >
          💬
        </motion.a>

      </main>
    </>
  );
}
