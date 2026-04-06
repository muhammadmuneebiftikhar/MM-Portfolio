'use client';

import { motion, AnimatePresence } from 'framer-motion';
import BackgroundScene from '../components/canvas/BackgroundScene';
import ImpactLoader from '../components/ImpactLoader';
import SectionReveal from '../components/SectionReveal';
import SkewContainer from '../components/SkewContainer';
import DigitalCore from '../components/canvas/DigitalCore';
import { Mail, Phone, MapPin, ExternalLink, Download } from 'lucide-react';
import Magnetic from '../components/Magnetic';
import TextReveal from '../components/TextReveal';

import { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'enterprise' | 'web'>('all');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9] as any
      }
    }
  };

  const projects = {
    enterprise: [
      { name: 'Marhaba Auctions', url: 'https://marhabaauctions.com/', tech: 'Nuxt 3, Real-time Bidding' },
      { name: 'MX Auto Auction', url: 'https://mxautoauction.vercel.app/', tech: 'Nuxt, E-commerce' },
      { name: 'BMC Admin Dashboard', url: 'https://bmc-admin-six.vercel.app/', tech: 'Next.js, Admin Portal' },
      { name: 'BMC Client Portal', url: 'https://bmc-client.vercel.app/', tech: 'Next.js, Client Side' },
      { name: 'CWR Portal', url: 'https://cwrportal.com/', tech: 'Nuxt, Operations' },
      { name: 'Weather Dashboard', url: 'https://weather-dashboard-task.vercel.app/', tech: 'React, API Integration' },
    ],
    web: [
      { name: 'Computer Data Shred', url: 'https://computerdatashred.co.uk/', tech: 'WordPress, SEO Optimization' },
      { name: 'Computer Waste London', url: 'https://computerwastelondon.co.uk/', tech: 'WordPress, Branding' },
      { name: 'Airport Taxis Transfer', url: 'https://www.airporttaxistransfer.co.uk/', tech: 'WordPress, Booking' },
      { name: 'Introvert Web', url: 'https://introvertweb.com/', tech: 'WordPress, Portfolio' },
      { name: 'Design Media Service', url: 'https://www.designmediaservice.co.uk/', tech: 'WordPress, Agency' },
    ]
  };

  return (
    <div className="relative min-h-screen">
      <ImpactLoader />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto text-xl font-black tracking-tighter mix-blend-difference">
          MU<span className="text-orange">.</span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] tracking-[0.4em] uppercase font-bold pointer-events-auto mix-blend-difference">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange transition-colors">
              {item}
            </a>
          ))}
        </div>
        <Magnetic amount={0.2}>
          <a
            href="mailto:muneebiftikhar382@gmail.com"
            className="pointer-events-auto px-5 py-2 border border-orange/20 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-orange hover:text-black transition-all cursor-pointer"
          >
            Hire Me
          </a>
        </Magnetic>
      </nav>

      {/* Content Sections */}
      <SkewContainer>
        <div className="relative z-10">

          {/* HERO SECTION */}
          <section className="relative h-screen w-full snap-section overflow-hidden flex items-center">
            {/* Background is now truly full-width */}
            <BackgroundScene />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-24">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <motion.span variants={itemVariants} className="text-orange text-xs md:text-sm font-bold tracking-[0.5em] uppercase mb-8">
                  Available for Immediate Start &middot; Dubai, UAE
                </motion.span>

                <TextReveal
                  text="MUHAMMAD MUNEEB."
                  className="text-[10vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter uppercase font-space mb-8 text-shadow-glow"
                  wordSpace="mr-4 md:mr-8"
                />

                <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 items-start mb-12">
                  <div className="px-4 py-2 border border-orange/40 rounded-full text-xs font-bold uppercase tracking-widest text-orange">
                    Frontend Software Engineer
                  </div>
                  <div className="px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5">
                    Vue / Nuxt / React / Next
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-12 flex flex-col md:flex-row gap-16 items-start md:items-end">
                  <div className="max-w-2xl">
                    <p className="text-base md:text-xl text-foreground font-medium leading-relaxed">
                      Building business-critical, real-time web applications with 4+ years of expertise. I specialize in owning frontend development end-to-end — from high-traffic auction platforms to complex admin dashboards.
                    </p>
                  </div>
                  <a href="#projects" className="flex gap-4 group cursor-pointer inline-flex items-center mt-6 md:mt-0 transition-all active:scale-95">
                    <div className="w-16 h-[1px] bg-orange group-hover:w-24 transition-all duration-500" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-orange font-black text-shadow-glow">
                      Explore My World
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <SectionReveal id="about" className="px-6 md:px-24 max-w-7xl mx-auto py-32 snap-section overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* Left Column: Digital Avatar replacement */}
            <div className="lg:col-span-5 relative group">
              <div className="aspect-square w-full max-w-md mx-auto">
                <DigitalCore />
              </div>
            </div>

            {/* Right Column: Bio & Tech */}
            <div className="lg:col-span-7">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase font-space mb-4">
                THE <br /><span className="text-outline">DEVELOPER</span>
              </h2>
              <p className="text-orange italic font-bold text-lg mb-8 tracking-wide">Behind the work</p>

              <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
                I'm a full-stack developer and creative technologist with 4+ years of experience turning ideas into immersive digital experiences. I specialize in building performance-driven, high-traffic platforms that push the boundaries of modern web standards.
              </p>

              <div className="pl-6 border-l-4 border-orange mb-12">
                <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 italic">
                  "I don't just build interfaces.<br />
                  I build entire digital worlds."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'React / Next.js', status: 'Expert' },
                  { label: 'Node.js / Express', status: 'Advanced' },
                  { label: 'TypeScript / JS (ES6+)', status: 'Master' },
                  { label: 'Three.js / WebGL', status: 'Specialist' },
                  { label: 'Vue / Nuxt 3', status: 'Expert' },
                  { label: 'PostgreSQL / MongoDB', status: 'Advanced' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border border-white/5 bg-white/[0.02] rounded-xl group hover:border-orange/20 transition-colors cursor-default">
                    <div className="w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_rgba(255,109,0,0.8)] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="Muhammad_Muneeb - Frontend Software Engineer.pdf"
                download="Muhammad_Muneeb - Frontend Software Engineer.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-orange text-black font-black text-xs uppercase tracking-[0.2em] rounded-md hover:shadow-[0_0_30px_rgba(255,109,0,0.4)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
            </div>

            {/* Bottom Stats Row */}
            <div className="lg:col-span-12 mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-20">
              {[
                { label: 'Years', val: '4+', sub: 'Experience' },
                { label: 'Projects', val: '50+', sub: 'Completed' },
                { label: 'Clients', val: '30+', sub: 'Worldwide' },
                { label: 'Coffees', val: '1.2k', sub: 'Burned' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center md:items-start">
                  <span className="text-5xl md:text-7xl font-black text-orange mb-2 font-space">{stat.val}</span>
                  <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-foreground/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* EXPERIENCE SECTION */}
          <SectionReveal id="experience" className="px-6 md:px-24 max-w-7xl mx-auto py-32 snap-section flex flex-col space-y-12">
            <h2 className="text-orange text-[10px] font-bold tracking-[0.5em] uppercase mb-0">Journey</h2>
            {[
              {
                company: 'Marhaba Group',
                role: 'Frontend Software Engineer',
                period: 'Dec 2023 – Present',
                description: 'Led architecture for large-scale real-time auction platforms. Built live bidding workflows and complex analytics dashboards.'
              },
              {
                company: 'Computer Data Shred',
                role: 'Full Stack Engineer',
                period: '2022 – 2023',
                description: 'Optimized Core Web Vitals and SEO structure. Built high-performance, mobile-first UI components for the UK market.'
              },
              {
                company: 'BXTrack Solutions',
                role: 'Software Engineer',
                period: '2021 – 2023',
                description: 'Translated Figma designs into modular React/Vue components. Owned frontend delivery in various Agile environments.'
              }
            ].map((job, idx) => (
              <div
                key={idx}
                className="max-w-4xl group p-8 border border-white/10 rounded-[2rem] hover:bg-white/[0.03] transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-black uppercase tracking-tighter">{job.company}</h4>
                  <span className="text-[10px] font-bold text-orange uppercase tracking-widest">{job.period}</span>
                </div>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-4">{job.role}</p>
                <p className="text-sm text-foreground/60 leading-relaxed">{job.description}</p>
              </div>
            ))}
          </SectionReveal>

          {/* PROJECTS SECTION */}
          <SectionReveal id="projects" className="px-6 md:px-24 py-32 snap-section">
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end max-w-7xl mx-auto gap-12">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none font-space text-outline">
                  CURATED<br />
                  <span className="text-foreground">WORKS</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="max-w-xs text-foreground/40 text-xs font-medium leading-relaxed uppercase tracking-widest">
                    A selection of enterprise-grade applications and high-performance websites.
                  </p>
                  <div className="flex gap-4">
                    {['all', 'enterprise', 'web'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as any)}
                        className={`px-4 py-2 border rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                          ? 'border-orange bg-orange text-black'
                          : 'border-white/10 text-white/40 hover:border-orange/30'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[90rem] mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {([...projects.enterprise, ...projects.web])
                  .filter(p => activeCategory === 'all' || (activeCategory === 'enterprise' ? projects.enterprise.find(e => e.name === p.name) : projects.web.find(w => w.name === p.name)))
                  .map((project, idx) => (
                    <motion.a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -10 }}
                      className="group relative h-[300px] border border-white/10 rounded-[2.5rem] overflow-hidden cursor-pointer block"
                    >
                      <div className="absolute inset-0 bg-[#0A0A0A] group-hover:bg-[#111111] transition-colors duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative h-full p-10 flex flex-col justify-between z-20">
                        <div className="flex justify-between items-start">
                          <div className="p-3 border border-white/10 rounded-xl group-hover:border-orange/50 transition-colors">
                            <ExternalLink className="w-5 h-5 text-foreground/40 group-hover:text-orange transition-colors" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-30">
                            /{String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-2xl font-black tracking-tighter uppercase mb-4 font-space group-hover:text-orange transition-colors">
                            {project.name}
                          </h4>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
                            {project.tech}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
              </AnimatePresence>
            </motion.div>
          </SectionReveal>

          {/* CONTACT SECTION - NEW REDESIGN */}
          <SectionReveal id="contact" className="px-6 md:px-24 max-w-7xl mx-auto py-40 snap-section">
            <div className="text-center mb-24">
              <h2 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase font-space flex flex-col items-center">
                <span>LET'S</span>
                <span className="text-outline">CREATE</span>
                <span className="text-orange text-shadow-glow">TOGETHER</span>
              </h2>
            </div>

            {/* Social Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
              {[
                { label: 'EMAIL ME', val: 'muneebiftikhar382@gmail.com', link: 'mailto:muneebiftikhar382@gmail.com' },
                { label: 'WHATSAPP', val: '+92 322 7756932', link: 'https://wa.me/923227756932' },
                { label: 'LINKEDIN', val: '/in/muhammad--muneeb', link: 'https://www.linkedin.com/in/muhammad--muneeb/' },
                { label: 'GITHUB', val: '/muhammadmuneebiftikhar', link: 'https://github.com/muhammadmuneebiftikhar/' }
              ].map((card, i) => (
                <a key={i} href={card.link} target="_blank" rel="noopener noreferrer" className="group p-8 border border-white/5 bg-white/[0.01] rounded-xl hover:border-orange/20 hover:bg-white/[0.03] transition-all">
                  <span className="block text-[8px] font-black tracking-[0.4em] uppercase text-foreground/30 mb-4">{card.label}</span>
                  <span className="block text-sm font-bold tracking-tight mb-6 truncate group-hover:text-orange transition-colors">{card.val}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange flex items-center gap-2">
                    OPEN <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>

            {/* EASY INTERACT ELEMENTS */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <Magnetic amount={0.3}>
                  <a href="mailto:muneebiftikhar382@gmail.com" className="relative group w-64 h-64 border border-white/5 bg-white/[0.01] rounded-full overflow-hidden hover:border-orange/20 transition-all flex flex-col items-center justify-center cursor-pointer">
                    <div className="absolute inset-0 bg-orange/5 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full" />
                    <Mail className="w-8 h-8 mb-6 text-foreground/40 group-hover:text-orange transition-colors duration-500" />
                    <span className="relative z-10 text-[9px] font-black tracking-[0.4em] uppercase text-foreground/40 mb-2 group-hover:text-foreground/80 transition-colors duration-500">Start a conversation</span>
                    <span className="relative z-10 text-xl font-black uppercase tracking-tighter group-hover:text-orange transition-colors duration-500">Via Email</span>
                  </a>
                </Magnetic>

                <Magnetic amount={0.3}>
                  <a href="https://wa.me/923227756932" target="_blank" rel="noopener noreferrer" className="relative group w-64 h-64 border border-white/5 bg-white/[0.01] rounded-full overflow-hidden hover:border-orange/30 hover:bg-orange/[0.02] transition-all flex flex-col items-center justify-center cursor-pointer">
                    <div className="absolute inset-0 bg-orange/10 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full" />
                    <Phone className="w-8 h-8 mb-6 text-foreground/40 group-hover:text-orange transition-colors duration-500" />
                    <span className="relative z-10 text-[9px] font-black tracking-[0.4em] uppercase text-foreground/40 mb-2 group-hover:text-foreground/80 transition-colors duration-500">Instant Reply</span>
                    <span className="relative z-10 text-xl font-black uppercase tracking-tighter group-hover:text-orange transition-colors duration-500 text-shadow-glow">WhatsApp</span>
                  </a>
                </Magnetic>
              </div>

              <div className="mt-32 text-center">
                <span className="text-[9px] font-black tracking-[0.5em] uppercase text-orange/40 flex items-center justify-center gap-4">
                  <span className="w-1 h-1 rounded-full bg-orange shadow-[0_0_8px_orange] animate-pulse" />
                  CURRENTLY ACCEPTING NEW PROJECTS
                  <span className="w-1 h-1 rounded-full bg-orange shadow-[0_0_8px_orange] animate-pulse" />
                </span>
              </div>
            </div>
          </SectionReveal>

          {/* FOOTER */}
          <footer className="px-6 md:px-24 py-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <span>&copy; {new Date().getFullYear()} MUHAMMAD MUNEEB</span>
                <span className="hidden md:inline text-orange/20">|</span>
                <span>BASED IN DUBAI, UAE</span>
              </div>
              <div className="flex gap-8 items-center">
                <span className="text-orange">Portfolio &middot; V3.0</span>
                <span className="hidden md:inline text-orange/20">|</span>
                <span>Crafted with Next.js & Framer Motion</span>
              </div>
            </div>
          </footer>
        </div >
      </SkewContainer >
    </div >
  );
}
