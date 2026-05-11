'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cpu, Building2, Zap, LineChart, Phone, Mail, MapPin, 
  CheckCheck, Loader2, ArrowRight, Menu, X, 
  ImageOff, Sun, ShieldCheck, Home
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: mono-accent

const brand = {
  name: "Carbon Edge",
  tagline: "The New Grid: Decarbonizing the Future of Lagos",
  description: "Leading Nigeria's transition to sustainable energy with premium solar infrastructure and intelligent grid-integration for luxury estates.",
  industry: "tech",
  region: "nigeria"
};

const contact = {
  instagram: "@carbonedge_ng",
  email: "contact@carbonedge.ng",
  address: "Victoria Island, Lagos, Nigeria"
};

const products = [
  { name: "Tesla Powerwall Integration", description: "Seamless energy backup for high-load luxury residences with intelligent discharge management.", price: "₦15,000,000", image: "https://picsum.photos/seed/tech2/800/600" },
  { name: "Monocrystalline Smart Array", description: "High-efficiency panels featuring integrated AI-tracking for maximum seasonal yield.", price: "₦3,500,000", image: "https://images.unsplash.com/photo-1726795867801-63c0a37b80c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
  { name: "Edge Hybrid Inverter Pro", description: "Industrial grade power conversion with real-time cloud monitoring and local grid balancing.", price: "₦2,850,000", image: "https://picsum.photos/seed/tech4/800/600" },
  { name: "Grid-Sync Battery Stack", description: "Modular lithium-iron-phosphate storage designed for high-density Lagos developments.", price: "₦8,200,000", image: "https://images.unsplash.com/photo-1636817098062-8dbc0cf735f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" }
];

const features = [
  { title: "Smart Grid AI", description: "Automated energy routing that prioritizes solar during peak tariff hours.", icon: Cpu },
  { title: "Estate Scale Solutions", description: "Bespoke infrastructure designed for the specific power demands of luxury gated communities.", icon: Building2 },
  { title: "Zero-Downtime Swap", description: "Ultra-fast switching between solar, battery, and grid with zero millisecond latency.", icon: Zap },
  { title: "Real-time Monitoring", description: "Monitor every watt generated and consumed via our dedicated Carbon Edge mobile app.", icon: LineChart }
];

const testimonials = [
  { name: "Chidi Okoro", text: "The transition was seamless. We haven't experienced a flicker of power fluctuation in six months.", role: "Estate Manager, VI" },
  { name: "Sade Adebayo", text: "Carbon Edge delivered a system that looks as good as it performs. Truly ultra-modern service.", role: "Homeowner" },
  { name: "Emeka Nwosu", text: "Technically superior to any other local provider. Their AI monitoring is a game changer for our costs.", role: "Technical Director" }
];

const stats = [
  { number: '50+', label: 'Estate Projects', icon: Home },
  { number: '2.5MW', label: 'Clean Energy Generated', icon: Sun },
  { number: '99.9%', label: 'Uptime Guarantee', icon: ShieldCheck }
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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary ${fallbackClassName ?? className ?? ''}`}>
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

// --- COMPONENTS ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black text-white italic group-hover:rotate-12 transition-transform">C</div>
          <span className="font-heading font-black text-xl tracking-tighter uppercase">Carbon<span className="text-primary">Edge</span></span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Systems', 'Performance', 'Consultation'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-mono uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-secondary z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading font-black text-xl uppercase italic text-primary">CE</span>
            <button onClick={() => setIsOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Systems', 'Performance', 'Consultation'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-black uppercase tracking-tighter hover:text-primary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-primary text-white py-4 text-center rounded-xl font-black text-lg">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Page() {
  const typedText = useTypewriter("Engineering the Future of Clean Power");
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <>
      <Nav />

      {/* HERO - HR-D Pattern */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-secondary px-6 overflow-hidden relative">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[11vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            {typedText}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className={`mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-8 transition-all duration-1000 delay-500 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={heroReveal.ref}>
            <p className="text-white/40 text-lg max-w-md leading-relaxed font-mono">
              [SYSTEMS: ONLINE]<br/>
              {brand.description}
            </p>
            <a href="#products" className="bg-primary text-white px-12 py-5 font-black text-xl
              shadow-[8px_8px_0px_rgba(240,248,255,0.1)]
              hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(240,248,255,0.1)]
              transition-all duration-200 shrink-0 uppercase tracking-tighter">
              View Systems
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES - F-ICON-GRID */}
      <section id="performance" ref={featuresReveal.ref} className="py-28 px-6 bg-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase mb-4 block">Core Technology</span>
            <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tighter">Precision Engineering</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} 
                className={`p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 group cursor-default
                  ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="mb-6 text-primary group-hover:scale-110 transition-transform"><f.icon size={36} strokeWidth={1.5} /></div>
                <h3 className="font-heading font-bold text-white text-xl leading-tight uppercase mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER - D-STAT */}
      <div className="bg-primary py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-6">
              <p className="text-5xl font-black text-white tracking-tighter font-heading">{s.number}</p>
              <p className="text-white/70 text-xs mt-2 font-mono uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY - Masonry Style */}
      <section ref={galleryReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-right mb-16">
            <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase mb-4 block">Field Operations</span>
            <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tighter">The New Grid in Action</h2>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} 
                className={`break-inside-avoid group relative rounded-3xl overflow-hidden border border-white/10
                  ${galleryReveal.isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'} transition-all duration-1000`}
                style={{ transitionDelay: `${idx * 100}ms` }}>
                <SafeImage src={`https://picsum.photos/seed/grid${idx}/800/${idx % 2 === 0 ? '1000' : '600'}`} alt="Installation" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase">Installation_Ref_{idx}001</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-LIST Pattern */}
      <section id="systems" ref={productReveal.ref} className="py-28 px-6 bg-white/5 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-6xl font-black text-white uppercase tracking-tighter mb-4 italic">Hardware Solutions</h2>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Tier-1 components optimized for the tropics</p>
          </div>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} className={`group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 rounded-2xl border border-white/5 bg-secondary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300
                ${productReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="font-mono text-primary/20 text-6xl font-black tracking-tighter w-20 shrink-0 group-hover:text-primary transition-colors">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-black text-white uppercase italic">{p.name}</h3>
                  <p className="text-white/40 mt-1 text-sm font-mono uppercase tracking-wide leading-relaxed">{p.description}</p>
                </div>
                <div className="text-right shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                  <p className="font-black text-2xl text-primary font-heading tracking-tighter">{p.price}</p>
                  <a href="#contact" className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] hover:text-white transition mt-2 flex items-center justify-end gap-2 group/btn">
                    Enquire <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - V3 Split Reveal */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <span className="font-mono text-primary text-xs tracking-[0.5em] uppercase mb-6 block">Our Mission</span>
            <h2 className="font-heading text-7xl font-black text-white leading-none uppercase italic tracking-tighter mb-8">Decentralizing Power</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-10 border-l-4 border-primary pl-8">
              At Carbon Edge, we believe energy independence is the foundation of modern luxury and productivity. We build resilient power systems that perform under pressure.
            </p>
            <div className="flex flex-wrap gap-8">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <p className="font-heading text-3xl font-black text-white italic">{s.number}</p>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 blueprint-grid opacity-30 z-10 pointer-events-none" />
            <div className="absolute -inset-4 bg-primary/10 rounded-[4rem] blur-2xl" />
            <SafeImage src="https://images.unsplash.com/photo-1748147337976-6b3748dc0701?crop=entropy&cs=tinysrgb" alt="Tech Blueprint" fill className="object-cover rounded-[3rem] border border-white/10" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SLIDER */}
      <section ref={testimonialReveal.ref} className="py-28 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tighter">Client Perspectives</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-secondary border border-white/5 rounded-[2rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed italic mb-8 font-light tracking-tight">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black font-heading border border-primary/25">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase text-sm tracking-widest italic">{t.name}</p>
                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C4 Pattern */}
      <section id="consultation" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="font-heading text-[10vw] md:text-[6.5vw] font-black text-secondary leading-[0.8] mb-12 uppercase italic tracking-tighter">
              Design Your <br />Power <br />Solution
            </h2>
            <div className="space-y-6 border-l-4 border-secondary/20 pl-8">
              <p className="text-secondary/80 text-xl font-mono uppercase tracking-tighter">{contact.address}</p>
              <p className="text-secondary/80 text-xl font-mono uppercase tracking-tighter">{contact.email}</p>
              <p className="text-secondary/80 text-xl font-mono uppercase tracking-tighter">{contact.instagram}</p>
            </div>
            <p className="mt-12 text-secondary font-mono text-xs uppercase tracking-[0.5em] font-black">Sharp delivery, nationwide.</p>
          </div>
          
          <div className="w-full">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/40 relative z-10">
                  <CheckCheck size={40} className="text-primary" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-3 relative z-10 uppercase italic">Inquiry Received</h3>
                <p className="text-white/40 max-w-sm text-lg relative z-10 font-mono">System engineers will review and reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-secondary p-8 sm:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-bold text-white mb-10 uppercase tracking-tight">Request Blueprint</h3>
                  <div className="space-y-5">
                    {['name', 'email', 'phone'].map(field => (
                      <input
                        key={field}
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.toUpperCase()}
                        value={(form as any)[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 text-xs font-mono uppercase outline-none transition-all focus:border-primary focus:bg-white/10"
                      />
                    ))}
                    <textarea 
                      rows={4} 
                      placeholder="PROJECT DETAILS / ENERGY REQUIREMENTS"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/20 text-xs font-mono uppercase outline-none resize-none transition-all focus:border-primary focus:bg-white/10"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full mt-8 bg-primary text-white py-5 rounded-xl font-black text-xl uppercase italic tracking-tighter hover:brightness-110 transition-all flex justify-center items-center gap-4 group">
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <>Transmit Data <ArrowRight size={24} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - F2 Pattern */}
      <footer className="py-20 px-6 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center font-black text-white italic text-xs">C</div>
              <span className="font-heading font-black text-lg tracking-tighter uppercase">Carbon<span className="text-primary">Edge</span></span>
            </a>
            <p className="text-white/30 text-xs font-mono leading-relaxed uppercase tracking-widest">
              Decarbonizing the Lagos grid with precision solar architecture. Built for reliability. Built for the future.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] text-primary tracking-[0.5em] uppercase mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Systems', 'Performance', 'Consultation'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-primary tracking-[0.5em] uppercase mb-8">Infrastructure</h4>
            <ul className="space-y-4">
              {['Storage', 'Inverters', 'Panels', 'AI-Grid'].map(link => (
                <li key={link} className="text-white/40 uppercase font-mono text-xs tracking-widest cursor-default">{link}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-primary tracking-[0.5em] uppercase mb-8">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all">
                <span className="font-mono text-[10px] font-black italic">IN</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all">
                <span className="font-mono text-[10px] font-black italic">TW</span>
              </a>
            </div>
            <p className="mt-8 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">{contact.address}</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/10 text-[10px] font-mono tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Carbon Edge Technical Solutions. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-white/10 text-[10px] font-mono tracking-widest uppercase italic">Lagos, NG</span>
            <span className="text-white/10 text-[10px] font-mono tracking-widest uppercase italic">System_Ver_3.0</span>
          </div>
        </div>
      </footer>
    </>
  );
}