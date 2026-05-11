'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cpu, Building2, Zap, Home, Sun, Activity, Phone, 
  Instagram, Mail, MapPin, CheckCheck, Loader2, 
  ArrowRight, ImageOff, Menu, X 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: textured
// Divider Style: D-GRID
// Typography Personality: mono-accent

// ===== HOOKS =====

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// ===== COMPONENTS =====

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-secondary ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const DividerGrid = () => (
  <div className="py-10 border-y border-white/10">
    <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
      {['Efficiency', 'Precision', 'Autonomy', 'Intelligence', 'Reliability'].map((word, i) => (
        <div key={i} className="flex items-center gap-3 text-white/40 text-sm font-mono tracking-widest uppercase">
          <div className="w-1 h-1 rounded-full bg-accent" />
          {word}
        </div>
      ))}
    </div>
  </div>
);

// ===== MAIN PAGE =====

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const typedHero = useTypewriter("Powering The New Grid.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Carbon Edge",
    tagline: "The New Grid",
    description: "Redefining energy independence through high-precision solar arrays and intelligent storage systems for the modern estate.",
    industry: "tech",
    region: "nigeria"
  };

  const contact = {
    whatsapp: "",
    instagram: "carbonedge_ng",
    email: "",
    address: "Victoria Island, Lagos, Nigeria"
  };

  const products = [
    { name: "Tesla Powerwall Integration", description: "Seamless backup for high-load luxury residences featuring smart discharge management.", price: "₦15,000,000", image: "https://images.unsplash.com/photo-1694889649834-91ff242d1763?q=80" },
    { name: "Monocrystalline Smart Array", description: "High-efficiency panels with AI-tracking technology for maximum yield in tropical climates.", price: "₦3,500,000", image: "https://images.unsplash.com/photo-1775733924075-11e542629502?q=80" },
    { name: "Edge Gateway Controller", description: "Proprietary AI hardware that optimizes your grid consumption in real-time.", price: "₦1,250,000", image: "https://images.unsplash.com/photo-1761479373576-ad4c1c5bb9af?q=80" },
    { name: "Commercial Scale Storage", description: "High-density battery racks designed for estate-wide energy distribution.", price: "₦45,000,000", image: "https://images.unsplash.com/photo-1507333199169-84fd735371fb?q=80" }
  ];

  const features = [
    { title: "AI-Tracking Yield", description: "Smart panel orientation that follows the sun's trajectory for 30% more efficiency.", icon: <Cpu className="w-6 h-6" /> },
    { title: "Estate Integration", description: "Purpose-built infrastructure for large-scale residential developments and gated communities.", icon: <Building2 className="w-6 h-6" /> },
    { title: "Zero-Lag Switch", description: "Instantaneous power transition ensures your sensitive electronics never lose sync.", icon: <Zap className="w-6 h-6" /> }
  ];

  const testimonials = [
    { name: "Femi Adebayo", text: "The transition was seamless. My estate now runs entirely on the Carbon Edge grid without a flicker.", role: "Estate Developer" },
    { name: "Chidi Okoro", text: "The Powerwall integration is a game changer for high-load luxury living. Truly the new grid.", role: "Homeowner, Victoria Island" },
    { name: "Sarah Williams", text: "Unmatched professionalism and technical depth. They understand high-end aesthetics.", role: "Architect" }
  ];

  // SECTION REVEALS
  const rHero = useScrollReveal();
  const rAbout = useScrollReveal();
  const rFeatures = useScrollReveal();
  const rProducts = useScrollReveal();
  const rProcess = useScrollReveal();
  const rTestimonials = useScrollReveal();
  const rContact = useScrollReveal();

  return (
    <main className="relative">
      <div className="scanline" />

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-neutral-dark/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="font-heading text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="bg-primary px-1.5 py-0.5 text-black">CARBON</span>
            <span className="text-white">EDGE</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Solutions', 'Process', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-mono uppercase tracking-widest text-white/60 hover:text-accent transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-black px-6 py-2.5 font-bold text-sm hover:brightness-110 transition-all rounded-sm skew-x-[-12deg]">
              <span className="inline-block skew-x-[12deg]">JOIN THE GRID</span>
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu />
          </button>
        </nav>
      </header>

      {/* MOBILE NAV */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[110] bg-neutral-dark animate-fadeIn">
          <div className="absolute top-6 right-6">
            <button onClick={() => setMobileMenu(false)} className="text-white">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {['Solutions', 'Process', 'Contact'].map((link) => (
              <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase()}`} className="text-3xl font-heading font-black text-white uppercase italic">
                {link}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO SECTION (HR-D Pattern) */}
      <section id="hero" ref={rHero.ref} className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative grid-texture">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {typedHero}<span className="text-accent animate-pulse">_</span>
          </h1>
          <div className={`mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 ${rHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed font-mono">
              [SYSTEM_LOAD]: Redefining energy independence through high-precision solar arrays for Victoria Island's premier estates.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-accent text-black px-10 py-4 font-black text-lg shadow-[6px_6px_0px_rgba(0,242,255,0.2)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200">
                JOIN THE GRID
              </a>
            </div>
          </div>
        </div>
        {/* Decorative glitched element */}
        <div className="absolute bottom-10 right-10 text-white/5 font-mono text-[10rem] select-none pointer-events-none uppercase font-black rotate-90 leading-none">
          GRID01
        </div>
      </section>

      {/* ABOUT SECTION (V9 Reveal) */}
      <section id="about" ref={rAbout.ref} className="py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-black font-mono text-sm tracking-[0.4em] uppercase mb-4 block">01 / CONCEPT</span>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                THE FUTURE<br/>OF POWER.
              </h2>
              <p className="text-white/80 text-xl leading-relaxed max-w-lg mb-10">
                We are not just installing panels; we are building a decentralized energy network. Carbon Edge combines high-end aesthetic integration with military-grade power reliability.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                { number: "50+", label: "Estate Installations", icon: <Home className="text-accent" /> },
                { number: "2.5MW", label: "Generated Daily", icon: <Sun className="text-accent" /> },
                { number: "99.9%", label: "System Uptime", icon: <Activity className="text-accent" /> }
              ].map((s, i) => (
                <div key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`bg-black p-8 flex items-center justify-between border-l-4 border-accent transition-all duration-1000 ${rAbout.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                  <div>
                    <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-mono">{s.label}</p>
                  </div>
                  {s.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DividerGrid />

      {/* FEATURES SECTION (F-ICON-GRID / V4 Reveal) */}
      <section id="features" ref={rFeatures.ref} className="py-28 px-6 bg-secondary relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4 block">02 / CORE TECH</span>
            <h2 className="font-heading text-5xl font-black text-white">Grid Intelligence</h2>
            <p className="text-white/40 mt-4 max-w-xl font-mono">Advanced features that define the next generation of power autonomy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-10 bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500 group ${rFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-8 text-accent group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="font-heading text-2xl font-black text-white uppercase italic">{f.title}</h3>
                <p className="text-white/40 mt-4 leading-relaxed font-mono text-sm uppercase">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (P-EDITORIAL / V2 Reveal) */}
      <section id="products" ref={rProducts.ref} className="py-28 px-6 bg-black grid-texture">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4 block">03 / HARDWARE</span>
             <h2 className="text-center font-heading text-6xl font-black text-white mb-6 uppercase">Hardware Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} 
                className={`group relative h-[450px] overflow-hidden transition-all duration-700 ${rProducts.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={p.image} alt={p.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                  <h3 className="text-3xl font-heading font-black text-white uppercase italic">{p.name}</h3>
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24">
                    <p className="text-white/60 mt-4 text-sm font-mono uppercase">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-accent font-black text-2xl font-heading">{p.price}</span>
                    <a href="#contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 font-black text-sm hover:bg-accent hover:text-black hover:border-accent transition-all uppercase skew-x-[-12deg]">
                      <span className="inline-block skew-x-[12deg]">Select Unit</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION (V3 Split Reveal) */}
      <section id="process" ref={rProcess.ref} className="py-28 px-6 bg-primary relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className={`mb-20 transition-all duration-1000 ${rProcess.isVisible ? 'opacity-100' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-black font-mono text-sm tracking-[0.4em] uppercase mb-4 block">04 / DEPLOYMENT</span>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white">The Road to Autonomy</h2>
          </div>
          <div className="space-y-12">
            {[
              { number: "01", title: "Site Audit", text: "Technical thermal mapping and load analysis." },
              { number: "02", title: "System Design", text: "Custom blueprinting for architectural synergy." },
              { number: "03", title: "Deployment", text: "Rapid installation by certified energy engineers." },
              { number: "04", title: "Optimization", text: "Continuous AI-driven monitoring and updates." }
            ].map((step, i) => (
              <div key={i} 
                className={`flex gap-8 items-start group border-b border-white/10 pb-12 transition-all duration-1000 ${rProcess.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <span className="font-heading text-6xl font-black text-accent/30 group-hover:text-accent transition-colors duration-500">{step.number}</span>
                <div className="pt-4">
                  <h3 className="font-heading text-3xl font-black text-white uppercase italic">{step.title}</h3>
                  <p className="text-white/60 mt-2 text-lg font-mono uppercase">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 right-[-10%] opacity-10 rotate-12 select-none pointer-events-none hidden lg:block">
           <Zap size={800} strokeWidth={1} color="#ffffff" />
        </div>
      </section>

      {/* TESTIMONIALS (T-SLIDER / V7 Reveal) */}
      <section id="testimonials" ref={rTestimonials.ref} className="py-28 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase mb-4 block">05 / FEEDBACK</span>
          <h2 className="font-heading text-5xl font-black text-white uppercase italic">Trusted by Visionaries</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[450px] shrink-0 bg-black border border-white/5 p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-white/70 text-xl leading-relaxed italic mb-10 font-mono uppercase">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-white text-xl uppercase skew-x-[-12deg]">
                     {t.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-heading font-black text-white uppercase tracking-tighter">{t.name}</p>
                     <p className="text-accent text-xs font-mono tracking-widest uppercase">{t.role}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (C4 Pattern / V1 Reveal) */}
      <section id="contact" ref={rContact.ref} className="py-32 px-6 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-[0.03] grid-texture" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className={`transition-all duration-1000 ${rContact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-[10vw] md:text-[6.5vw] font-black text-black leading-none mb-12 uppercase italic">
              SECURE YOUR AUTONOMY
            </h2>
            <div className="space-y-6 border-l-8 border-black/20 pl-8">
              <p className="text-black/60 font-mono text-sm tracking-widest uppercase">ESTATE DEPLOYMENT UNIT</p>
              <div className="space-y-2">
                <p className="text-black text-2xl font-black font-mono">VICTORIA ISLAND, LAGOS</p>
                <p className="text-black text-lg font-mono uppercase">@carbonedge_ng</p>
              </div>
            </div>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <a href="#hero" className="font-heading text-3xl font-black tracking-tighter flex items-center gap-2 mb-6">
              <span className="bg-primary px-2 py-0.5 text-black">CARBON</span>
              <span className="text-white">EDGE</span>
            </a>
            <p className="text-white/30 font-mono text-sm uppercase leading-relaxed">
              Redefining energy independence through high-precision solar arrays. Sharp delivery across the Island.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="text-white text-xs font-mono font-black tracking-widest uppercase">Grid Units</p>
              <ul className="space-y-2 text-white/40 text-xs font-mono uppercase">
                <li><a href="#products" className="hover:text-accent transition-colors">Residential</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Commercial</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Smart Storage</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-white text-xs font-mono font-black tracking-widest uppercase">Connect</p>
              <div className="flex gap-4">
                 <a href="https://instagram.com/carbonedge_ng" className="text-white/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase">
          <p>© {new Date().getFullYear()} Carbon Edge Tech. All rights reserved.</p>
          <p>Precision Engineered in Nigeria</p>
        </div>
      </footer>
    </main>
  );
}

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-black border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white uppercase italic mb-4">Transmission Sent</h3>
        <p className="text-white/40 max-w-sm font-mono uppercase text-sm">Deployment unit will review your coordinates and respond shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-10 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-black text-white mb-8 uppercase italic flex items-center gap-2">
          <span className="w-4 h-4 bg-accent animate-pulse" /> Grid Request
        </h3>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-none px-5 py-4 text-white placeholder-white/20 text-xs font-mono outline-none transition-all duration-300 focus:border-accent"
            />
          ))}
          <textarea rows={4} placeholder="ENERGY REQUIREMENTS"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-none px-5 py-4 text-white placeholder-white/20 text-xs font-mono outline-none resize-none transition-all duration-300 focus:border-accent"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-accent text-black py-5 font-black text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 uppercase group italic">
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Initiate Deployment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </form>
  );
};