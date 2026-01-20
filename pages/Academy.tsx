import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ASSETS } from '../constants';

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Academy: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const resolveAsset = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;

  return (
    <PageTransition className="bg-zinc-900 text-zinc-300 min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-end p-8 md:p-20 border-b border-zinc-800 overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img 
              src={resolveAsset(ASSETS.ACADEMY)} 
              alt="Background Texture" 
              className="w-full h-full object-cover grayscale"
            />
         </div>
         <div className="relative z-10 max-w-5xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex items-center gap-4 mb-8"
            >
               <span className="font-mono text-xs text-brand-orange tracking-widest uppercase">Formação 2025/2026</span>
               <div className="h-px w-10 bg-zinc-700"></div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-8"
            >
               TWR<br/>Academy
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="text-xl md:text-2xl font-serif italic text-zinc-400 max-w-2xl border-l-2 border-brand-orange pl-6"
            >
               "Consiste em uma vivência profunda no mundo da Contrologia através da prática do método criado por Joseph Humbertus Pilates."
            </motion.p>
         </div>
      </section>

      {/* 2. THE PROGRAM (TEXT + MENTOR) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-800">
         <div className="lg:col-span-7 p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-zinc-800">
            <ScrollReveal>
              <h2 className="text-3xl font-sans text-white font-medium mb-8">O Programa</h2>
              <div className="prose prose-lg prose-invert text-zinc-400">
                 <p className="mb-6">
                   O processo consiste em desenvolver no professor habilidades que o tornem especialista no método. Através de um olhar em torno da individualidade do aluno, realizaremos uma jornada intensa a fim de chegarmos a um entendimento mais técnico de todo material deixado pelo criador.
                 </p>
                 <p>
                   O programa é liderado por <strong className="text-white">Zé Neto</strong>, diretor técnico do TWR Pilates e mentor do TWR ACADEMY. Zé trabalha com Pilates desde 2009 e já possui três formações no seu currículo (incluindo Polestar Pilates e True to Joe’s Work). Nos últimos anos viajou o país inteiro levando na bagagem muita Contrologia e motivação.
                 </p>
              </div>
            </ScrollReveal>
         </div>
         <div className="lg:col-span-5 p-8 md:p-20 bg-zinc-800/20 flex flex-col justify-center">
            <ScrollReveal>
               <h3 className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-6">Estrutura Pedagógica</h3>
               <ul className="space-y-6">
                  {[
                    { title: "1. Conceitos e Fundamentos", desc: "Novas nomenclaturas, back connection, two way stretch." },
                    { title: "2. Vivência Prática", desc: "Aulas privadas com Zé Neto e pushes and pulls coletivos." },
                    { title: "3. Laboratórios Pedagógicos", desc: "Neurolinguística, comandos táteis e estudos de caso." },
                    { title: "4. Workshops Técnicos", desc: "16 horas de hands-on e manejo de equipamentos." }
                  ].map((item, i) => (
                    <li key={i} className="border-b border-zinc-700 pb-6 last:border-0">
                       <h4 className="text-white font-bold mb-1">{item.title}</h4>
                       <p className="text-sm text-zinc-500">{item.desc}</p>
                    </li>
                  ))}
               </ul>
            </ScrollReveal>
         </div>
      </section>

      {/* 3. FULL-WIDTH IMAGE */}
      <section className="w-full border-b border-zinc-800">
         <div className="relative w-full aspect-video overflow-hidden group">
            <img
              src={resolveAsset(ASSETS.ACADEMY_GALLERY[2])}
              alt="Academy highlight"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
            />
         </div>
      </section>

      {/* 4. CURRICULUM MODULES */}
      <section className="p-8 md:p-20 border-b border-zinc-800">
         <ScrollReveal>
           <h2 className="text-4xl md:text-5xl text-white font-sans font-bold tracking-tight mb-16 text-center">
             Grade Curricular
           </h2>
         </ScrollReveal>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            {[
               { mod: "Módulo 1", content: "Reformer / Foot Corrector / Toe Exerciser / 2x4" },
               { mod: "Módulo 2", content: "Mat / Magic Circle / Breath-a-sizer / Sandbag / Weights" },
               { mod: "Módulo 3", content: "Cadillac / Guilhotina / Neck Stretcher / Pedi Pole" },
               { mod: "Módulo 4", content: "Wunda / High Chair / Arm Chair / Ladder Barrel / Spine Corrector" },
               { mod: "Módulo 5", content: "Integração & Certificação" },
            ].map((m, i) => (
               <ScrollReveal key={i} className="bg-zinc-900 p-10 hover:bg-zinc-800 transition-colors duration-500 flex flex-col justify-between h-64">
                  <span className="font-mono text-xs text-brand-orange uppercase">{m.mod}</span>
                  <p className="text-xl md:text-2xl text-white font-light leading-snug mt-4">
                     {m.content}
                  </p>
                  <span className="text-zinc-600 text-sm mt-4">+ Anatomia Aplicada</span>
               </ScrollReveal>
            ))}
             <div className="bg-brand-orange p-10 flex flex-col justify-center items-center text-center">
                <span className="text-white font-bold text-2xl mb-2">Total 450h</span>
                <span className="text-white/80 text-sm">Carga Horária Completa</span>
             </div>
         </div>
      </section>

      {/* 5. GALLERY GRID */}
      <section className="grid grid-cols-2 md:grid-cols-3 h-[40vh] md:h-[60vh] border-b border-zinc-800">
         {ASSETS.ACADEMY_GALLERY.filter((_, idx) => idx !== 2).map((src, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="relative group overflow-hidden border-r border-zinc-800 last:border-r-0"
            >
               <img 
                  src={resolveAsset(src)} 
                  alt={`Academy ${idx}`} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
               />
            </motion.div>
         ))}
      </section>

      {/* 6. SCHEDULE & CTA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
         
         {/* Schedule */}
         <div className="p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-zinc-800">
            <ScrollReveal>
               <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8 block">Agenda Florianópolis</span>
               <h3 className="text-3xl text-white font-sans mb-12">Cronograma 2025/26</h3>
               
               <div className="space-y-6 font-mono text-sm">
                  {[
                     { date: "02, 03, 04 e 05 OUTUBRO", year: "2025" },
                     { date: "15, 16, 17 e 18 JANEIRO", year: "2026" },
                     { date: "23, 24, 25 e 26 ABRIL", year: "2026" },
                     { date: "02, 03, 04 e 05 JULHO", year: "2026" },
                     { date: "20, 21 e 22 AGOSTO", year: "2026" }
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-zinc-800 pb-4">
                        <span className="text-zinc-300">{item.date}</span>
                        <span className="text-zinc-600">{item.year}</span>
                     </div>
                  ))}
               </div>
            </ScrollReveal>
         </div>

         {/* CTA */}
         <div className="p-8 md:p-20 flex flex-col justify-center items-center text-center bg-gradient-to-br from-zinc-900 to-black">
             <ScrollReveal>
                <h2 className="text-4xl md:text-6xl text-white font-bold tracking-tighter mb-8">
                   Sua jornada<br/>começa aqui.
                </h2>
                <p className="text-zinc-400 max-w-md mx-auto mb-12">
                   Vagas limitadas para garantir a qualidade da mentoria e o "hands-on" individualizado.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                   <a 
                     href="https://wa.me/5548999770808" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-8 py-4 bg-brand-orange text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                   >
                     Aplicar para Vaga
                   </a>
                   <button className="px-8 py-4 border border-zinc-700 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors">
                     Baixar PDF Completo
                   </button>
                </div>
             </ScrollReveal>
         </div>

      </section>

    </PageTransition>
  );
};
