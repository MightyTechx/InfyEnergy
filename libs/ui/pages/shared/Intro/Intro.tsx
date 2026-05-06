import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './styles';

// ── Particle Canvas Component ────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
  reset: (W: number, H: number) => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const createParticle = (W: number, H: number): Particle => {
  const particle: Partial<Particle> = {};

  const reset = (newW: number, newH: number) => {
    particle.x = Math.random() * newW;
    particle.y = Math.random() * newH;
    particle.vx = (Math.random() - 0.5) * 0.3;
    particle.vy = -Math.random() * 0.4 - 0.1;
    particle.r = Math.random() * 1.2 + 0.3;
    particle.alpha = Math.random() * 0.5 + 0.1;
    particle.life = 0;
    particle.maxLife = Math.random() * 300 + 200;
    particle.color = Math.random() > 0.5 ? '0,242,255' : '61,252,173';
  };

  const update = () => {
    if (particle.x !== undefined) particle.x += particle.vx ?? 0;
    if (particle.y !== undefined) particle.y += particle.vy ?? 0;
    if (particle.life !== undefined) particle.life++;
    if ((particle.life ?? 0) > (particle.maxLife ?? 300) || (particle.y ?? 0) < -10) {
      reset(W, H);
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (particle.x === undefined || particle.y === undefined || particle.r === undefined) return;
    const life = particle.life ?? 0;
    const maxLife = particle.maxLife ?? 300;
    const fade = life < 30 ? life / 30 : life > maxLife - 30 ? (maxLife - life) / 30 : 1;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particle.color},${(particle.alpha ?? 0.1) * fade})`;
    ctx.fill();
  };

  reset(W, H);

  return {
    ...particle,
    reset,
    update,
    draw,
  } as Particle;
};

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const draw = useCallback((W: number, H: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // Draw connecting lines between particles
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        if (p1.x === undefined || p1.y === undefined || p2.x === undefined || p2.y === undefined)
          continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0,242,255,${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(() => draw(W, H));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push(createParticle(W, H));
    }

    // Start animation
    animationRef.current = requestAnimationFrame(() => draw(W, H));

    // Handle resize
    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      particlesRef.current.forEach((p) => p.reset(W, H));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className='particle-canvas' />;
};

// ── Turbine SVG Component ────────────────────────────────────────────────────
const TurbineSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox='0 0 100 100'>
    <path
      d='M47 42 L53 42 L56 92 L44 92 Z'
      stroke='rgba(255,255,255,0.2)'
      strokeWidth={2}
      fill='none'
    />
    <g style={{ transformOrigin: '50px 42px', animation: 'spin 5s linear infinite' }}>
      <circle cx={50} cy={42} r={3} fill='var(--neon-cyan)' />
      <path d='M50 42 L50 4 Q61 4 56 42 Z' fill='var(--neon-cyan)' />
      <path d='M50 42 L84 64 Q89 74 50 48 Z' fill='var(--neon-cyan)' />
      <path d='M50 42 L16 64 Q11 74 50 48 Z' fill='var(--neon-cyan)' />
    </g>
  </svg>
);

// ── Static Data ───────────────────────────────────────────────────────────────
const LOADER_MESSAGES = [
  'CONNECTING TO SCADA...',
  'SYNCHRONIZING TELEMETRY...',
  'LOADING GRID DATA...',
  'AUTHENTICATION SUCCESS.',
];

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

const PLATFORM_CARDS = [
  {
    number: '01',
    icon: '📡',
    title: 'End-to-End Monitoring',
    items: [
      'Turbine → Grid visibility',
      'Multi-farm centralized control',
      'Live SCADA dashboards',
      'Real-time power tracking',
    ],
  },
  {
    number: '02',
    icon: '📈',
    title: 'Energy & Reporting Engine',
    items: [
      'Daily / Monthly generation reports',
      'CUF & performance KPIs',
      'Downtime analytics',
      'Revenue estimation',
    ],
  },
  {
    number: '03',
    icon: '🤖',
    title: 'Predictive Maintenance',
    items: [
      'AI failure prediction',
      'Gearbox & blade monitoring',
      'Vibration analysis',
      'Maintenance scheduling',
    ],
  },
  {
    number: '04',
    icon: '🌬️',
    title: 'Wind Intelligence',
    items: [
      'Wind speed & direction tracking',
      'Wake loss analysis',
      'Forecasting models',
      'Power curve optimization',
    ],
  },
  {
    number: '05',
    icon: '🔌',
    title: 'Grid & Compliance',
    items: [
      'Voltage & frequency control',
      'SLDC / RLDC integration',
      'Reactive power management',
      'Grid code compliance',
    ],
  },
  {
    number: '06',
    icon: '⚙️',
    title: 'Automation & Control',
    items: [
      'Remote turbine control',
      'Alarm & fault system',
      'Event logging',
      'Auto shutdown protection',
    ],
  },
];

const CAREER_CARDS = [
  {
    icon: '🖥️',
    title: 'SCADA Engineer',
    text: 'Oversee complex monitoring infrastructure and telemetry integration across the global fleet of wind assets.',
    tag: 'ENGINEERING',
  },
  {
    icon: '📊',
    title: 'Wind Data Analyst',
    text: 'Analyze high-frequency SCADA data to improve energy yields and turbine efficiency through advanced modeling.',
    tag: 'ANALYTICS',
  },
  {
    icon: '⚡',
    title: 'Grid Engineer',
    text: 'Manage high-voltage substation integration and stability requirements for regional and national grids.',
    tag: 'GRID OPERATIONS',
  },
];

const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time SCADA',
    desc: 'Live monitoring of all wind and electrical infrastructure with sub-second data refresh.',
  },
  {
    icon: '📊',
    title: 'Generation Analytics',
    desc: 'Multi-timeframe reporting from hourly to yearly with CUF, KPIs and revenue estimation.',
  },
  {
    icon: '🔧',
    title: 'Breakdown Management',
    desc: 'Structured fault logging with solutions, downtime tracking, and attendee records.',
  },
  {
    icon: '🛡️',
    title: 'Safety & Compliance',
    desc: 'Permit-to-work, incident reporting, audits, and regulatory compliance management.',
  },
  {
    icon: '🗓️',
    title: 'Scheduled Maintenance',
    desc: 'Quarterly, half-yearly, and yearly servicing cycles managed end-to-end in the system.',
  },
];

const HERO_STATS = [
  { count: 1284, label: 'Active Turbines' },
  { count: 2600, label: 'Total Output', suffix: ' MW' },
  { count: 99, label: 'System Uptime', suffix: '.98%' },
  { count: 47, label: 'Wind Farms' },
  { count: 360, label: 'Coverage', suffix: '°' },
];

const METRICS = [
  { value: '14.2 m/s', label: 'Avg Wind Speed', trend: '↑ +1.4 from yesterday' },
  { value: '2.6 GW', label: 'Live Generation', trend: '↑ 94% capacity' },
  { value: '4 ms', label: 'SCADA Latency', trend: '● Optimal' },
  { value: '3', label: 'Active Alerts', trend: '▲ Maintenance due', trendColor: '#f5c518' },
  { value: '₹ 1.82Cr', label: "Today's Revenue", trend: '↑ +8% vs forecast' },
];

// ── Counter Animation Hook ─────────────────────────────────────────────────────
const useCounterAnimation = () => {
  const counterRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setRef = useCallback((key: string, el: HTMLElement | null) => {
    if (el) {
      counterRefs.current.set(key, el);
    } else {
      counterRefs.current.delete(key);
    }
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = +el.dataset.count!;
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();

          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const val = Math.round(eased * target);
            el.textContent = val.toLocaleString() + suffix;
            if (t < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return setRef;
};

// ── Scroll Reveal Hook ─────────────────────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// ── Main Intro Component ──────────────────────────────────────────────────────
interface IntroProps {
  onSignIn: () => void;
}

const Intro = ({ onSignIn }: IntroProps) => {
  const { classes, cx } = useStyles();
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADER_MESSAGES[0]);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Custom hooks
  useScrollReveal();

  // Preloader
  useEffect(() => {
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx < LOADER_MESSAGES.length) {
        setLoadingText(LOADER_MESSAGES[msgIdx]);
      } else {
        clearInterval(msgInterval);
      }
    }, 600);

    const hideTimer = setTimeout(() => setLoaderHidden(true), 2600);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    onSignIn();
  };

  return (
    <Box className={classes.pageWrapper}>
      {/* Preloader */}
      <Box className={cx(classes.loader, loaderHidden && classes.loaderHidden)}>
        <Box className={classes.loaderRing}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle
              cx={90}
              cy={90}
              r={84}
              fill='none'
              stroke='var(--neon-cyan)'
              strokeWidth={2}
              strokeDasharray='30 500'
              strokeLinecap='round'
              style={{ filter: 'drop-shadow(0 0 6px var(--neon-cyan))' }}
            />
          </svg>
          <Box className={classes.loaderTurbine}>
            <svg className='loader-turbine' viewBox='0 0 100 100'>
              <path
                d='M47 42 L53 42 L56 92 L44 92 Z'
                stroke='rgba(255,255,255,0.2)'
                strokeWidth={2}
                fill='none'
              />
              <g style={{ transformOrigin: '50px 42px', animation: 'spin 2s linear infinite' }}>
                <circle cx={50} cy={42} r={3} fill='var(--neon-cyan)' />
                <path d='M50 42 L50 4 Q61 4 56 42 Z' fill='var(--neon-cyan)' />
                <path d='M50 42 L84 64 Q89 74 50 48 Z' fill='var(--neon-cyan)' />
                <path d='M50 42 L16 64 Q11 74 50 48 Z' fill='var(--neon-cyan)' />
              </g>
            </svg>
          </Box>
        </Box>
        <Typography className={classes.loaderText}>{loadingText}</Typography>
        <Box className={classes.loaderBarWrap}>
          <Box className={classes.loaderBar} />
        </Box>
      </Box>

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Header */}
      <Box
        component='header'
        className={cx(classes.header, headerScrolled && classes.headerScrolled)}
      >
        <Box className={classes.logoContainer} onClick={() => handleNavClick('#home')}>
          <TurbineSVG className={classes.headerTurbine} />
          Infy Energy
        </Box>
        <nav>
          <Box component='ul' className={classes.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Box
                  component='a'
                  href={item.href}
                  className={classes.navLink}
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    if (item.label === 'Contact') {
                      handleContactClick();
                    } else {
                      handleNavClick(item.href);
                    }
                  }}
                >
                  {item.label}
                </Box>
              </li>
            ))}
            <li>
              <Box
                component='a'
                className={cx(classes.navLink, classes.navCta)}
                onClick={handleContactClick}
              >
                Sign In
              </Box>
            </li>
          </Box>
        </nav>
      </Box>

      {/* Hero Section */}
      <section id='home' className={classes.hero}>
        <Box className={classes.heroInner}>
          <Box className={classes.heroBadge}>
            <Box className={classes.heroBadgeDot} />
            SCADA SYSTEM ONLINE — 2026
          </Box>
          <Typography className={classes.heroTitle}>
            WIND SERVICE
            <br />
            MATRIX
          </Typography>
          <Typography className={classes.heroSub}>WIND FARM · SCADA · GRID CONTROL</Typography>
          <Typography className={classes.heroDesc}>
            A next-generation centralized platform for real-time wind turbine monitoring, substation
            control, predictive maintenance, and full grid lifecycle management.
          </Typography>
        </Box>
        <Box className={classes.heroStats}>
          {HERO_STATS.map((stat) => (
            <Box key={stat.label} className={classes.statItem}>
              <Typography
                className={classes.statNum}
                data-count={stat.count}
                data-suffix={stat.suffix}
              >
                0
              </Typography>
              <Typography className={classes.statLabel}>{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </section>

      {/* Live Metrics Strip */}
      <Box className={classes.metricsStrip}>
        <Box className={classes.metricsInner}>
          {METRICS.map((metric, idx) => (
            <Box
              key={metric.label}
              className={cx(classes.metricBlock, 'reveal', idx > 0 && `reveal-delay-${idx}`)}
            >
              <Typography className={classes.metricVal}>{metric.value}</Typography>
              <Typography className={classes.metricLbl}>{metric.label}</Typography>
              <Typography
                className={classes.metricTrend}
                sx={metric.trendColor ? { color: metric.trendColor } : {}}
              >
                {metric.trend}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* About Section */}
      <section id='about' className={cx(classes.section, classes.aboutSection)}>
        <Box className={cx(classes.sectionHeader, 'reveal')}>
          <Box className={classes.sectionEyebrow}>ABOUT THE APPLICATION</Box>
          <Typography className={classes.sectionTitle}>
            Complete Wind Energy Management Ecosystem
          </Typography>
          <Box className={classes.sectionLine} />
        </Box>
        <Box className={classes.aboutGrid}>
          <Box className={cx(classes.aboutText, 'reveal reveal-delay-1')}>
            <Typography className={classes.aboutTextFirst}>
              A complete Wind Turbine and Substation Monitoring & Management System built to support
              efficient operation of wind energy assets — from real-time SCADA monitoring to full
              lifecycle reporting.
            </Typography>
            <Typography>
              The system tracks key operational parameters such as wind speed, rotor performance,
              temperature, vibration, and voltage levels across all turbines (690V/33kV), and
              substations (33kV/132kV and 33kV/230kV) in real time.
            </Typography>
            <Typography>
              Generation analytics cover hourly through yearly timeframes, while the breakdown
              management system creates a knowledge base to reduce downtime and resolve recurring
              failures faster.
            </Typography>
            <Typography>
              Comprehensive safety management features include hazard identification, incident
              reporting, PTW systems, safety training tracking, and compliance audits — ensuring all
              activities meet industry standards.
            </Typography>
          </Box>
          <Box className={cx(classes.aboutFeatures, 'reveal reveal-delay-2')}>
            {FEATURES.map((f) => (
              <Box key={f.title} className={classes.featRow}>
                <Box className={classes.featIcon}>{f.icon}</Box>
                <Box className={classes.featInfo}>
                  <Typography component='h4'>{f.title}</Typography>
                  <Typography component='p'>{f.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </section>

      {/* Platform Section */}
      <section id='platform' className={cx(classes.section, classes.platformSection)}>
        <Box className={cx(classes.sectionHeader, 'reveal')}>
          <Box className={classes.sectionEyebrow}>INTELLIGENCE PLATFORM</Box>
          <Typography className={classes.sectionTitle}>
            Full Wind Farm Intelligence Suite
          </Typography>
          <Box className={classes.sectionLine} />
        </Box>
        <Box className={classes.platformGrid}>
          {PLATFORM_CARDS.map((card, idx) => (
            <Box
              key={card.number}
              className={cx(
                classes.platformCard,
                'reveal',
                idx > 0 && `reveal-delay-${Math.min(idx % 3, 3)}`,
              )}
            >
              <Typography className={classes.cardNumber}>{card.number}</Typography>
              <Box className={classes.cardIconWrap}>{card.icon}</Box>
              <Typography className={classes.cardTitle}>{card.title}</Typography>
              <Box component='ul' className={classes.cardList}>
                {card.items.map((item) => (
                  <Box component='li' key={item} className={classes.cardListItem}>
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </section>

      {/* Careers Section */}
      <section id='careers' className={cx(classes.section, classes.careersSection)}>
        <Box className={cx(classes.sectionHeader, 'reveal')}>
          <Box className={classes.sectionEyebrow}>DEPLOYMENT OPPORTUNITIES</Box>
          <Typography className={classes.sectionTitle}>Join the Grid</Typography>
          <Box className={classes.sectionLine} />
        </Box>
        <Box className={classes.careersGrid}>
          {CAREER_CARDS.map((card, idx) => (
            <Box
              key={card.title}
              className={cx(classes.careerCard, 'reveal', idx > 0 && `reveal-delay-${idx}`)}
            >
              <Box className={classes.careerIcon}>{card.icon}</Box>
              <Typography className={classes.careerCardTitle}>{card.title}</Typography>
              <Typography className={classes.careerCardText}>{card.text}</Typography>
              <Box className={classes.careerTag}>{card.tag}</Box>
            </Box>
          ))}
        </Box>
      </section>

      {/* Contact Section */}
      <section id='contact' className={cx(classes.section, classes.contactSection)}>
        <Box className={cx(classes.sectionHeader, 'reveal')}>
          <Box className={classes.sectionEyebrow}>SECURE UPLINK</Box>
          <Typography className={classes.sectionTitle}>Establish Connection</Typography>
          <Box className={classes.sectionLine} />
        </Box>
        <Box className={classes.contactWrap}>
          <Box className={cx(classes.contactInfo, 'reveal')}>
            <Typography component='h3'>Ready to synchronize?</Typography>
            <Typography>
              Reach out to our operations team for SCADA integration, yield analytics partnerships,
              or technical support. All transmissions are encrypted end-to-end.
            </Typography>
            <Box className={classes.contactDetail}>
              <Box className={classes.cdItem}>
                <Box className={classes.cdIcon}>📍</Box>
                <Box className={classes.cdText}>
                  <Typography component='span' className={classes.cdLabel}>
                    LOCATION
                  </Typography>
                  <Typography component='span' className={classes.cdValue}>
                    Operations Command Center
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.cdItem}>
                <Box className={classes.cdIcon}>📡</Box>
                <Box className={classes.cdText}>
                  <Typography component='span' className={classes.cdLabel}>
                    SCADA NODE
                  </Typography>
                  <Typography component='span' className={classes.cdValue}>
                    Node-Alpha / 24×7 Monitoring
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.cdItem}>
                <Box className={classes.cdIcon}>🔒</Box>
                <Box className={classes.cdText}>
                  <Typography component='span' className={classes.cdLabel}>
                    SECURITY
                  </Typography>
                  <Typography component='span' className={classes.cdValue}>
                    AES-256 Encrypted Channel
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className='reveal reveal-delay-2'>
            <Box
              component='form'
              className={classes.contactForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <Box className={classes.formRow}>
                <Box
                  component='input'
                  placeholder='Operator ID'
                  className={classes.inputField}
                  type='text'
                />
                <Box
                  component='input'
                  placeholder='Email Address'
                  className={classes.inputField}
                  type='email'
                />
              </Box>
              <Box
                component='select'
                className={cx(classes.inputField, classes.selectField)}
                defaultValue=''
              >
                <option value='' disabled>
                  Select Request Type
                </option>
                <option>SCADA Integration</option>
                <option>Yield Analytics</option>
                <option>Technical Support</option>
                <option>Partnership Inquiry</option>
              </Box>
              <Box
                component='textarea'
                placeholder='Message Protocol — describe your request...'
                className={cx(classes.inputField, classes.textareaField)}
              />
              <Box component='button' type='submit' className={classes.btnSubmit}>
                ▶ TRANSMIT UPLINK
              </Box>
            </Box>
          </Box>
        </Box>
      </section>

      {/* Footer */}
      <Box component='footer' className={classes.footer}>
        <Box className={classes.footerGrid}>
          <Box className={classes.footerBrand}>
            <Box className={classes.logoContainer} style={{ marginBottom: 16 }}>
              <TurbineSVG className={classes.headerTurbine} />
              Infy Energy
            </Box>
            <Typography>
              Complete Wind Farm SCADA & Infrastructure Management. AI-driven analytics, real-time
              grid integration, and predictive maintenance in one unified platform.
            </Typography>
          </Box>
          <Box className={classes.footerCol}>
            <Typography component='h5'>Platform</Typography>
            <Box component='ul'>
              {['SCADA Monitoring', 'Energy Analytics', 'Predictive AI', 'Grid Control'].map(
                (item) => (
                  <li key={item}>
                    <Box component='a' href='#'>
                      {item}
                    </Box>
                  </li>
                ),
              )}
            </Box>
          </Box>
          <Box className={classes.footerCol}>
            <Typography component='h5'>Live Metrics</Typography>
            <Box component='ul'>
              {[
                '1,284 Active Turbines',
                '2.6 GW Total Output',
                '99.98% Uptime',
                '47 Wind Farms',
              ].map((item) => (
                <li key={item}>
                  <Box component='a' href='#'>
                    {item}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>
          <Box className={classes.footerCol}>
            <Typography component='h5'>Company</Typography>
            <Box component='ul'>
              {[
                { label: 'About', href: '#about' },
                { label: 'Careers', href: '#careers' },
                { label: 'Contact', href: '#contact' },
                { label: 'Privacy Policy', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Box component='a' href={item.href}>
                    {item.label}
                  </Box>
                </li>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className={classes.footerBottom}>
          <Typography>
            © 2026 ThermodynamicsAnalysis Industrial Systems — All rights reserved
          </Typography>
          <Box className={classes.statusPill}>
            <Box className={classes.pulseDot} />
            GRID SYNCHRONIZED
          </Box>
        </Box>
      </Box>

      {/* CSS Variables and Keyframes */}
      <style>{`
        :root {
          --neon-cyan: #00f2ff;
          --neon-cyan-dim: rgba(0,242,255,0.15);
          --pen-blue: #01315b;
          --deep-blue: #020b16;
          --mid-blue: #041e36;
          --border-glow: rgba(0,242,255,0.25);
          --accent-green: #3dfcad;
          --accent-green-dim: rgba(61,252,173,0.15);
          --gold: #f5c518;
          --text-muted: rgba(255,255,255,0.55);
        }
        .particle-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 50% { opacity: 0.3; } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-spin { to { transform: rotate(360deg); } }
        .hero-badge { animation: fadeUp 0.9s ease both; animation-delay: 0s; }
        .hero-title { animation: fadeUp 0.9s ease both; animation-delay: 0.1s; }
        .hero-sub { animation: fadeUp 0.9s ease both; animation-delay: 0.2s; }
        .hero-desc { animation: fadeUp 0.9s ease both; animation-delay: 0.3s; }
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--deep-blue); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--neon-cyan), #004488); border-radius: 3px; }
      `}</style>
    </Box>
  );
};

export default Intro;
