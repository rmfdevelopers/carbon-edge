'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cpu, Layers, Zap, Thermometer, Phone, Mail, MapPin, 
  ArrowRight, Loader2, CheckCheck, Menu, X, 
  Activity, Sun, Home, ImageOff, Instagram
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: mono-accent

const brand = {
  name: "Carbon Edge",
  tagline: "The New Grid",
  description: "Pioneering the transition to autonomous renewable energy for West Africa's luxury estates and industrial hubs.",
  industry: "Energy Tech",
  region: "Nigeria"
};

const contact = {
  email: "hello@carbonedge.com",
  instagram: "carbonedge_ng",
  address: "Victoria Island, Lagos, Nigeria",
  whatsapp: ""
};

const navLinks = [
  { name: "Infrastructure", href: "#products" },
  { name: "Performance", href: "#about" },
  { name: "Contact", href: "#contact" }
];

const features = [
  { title: "AI Load Balancing", description: "Intelligent distribution of power to ensure 100% uptime for critical appliances.", icon: Cpu },
  { title: "Stealth Installation", description: "Clean, architectural-grade mounting that complements modern building aesthetics.", icon: Layers },
  { title: "24/7 Grid Autonomy", description: "Complete independence from unstable municipal power grids via smart storage.", icon: Zap },
  { title: "Thermal Management", description: "Advanced cooling systems designed for the unique heat profiles of West Africa.", icon: Thermometer }
];

const products = [
  { name: "Tesla Powerwall Integration", description: "Seamless backup and energy storage for high-load luxury residences.", price: "₦15,000,000", image_url: "https://images.unsplash.com/photo-1694889649275-6026059d3887?q=80&w=1080" },
  { name: "Monocrystalline Smart Array", description: "High-efficiency panels with AI-tracking technology for maximum harvest.", price: "₦3,500,000", image_url: "https://picsum.photos/seed/tech3/800/600" },
  { name: "EdgeHub Monitoring System", description: "Real-time AI energy analytics and load balancing for smart homes.", price: "₦1,250,000", image_url: "https://images.unsplash.com/photo-1658753145551-8f44e5811d21?q=80&w=1080" },
  { name: "Industrial Inverter Rack", description: "Utility-grade power conversion for estates and manufacturing sites.", price: "₦8,750,000", image_url: "https://picsum.photos/seed/tech5/800/600" }
];

const testimonials = [
  { name: "Olawale Adeyemi", text: "The Tesla Powerwall integration is flawless. I haven't noticed a power cut in six months.", role: "Estate Owner" },
  { name: "Chioma Okoro", text: "Carbon Edge transformed our corporate office. The ROI on electricity bills was visible within the first quarter.", role: "COO, FinTech Group" },
  { name: "Funke Bakare", text: "Precision and professionalism. Their technical team in VI is the best I've worked with in Nigeria.", role: "Architect" }
];

const stats = [
  { number: "50+", label: "Estate Installations" },
  { number: "2.5MW", label: "Total Generated" },
  { number: "99.9%", label: "Uptime Achieved" }
];

const gallery = [
  { url: "https://picsum.photos/seed/tech8/800/1000", alt: "Installation 1" },
  { url: "https://picsum.photos/seed/tech10/800/600", alt: "Installation 2" },
  { url: "https://picsum.photos/seed/tech12/800/900", alt: "Installation 3" },
  { url: "https://picsum.photos/seed/tech14/800/700", alt: "Installation 4" },
  { url: "https://picsum.photos/seed/tech2/800/800", alt: "Installation 5" },
  { url: "https://picsum.photos/seed/tech4/800/1100", alt: "Installation 6" }
];

