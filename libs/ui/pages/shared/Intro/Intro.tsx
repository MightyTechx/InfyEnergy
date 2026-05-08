import { useEffect, useState } from 'react';
import { GlobalStyles } from '@mui/material';
import PageWrapper from './components/layout/PageWrapper';
import Loader from './components/common/Loader';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import MetricsStrip from './components/sections/MetricsStrip';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProductsSection from './components/sections/ProductsSection';
import WhySection from './components/sections/WhySection';
import CareersSection from './components/sections/CareersSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import { useMetadata } from './metadata';

interface IntroProps {
  onSignIn: () => void;
}

const Intro = ({ onSignIn }: IntroProps) => {
  const metadata = useMetadata();
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setLoaderHidden(true), 2800);
    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <GlobalStyles
        styles={`
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
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes ring-spin { to { transform: rotate(360deg); } }
          .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
          .reveal.visible { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.1s; }
          .reveal-delay-2 { transition-delay: 0.2s; }
          .reveal-delay-3 { transition-delay: 0.3s; }
          .reveal-delay-4 { transition-delay: 0.4s; }
          .reveal-delay-5 { transition-delay: 0.5s; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: var(--deep-blue); }
          ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--neon-cyan), #004488); border-radius: 4px; }
        `}
      />
      <PageWrapper>
        {!loaderHidden && <Loader />}
        <Navbar
          scrolled={headerScrolled}
          onNavigate={handleNavClick}
          onSignIn={onSignIn}
          tenant={metadata.tenet}
        />
        <HeroSection onNavigate={handleNavClick} />
        <MetricsStrip />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <WhySection />
        <CareersSection />
        <ContactSection />
        <Footer tenant={metadata.tenet} />
      </PageWrapper>
    </>
  );
};

export default Intro;
