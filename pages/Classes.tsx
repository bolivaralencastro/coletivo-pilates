import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ASSETS } from '../constants';

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Classes: React.FC = () => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white">
        
        {/* 1. HEADER MONUMENTAL */}
        <header className="p-8 md:p-16 border-b border-lines pt-32 pb-16">
          <Reveal>
            <span className="font-mono text-xs text-brand-orange uppercase tracking-[0.2em] block mb-4">
              (02) — Nossas Práticas
            </span>
            <h1 className="text-6xl md:text-9xl font-sans font-bold tracking-tighter uppercase leading-[0.85] text-black">
              Aulas &<br/>
              <span className="ml-8 md:ml-32 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Método</span>
            </h1>
          </Reveal>
        </header>

        {/* 2. GRID DE AULAS (SWISS CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-lines">
           {[
             {
               id: "01",
               title: "Privado",
               subtitle: "O Laboratório",
               desc: "A experiência definitiva do método. Um instrutor, um aluno e o sistema completo de equipamentos. É aqui que construímos a base, corrigimos assimetrias e avançamos nos exercícios de alta performance.",
               specs: ["Capacidade: 1 Aluno", "Duração: 55 Min", "Foco: Personalização"]
             },
             {
               id: "02",
               title: "Grupo",
               subtitle: "A Dinâmica",
               desc: "Pequenos grupos de até 4 pessoas. A energia é compartilhada, mas o olhar permanece individual. Ideal para quem já possui autonomia básica e busca fluxo, ritmo e a camaradagem do estúdio.",
               specs: ["Capacidade: 4 Alunos", "Duração: 55 Min", "Foco: Fluidez & Ritmo"]
             },
             {
               id: "03",
               title: "Mentoria",
               subtitle: "Para Profissionais",
               desc: "Sessões técnicas voltadas para instrutores de Pilates que desejam aprofundar seu entendimento sobre a Contrologia, manejo de equipamentos e didática de ensino.",
               specs: ["Capacidade: Variável", "Duração: 60/90 Min", "Foco: Técnica Avançada"]
             }
           ].map((item, idx) => (
             <div key={idx} className="group relative border-b md:border-b-0 md:border-r border-lines last:border-r-0 p-12 hover:bg-smoke transition-colors duration-500 flex flex-col justify-between min-h-[500px]">
                <Reveal delay={idx * 0.1}>
                  <div className="flex justify-between items-start mb-12">
                     <span className="font-mono text-xl font-bold text-gray-200 group-hover:text-brand-orange transition-colors">/{item.id}</span>
                     <span className="material-icons opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">north_east</span>
                  </div>
                  
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2 block">{item.subtitle}</span>
                    <h3 className="text-4xl font-sans font-bold mb-6">{item.title}</h3>
                    <p className="font-serif text-gray-600 leading-relaxed mb-12">
                      {item.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 border-t border-gray-200 pt-6">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="font-mono text-[10px] uppercase text-gray-500 flex items-center gap-2">
                        <span className="w-1 h-1 bg-brand-orange rounded-full"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </Reveal>
             </div>
           ))}
        </section>

        {/* 3. O MÉTODO (DARK SECTION) */}
        <section className="bg-black text-white grid grid-cols-1 lg:grid-cols-2">
           <div className="p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-center">
              <Reveal>
                <span className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-6 block">Classic Pilates</span>
                <h2 className="text-4xl md:text-6xl font-sans font-bold leading-tight mb-8">
                  Por que seguimos<br/>o rigor clássico?
                </h2>
                <div className="prose prose-lg prose-invert font-serif text-gray-400">
                  <p className="mb-6">
                    O método criado por Joseph Pilates é um <strong>sistema</strong>. Não é um aglomerado de exercícios aleatórios. Existe uma ordem, uma lógica e uma progressão.
                  </p>
                  <p>
                    No Coletivo, respeitamos essa arquitetura. Utilizamos aparelhos com as medidas e resistências das molas originais (Grantz/Contrology). Isso garante que o corpo receba o estímulo exato para o qual o exercício foi desenhado.
                  </p>
                </div>
              </Reveal>
           </div>
           <div className="relative min-h-[400px] lg:min-h-full group overflow-hidden">
              <img 
                src={ASSETS.ACADEMY_GALLERY[0]}
                alt="Detalhe Equipamento Pilates Oficial" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale"
              />
           </div>
        </section>

        {/* 4. HORÁRIOS & AGENDA (TIMETABLE LAYOUT) */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-lines min-h-[50vh]">
           <div className="md:col-span-4 p-8 md:p-16 bg-smoke border-b md:border-b-0 md:border-r border-lines">
              <Reveal>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4 block">Funcionamento</span>
                <h3 className="text-3xl font-sans font-medium mb-8">Horários do<br/>Estúdio</h3>
                <p className="font-serif text-sm text-gray-600 italic">
                  *As sessões devem ser agendadas com antecedência. Sujeito à disponibilidade de aparelhos.
                </p>
              </Reveal>
           </div>
           
           <div className="md:col-span-8 p-8 md:p-16 flex flex-col justify-center">
              <Reveal>
                <div className="space-y-0">
                   {[
                     { day: "Segunda-feira", hours: "07:00 — 20:00" },
                     { day: "Terça-feira", hours: "07:00 — 20:00" },
                     { day: "Quarta-feira", hours: "07:00 — 20:00" },
                     { day: "Quinta-feira", hours: "07:00 — 20:00" },
                     { day: "Sexta-feira", hours: "07:00 — 18:00" },
                   ].map((slot, i) => (
                     <div key={i} className="flex justify-between items-center py-6 border-b border-lines hover:pl-4 transition-all duration-300 group cursor-default">
                        <span className="font-sans text-xl font-bold group-hover:text-brand-orange transition-colors">{slot.day}</span>
                        <span className="font-mono text-sm text-gray-500">{slot.hours}</span>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
                   <a 
                     href="https://wa.me/5548999770808" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="px-8 py-4 bg-brand-orange text-white font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors w-full md:w-auto text-center"
                   >
                     Agendar Sessão Experimental
                   </a>
                   <span className="font-mono text-[10px] text-gray-400 uppercase">
                     Florianópolis — Córrego Grande
                   </span>
                </div>
              </Reveal>
           </div>
        </section>

      </div>
    </PageTransition>
  );
};