// --- HOOKS ---

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

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className ?? ''}`}>
        <ImageOff size={24} strokeWidth={1.5} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width ?? 800) : undefined} 
      height={!fill ? (height ?? 600) : undefined} 
      className={`${className} transition-opacity duration-700`} 
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[var(--accent)] text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 opacity-70">
      {children}
    </p>
  );
}

// --- SECTIONS ---

export default function CarbonEdgeSite() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const typedText = useTypewriter("Engineering the Sovereign Grid.", 60);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="selection:bg-[var(--accent)] selection:text-black">
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled ? 'bg-[var(--secondary)]/95 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="font-mono font-black text-white text-sm">CE</span>
            </div>
            <span className="font-heading font-black text-xl text-white tracking-tighter">
              CARBON <span className="text-[var(--accent)]">EDGE</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-[var(--accent)] transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:block bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,180,216,0.2)]">
            Request Quote
          </a>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-[var(--secondary)] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full border-l border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-16">
             <span className="font-heading font-black text-xl text-white">CARBON EDGE</span>
             <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="font-heading text-4xl font-bold text-white">
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pb-10">
            <p className="font-mono text-white/30 text-xs tracking-widest uppercase mb-4">Contact Specialist</p>
            <p className="text-xl font-bold text-white">{contact.email}</p>
          </div>
        </div>
      </div>

      {/* HERO (HR-D) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-[var(--secondary)] px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-[var(--primary)]/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <SectionLabel>{brand.name} // VI_Lagos_Core</SectionLabel>
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter mb-10">
            {typedText}<span className="text-[var(--accent)] animate-pulse">_</span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/8 pt-10">
            <div className="max-w-xl">
              <p className="text-white/45 text-lg md:text-xl leading-relaxed font-body">
                Ultra-modern renewable infrastructure for Victoria Island's elite residences and corporate headquarters. Engineered for West Africa's toughest loads.
              </p>
            </div>
            <div className="flex gap-4">
               <a href="#products" className="bg-white text-black px-10 py-5 font-black text-sm uppercase tracking-widest
                hover:bg-[var(--accent)] hover:text-black transition-all duration-300 shrink-0">
                View Systems
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (F-STICKY + V4) */}
      <FeaturesSection />

      {/* GALLERY (MASONRY + V7) */}
      <GallerySection />

      {/* D-STAT DIVIDER */}
      <div className="bg-[var(--primary)] py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="py-8 md:py-4 px-8">
              <p className="font-mono text-5xl md:text-6xl font-bold text-white tracking-tighter">{s.number}</p>
              <p className="font-mono text-white/60 text-[10px] mt-3 uppercase tracking-[0.4em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS (P-ASYMMETRIC + V2) */}
      <ProductsSection />

      {/* TESTIMONIALS (T-SLIDER + V7) */}
      <TestimonialsSection />

      {/* CONTACT (C2 + V1) */}
      <ContactSection />

      {/* FOOTER (F1) */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[var(--primary)] rounded flex items-center justify-center">
                  <span className="font-mono font-black text-white text-xs">CE</span>
                </div>
                <span className="font-heading font-black text-2xl text-white tracking-tighter">CARBON EDGE</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed mb-8">
                The new standard for energy autonomy in West Africa. We design, deploy, and monitor technical infrastructure for the 1%.
              </p>
              <div className="flex gap-4">
                <a href={`https://instagram.com/${contact.instagram}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            <div>
              <p className="font-mono text-white/20 text-[10px] uppercase tracking-[0.3em] mb-6">Navigation</p>
              <ul className="space-y-4">
                {navLinks.map(l => (
                  <li key={l.name}><a href={l.href} className="text-white/60 hover:text-white transition-colors">{l.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-white/20 text-[10px] uppercase tracking-[0.3em] mb-6">HQ / Lagos</p>
              <p className="text-white/50 leading-relaxed mb-4">{contact.address}</p>
              <p className="text-white/50">{contact.email}</p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-mono text-white/20 text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} Carbon Edge Infrastructure. Sharp delivery, nationwide.
            </p>
            <p className="font-mono text-white/20 text-[10px] uppercase tracking-widest">
              Design_Auth: Blueprint_v4
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="features" ref={ref} className="py-32 bg-[var(--secondary)] px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Technical Superiority</SectionLabel>
        <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-20 tracking-tighter">Where energy meets intelligence.</h2>
        <div className="space-y-4">
          {features.map((f, idx) => (
            <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
              <div className={`bg-zinc-900/80 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-start gap-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--accent)] shrink-0">
                  <f.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-3xl font-bold text-white tracking-tight">{f.title}</h3>
                    <span className="font-mono text-[var(--accent)] text-lg font-black opacity-30">0{idx + 1}</span>
                  </div>
                  <p className="text-white/45 text-lg leading-relaxed">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Our Portfolio</SectionLabel>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white tracking-tighter">Precision in the Heart of Lagos.</h2>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {gallery.map((img, i) => (
            <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden border border-white/5 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={img.url} alt={img.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-32 px-6 bg-[var(--secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <SectionLabel>The Hardware // Configuration</SectionLabel>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter">Tier-1 Energy Solutions.</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Product */}
          <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden border border-white/10 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative h-[500px] md:h-[600px]">
              <SafeImage src={products[0].image_url} alt={products[0].name} fill className="object-cover group-hover:scale-105 duration-1000 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <SectionLabel>Flagship Integration</SectionLabel>
                <h3 className="font-heading text-4xl font-black text-white mb-4 tracking-tight">{products[0].name}</h3>
                <p className="text-white/60 mb-8 max-w-md">{products[0].description}</p>
                <div className="flex items-center gap-10">
                  <div>
                    <p className="font-mono text-white/30 text-[10px] uppercase mb-1">Pricing Starts</p>
                    <p className="font-mono text-3xl font-bold text-[var(--accent)]">{products[0].price}</p>
                  </div>
                  <a href="#contact" className="bg-white text-black h-14 px-8 rounded-full flex items-center font-bold hover:bg-[var(--accent)] transition-colors">Configure System</a>
                </div>
              </div>
            </div>
          </div>

          {/* Side Products */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {products.slice(1, 3).map((p, i) => (
              <div key={i} className={`group relative rounded-3xl overflow-hidden border border-white/10 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="relative h-full min-h-[250px]">
                  <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-105 duration-1000 transition-transform" />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{p.name}</h3>
                    <p className="font-mono text-[var(--accent)] font-bold text-xl">{p.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 bg-black overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <SectionLabel>Client Intelligence</SectionLabel>
        <h2 className="font-heading text-5xl md:text-6xl font-black text-white tracking-tighter">The Standard of Performance.</h2>
      </div>
      <div className="w-full">
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused] px-6">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-80 md:w-[450px] shrink-0 bg-zinc-900 border border-white/10 rounded-3xl p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-[var(--accent)]" />)}
                </div>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center font-mono text-[var(--accent)] font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-white">{t.name}</p>
                  <p className="font-mono text-white/30 text-[10px] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-[var(--secondary)] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Initialize Deployment</SectionLabel>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Deploy Your Grid.</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">Our engineers are standing by to configure your sovereign energy solution. Expect a response within 2 hours.</p>
        </div>

        {sent ? (
          <div className="p-16 text-center animate-scaleIn bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(0,180,216,0.2)]">
              <CheckCheck size={40} className="text-[var(--accent)]" />
            </div>
            <h3 className="font-heading text-4xl font-black text-white mb-4">Transmission Received</h3>
            <p className="text-white/40 text-lg">Thank you. An energy architect will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest block mb-2">Identifier *</label>
                <input 
                  type="text" placeholder="Full Name" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-white outline-none focus:border-[var(--accent)] transition-all"
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div>
                <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest block mb-2">Comms Channel *</label>
                <input 
                  type="email" placeholder="Email Address" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-white outline-none focus:border-[var(--accent)] transition-all"
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest block mb-2">Technical Brief *</label>
              <textarea 
                rows={5} placeholder="Site location, estimated load, and energy goals..." required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-white outline-none focus:border-[var(--accent)] transition-all resize-none"
                onChange={e => setForm({...form, message: e.target.value})}
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[var(--accent)] text-black py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" /> : <>Initiate Project <ArrowRight size={18} /></>}
            </button>
          </form>
        )}

        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
            <Mail size={16} /> {contact.email}
          </a>
          <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <MapPin size={16} /> {contact.address}
          </span>
          <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
            <Instagram size={16} /> @{contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}